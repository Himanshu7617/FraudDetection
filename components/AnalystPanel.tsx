import React, { useState, useEffect } from 'react';
import { Transaction, AnalysisResult, FraudCase } from '../types';
import { ICONS } from '../constants';
import { analyzeTransactionWithGemini } from '../services/gemini';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Props {
  transaction: Transaction | null;
  knowledgeBase: FraudCase[];
  onAddToKnowledgeBase: (tx: Transaction, notes: string) => void;
  onUpdateStatus: (id: string, status: any) => void;
}

const AnalystPanel: React.FC<Props> = ({ 
  transaction, 
  knowledgeBase, 
  onAddToKnowledgeBase,
  onUpdateStatus 
}) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setAnalysis(null);
    setNotes("");
    
    // Auto-trigger analysis for high risk items
    if (transaction && (transaction.riskLevel === 'CRITICAL' || transaction.riskLevel === 'MEDIUM')) {
      handleAnalyze();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction?.id]);

  const handleAnalyze = async () => {
    if (!transaction) return;
    setLoading(true);
    const result = await analyzeTransactionWithGemini(transaction, knowledgeBase);
    setAnalysis(result);
    setLoading(false);
  };

  const handleAction = (action: 'BLOCK' | 'ALLOW') => {
    if (!transaction) return;
    onUpdateStatus(transaction.id, action === 'BLOCK' ? 'BLOCKED' : 'ALLOWED');
    
    if (action === 'BLOCK') {
      // Feedback loop
      onAddToKnowledgeBase(transaction, analysis?.reasoning || "Manual Block");
    }
  };

  if (!transaction) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-500 bg-slate-950">
        <div className="p-4 bg-slate-900 rounded-full mb-4 opacity-50">
          {ICONS.Search}
        </div>
        <p>Select a transaction from the stream to analyze</p>
      </div>
    );
  }

  const chartData = [
    { name: 'Behavioral', value: transaction.zScore * 20 }, // Weighting for visual
    { name: 'Signature', value: transaction.signatureMatchScore * 100 },
  ];

  return (
    <div className="flex-1 bg-slate-950 overflow-y-auto flex flex-col lg:flex-row">
      
      {/* LEFT: Technical Data */}
      <div className="flex-1 p-6 border-r border-slate-800">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Transaction Analysis</h1>
            <p className="font-mono text-slate-400">{transaction.id}</p>
          </div>
          <div className="text-right">
             <div className="text-3xl font-bold text-white">${transaction.amount.toFixed(2)}</div>
             <div className="text-slate-400">{transaction.merchant}</div>
          </div>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
            <h3 className="text-xs text-slate-500 uppercase tracking-widest mb-2">Behavioral (Z-Score)</h3>
            <div className="flex items-end gap-2">
              <span className={`text-3xl font-bold ${transaction.zScore > 3 ? 'text-red-400' : 'text-blue-400'}`}>
                {transaction.zScore.toFixed(2)}
              </span>
              <span className="text-slate-500 mb-1">/ 3.0 threshold</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Deviations from user history mean.</p>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
             <h3 className="text-xs text-slate-500 uppercase tracking-widest mb-2">Signature Match (RAG)</h3>
             <div className="flex items-end gap-2">
              <span className={`text-3xl font-bold ${transaction.signatureMatchScore > 0.7 ? 'text-red-400' : 'text-emerald-400'}`}>
                {(transaction.signatureMatchScore * 100).toFixed(0)}%
              </span>
              <span className="text-slate-500 mb-1">similarity</span>
            </div>
             <p className="text-xs text-slate-500 mt-2 truncate">
               {transaction.matchedCaseId ? `Matches ${transaction.matchedCaseId}` : "No strong pattern match"}
             </p>
          </div>
        </div>

        {/* Narrative */}
        <div className="mb-6 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
          <h4 className="text-sm font-semibold text-slate-300 mb-2">Transaction Narrative</h4>
          <p className="font-mono text-sm text-yellow-100/80">"{transaction.narrative}"</p>
        </div>

        <div className="h-64 relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#6366f1" /> {/* Indigo for Behavior */}
                    <Cell fill="#ec4899" /> {/* Pink for Signature */}
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-white">Risk</span>
                <span className={`text-sm font-bold ${transaction.riskLevel === 'CRITICAL' ? 'text-red-500' : 'text-slate-400'}`}>
                  {transaction.riskLevel}
                </span>
             </div>
        </div>
      </div>

      {/* RIGHT: Gemini AI Analyst */}
      <div className="w-full lg:w-[450px] bg-slate-900 p-6 border-l border-slate-800 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
            {ICONS.Brain}
          </div>
          <h2 className="text-lg font-bold text-white">Gemini Analyst</h2>
        </div>

        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          {!analysis && !loading && (
             <div className="text-center mt-20 text-slate-600">
               <p>AI Analysis ready.</p>
               <button 
                 onClick={handleAnalyze}
                 className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
               >
                 Run Deep Analysis
               </button>
             </div>
          )}

          {loading && (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              <div className="h-4 bg-slate-800 rounded w-full"></div>
              <div className="h-4 bg-slate-800 rounded w-5/6"></div>
              <div className="flex justify-center mt-8">
                 <span className="text-purple-400 text-sm font-mono">Thinking...</span>
              </div>
            </div>
          )}

          {analysis && (
            <div className="space-y-6 animate-fade-in">
              <div className={`p-4 rounded-lg border ${analysis.isLikelyFraud ? 'bg-red-500/10 border-red-500/50' : 'bg-green-500/10 border-green-500/50'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-white">Assessment</span>
                  <span className="font-mono text-sm">{analysis.confidence}% Confidence</span>
                </div>
                <p className={`text-lg font-bold ${analysis.isLikelyFraud ? 'text-red-400' : 'text-green-400'}`}>
                  {analysis.recommendedAction}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-400 mb-2">Reasoning</h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-800/50 p-3 rounded">
                  {analysis.reasoning}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-400 mb-2">Key Risk Factors</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.keyRiskFactors.map((f, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-800 border border-slate-700 text-xs text-slate-300 rounded">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons - Sticky at bottom */}
        <div className="sticky bottom-0 pt-4 border-t border-slate-800 bg-slate-900">
          <div className="grid grid-cols-2 gap-3">
             <button
               onClick={() => handleAction('ALLOW')}
               className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold transition-colors"
             >
               {ICONS.Check} Allow
             </button>
             <button
               onClick={() => handleAction('BLOCK')}
               className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition-colors"
             >
               {ICONS.Lock} Block & Learn
             </button>
          </div>
          <p className="text-[10px] text-slate-600 text-center mt-2">
            "Block & Learn" adds this signature to the Knowledge Base (Feedback Loop).
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalystPanel;