import { Transaction, UserProfile, FraudCase } from '../types';

// --- Simulation Constants ---
const MERCHANTS = [
  { name: 'Uber Rides', id: 'M_UBER_001', risk: 0.1 },
  { name: 'Starbucks', id: 'M_SBX_992', risk: 0.1 },
  { name: 'Apple Store', id: 'M_APL_554', risk: 0.2 },
  { name: 'Unknown Crypto Ex', id: 'M_CRYP_666', risk: 0.9 },
  { name: 'Medi-Global', id: 'M_MEDI_112', risk: 0.8 }, // Known fraud pattern
  { name: 'Luxury Watches Int', id: 'M_LUX_888', risk: 0.6 },
  { name: 'Local Grocery', id: 'M_GROC_123', risk: 0.05 },
];

const NARRATIVES = [
  "Ride to work",
  "Morning coffee",
  "MacBook Pro purchase",
  "Urgent transfer for medical supplies", // Trigger for RAG
  "Immediate withdrawal",
  "Consulting services",
  "Refund verification fee", // Trigger
  "Weekly groceries"
];

// --- Math Helpers ---

export const calculateStats = (history: number[]) => {
  if (history.length === 0) return { mean: 0, stdDev: 0 };
  const mean = history.reduce((a, b) => a + b, 0) / history.length;
  const variance = history.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / history.length;
  return { mean, stdDev: Math.sqrt(variance) };
};

export const calculateZScore = (amount: number, profile: UserProfile): number => {
  if (profile.stdDev === 0) return 0;
  return (amount - profile.mean) / profile.stdDev;
};

// --- Hybrid Search Simulation ---

// In a real app, this uses Vector Search (Cos Sim) + BM25.
// Here we simulate the score based on string keywords for the demo.
export const simulateHybridSearch = (
  tx: Partial<Transaction>,
  knowledgeBase: FraudCase[]
): { score: number; match?: FraudCase } => {
  let bestScore = 0;
  let bestMatch: FraudCase | undefined = undefined;

  // Clean text: lowercase and remove punctuation
  const clean = (text: string) => text.toLowerCase().replace(/[^\w\s]/g, '');
  const txText = clean(`${tx.merchant} ${tx.narrative}`);

  knowledgeBase.forEach((wc) => {
    const caseText = clean(`${wc.merchant} ${wc.narrative}`);
    
    // Simulate Semantic Similarity based on shared keywords (Jaccard-ish)
    const txWords = new Set(txText.split(/\s+/));
    const caseWords = new Set(caseText.split(/\s+/));
    
    // Intersection count
    let intersectionCount = 0;
    txWords.forEach(w => { if (caseWords.has(w)) intersectionCount++; });
    
    let score = intersectionCount / Math.max(txWords.size, caseWords.size);
    
    // Boost if exact merchant match (BM25 proxy for exact ID match)
    if (tx.merchant === wc.merchant) score += 0.4;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = wc;
    }
  });

  // Normalize to 0-1 range roughly
  return { score: Math.min(bestScore, 0.99), match: bestMatch };
};

export const generateTransaction = (
  userProfile: UserProfile, 
  knowledgeBase: FraudCase[],
  forceFraudType?: 'BEHAVIORAL' | 'SIGNATURE'
): Transaction => {
  // 15% chance of organic fraud, or forced
  const isFraud = forceFraudType ? true : Math.random() > 0.85;
  
  let merchant, amount, narrative;

  if (isFraud) {
    // If forced, use that type, otherwise random pick
    const scenario = forceFraudType 
      ? (forceFraudType === 'BEHAVIORAL' ? 0.9 : 0.1) 
      : Math.random();

    if (scenario > 0.5) {
      // High Amount Fraud (Behavioral)
      merchant = MERCHANTS[Math.floor(Math.random() * MERCHANTS.length)];
      amount = userProfile.mean * (5 + Math.random() * 5); // Huge spike
      narrative = "High value purchase";
    } else {
      // Signature Fraud (Text pattern / RAG)
      const fraudCase = knowledgeBase[Math.floor(Math.random() * knowledgeBase.length)];
      // Clone the case details to ensure a high match score
      merchant = { name: fraudCase.merchant, id: 'M_CLONED_99', risk: 0.9 };
      amount = userProfile.mean * (0.5 + Math.random()); // Normal amount
      narrative = fraudCase.narrative; // Direct text match
    }
  } else {
    // Normal TX
    merchant = MERCHANTS.filter(m => m.risk < 0.3)[Math.floor(Math.random() * 4)];
    amount = Math.max(10, userProfile.mean + (Math.random() - 0.5) * userProfile.stdDev);
    narrative = NARRATIVES[Math.floor(Math.random() * NARRATIVES.length)];
  }

  // 1. Behavioral Check (Fast)
  const zScore = calculateZScore(amount, userProfile);
  
  // 2. Signature Check (Simulated RAG)
  const hybridResult = simulateHybridSearch({ merchant: merchant.name, narrative }, knowledgeBase);

  // 3. Determine Risk
  let risk: 'LOW' | 'MEDIUM' | 'CRITICAL' = 'LOW';
  if (zScore > 3 || hybridResult.score > 0.6) risk = 'MEDIUM';
  if (zScore > 5 || hybridResult.score > 0.8) risk = 'CRITICAL';

  return {
    id: `TX-${Math.floor(Math.random() * 100000)}`,
    timestamp: new Date().toISOString(),
    amount: parseFloat(amount.toFixed(2)),
    merchant: merchant.name,
    merchantId: merchant.id || 'M_UNK',
    narrative: narrative,
    location: "New York, US",
    ip: `192.168.${Math.floor(Math.random()*255)}.1`,
    zScore,
    velocityScore: Math.random(), // Simulated velocity
    signatureMatchScore: hybridResult.score,
    matchedCaseId: hybridResult.match?.id,
    riskLevel: risk,
    status: risk === 'LOW' ? 'ALLOWED' : 'PENDING'
  };
};