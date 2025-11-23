export type RiskLevel = 'LOW' | 'MEDIUM' | 'CRITICAL';

export interface FraudCase {
  id: string;
  narrative: string;
  merchant: string;
  type: string;
  vectorId?: string; // Simulated vector ID
}

export interface Transaction {
  id: string;
  timestamp: string;
  amount: number;
  merchant: string;
  merchantId: string;
  narrative: string;
  location: string;
  ip: string;
  
  // Calculated Fast Features
  zScore: number;
  velocityScore: number;
  
  // RAG/Signature Features
  signatureMatchScore: number;
  matchedCaseId?: string;
  
  riskLevel: RiskLevel;
  status: 'PENDING' | 'ANALYZING' | 'BLOCKED' | 'ALLOWED' | 'FLAGGED';
}

export interface AnalysisResult {
  isLikelyFraud: boolean;
  confidence: number;
  reasoning: string;
  recommendedAction: 'BLOCK' | 'ALLOW' | 'HOLD';
  keyRiskFactors: string[];
}

export interface UserProfile {
  history: number[]; // Last N amounts
  mean: number;
  stdDev: number;
}