import React from 'react';
import { Transaction } from '../types';
import { ICONS } from '../constants';

interface Props {
  transactions: Transaction[];
  onSelect: (tx: Transaction) => void;
  selectedId?: string;
}

const TransactionStream: React.FC<Props> = ({ transactions, onSelect, selectedId }) => {
  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <h2 className="text-slate-100 font-semibold flex items-center gap-2">
          {ICONS.Activity} Live Stream
          <span className="text-xs font-normal text-slate-500 ml-auto flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Connected (Pathway)
          </span>
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            onClick={() => onSelect(tx)}
            className={`
              relative p-3 rounded-lg border cursor-pointer transition-all duration-200
              ${selectedId === tx.id 
                ? 'bg-slate-800 border-blue-500 shadow-lg shadow-blue-900/20' 
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800'}
            `}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-mono text-xs text-slate-400">{tx.id}</span>
              <span className="text-xs text-slate-500">{tx.timestamp.split('T')[1].split('.')[0]}</span>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-slate-200 truncate pr-2">{tx.merchant}</span>
              <span className={`font-mono font-bold ${tx.amount > 1000 ? 'text-white' : 'text-slate-300'}`}>
                ${tx.amount.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              {/* Risk Badge */}
              <div className={`
                px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                ${tx.riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                  tx.riskLevel === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}
              `}>
                {tx.riskLevel}
              </div>

              {/* Status Indicator */}
              {tx.status === 'BLOCKED' && <span className="text-red-500">{ICONS.Block}</span>}
              {tx.status === 'ALLOWED' && <span className="text-emerald-500">{ICONS.Check}</span>}
            </div>

            {/* Z-Score Bar */}
            {tx.zScore > 2 && (
              <div className="mt-2 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500" 
                  style={{ width: `${Math.min((tx.zScore / 5) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionStream;