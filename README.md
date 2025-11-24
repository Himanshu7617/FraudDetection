# FraudLens - Hybrid Fraud Detection System

<div align="center">

**An advanced real-time fraud detection platform powered by AI, combining behavioral analysis with signature-based pattern matching, multi-language support, and interactive analysis.**

[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.4-purple?logo=vite)](https://vitejs.dev)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-orange)](https://ai.google.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwind-css)](https://tailwindcss.com)

</div>

---

## 📋 Overview

FraudLens is a real-time fraud detection platform that leverages hybrid detection methods to identify suspicious financial transactions. The system combines:

- **Behavioral Analysis**: Z-score based anomaly detection using transaction history
- **Signature Matching**: RAG-powered pattern recognition against a knowledge base of known fraud cases
- **AI-Powered Analysis**: Gemini 2.5 Flash for intelligent threat assessment and recommendations

The platform provides analysts with actionable insights through an intuitive dashboard, enabling rapid decision-making for transaction approval or blocking.

---

## 🎯 Key Features

### 1. Live Transaction Monitoring
- Real-time transaction stream with automatic risk assessment
- Behavioral Z-score calculation based on user history
- Hybrid scoring system combining multiple detection methods
- Color-coded risk levels (LOW/MEDIUM/CRITICAL)

### 2. AI-Powered ChatBot with Voice Input
- 🤖 **Gemini Integration**: Advanced LLM-based fraud analysis and recommendations
- 🎤 **Voice Input**: Web Speech API for hands-free interaction with microphone support
- 💬 **Context-Aware Responses**: Analyzes selected transactions in real-time
- 🔄 **Smart Fallback**: Pattern matching when API is unavailable
- **Supported Queries**:
  - "Analyze the current transaction"
  - "What are the risk factors?"
  - "Should I block or allow this?"
  - "How does the system work?"
  - "Tell me about fraud patterns"

### 3. Real-Time Risk Dashboard
- **Live Metrics**: Transaction volume, fraud count, detection rates
- **System Health**: NORMAL/WARNING/CRITICAL status monitoring
- **Model Performance**: Accuracy, Precision, Recall metrics
- **Latency Tracking**: P95/P99 response time percentiles
- **Transaction Trends**: Historical visualization with line charts
- **Alert Distribution**: Real-time alert breakdown

### 4. Document Store - Compliance Management
Five specialized tabs for complete compliance management:
- **📋 AML Policies**: Jurisdiction-specific Anti-Money Laundering rules with configurable thresholds
- **🚫 Sanction Lists**: OFAC-style blocked entities (Organization, Individual, Bank)
- **🏪 Merchant Ratings**: Risk tier classification with fraud/chargeback rates
- **👤 Customer Policies**: Daily/monthly limits, KYC verification status
- **📝 Audit Logs**: Complete transaction and policy change history

### 5. Multi-Language Support
Switch between 5 languages instantly with localStorage persistence:
- 🇬🇧 **English**
- 🇮🇳 **हिंदी** (Hindi)
- 🇵🇰 **اردو** (Urdu)
- 🇮🇳 **मराठी** (Marathi)
- 🇮🇳 **ગુજરાતી** (Gujarati)

### 6. Interactive Analyst Panel
- Detailed transaction information and risk scoring
- Z-Score calculation (behavioral deviation analysis)
- Signature match percentage (pattern similarity)
- Fraud pattern narratives and explanations
- **Block & Learn**: Add confirmed frauds to knowledge base
- **Allow**: Mark transactions as legitimate

### 7. Feedback Loop & Learning
- Learn from analyst decisions to improve future detections
- "Block & Learn" adds confirmed fraud cases to knowledge base
- Adaptive pattern recognition based on feedback
- Growing knowledge base for better accuracy

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework for interactive dashboard |
| **TypeScript** | Type-safe application development |
| **Vite 6.4** | Lightning-fast build tool and dev server |
| **Tailwind CSS 3** | Utility-first styling framework |
| **Recharts** | Data visualization for risk metrics |
| **Google Gemini 2.5 Flash** | AI-powered fraud analysis |
| **Web Speech API** | Native browser voice recognition |
| **Lucide React** | Icon library for UI components |
| **React Context** | Language state management |
| **localStorage** | Persistent user preferences |

---

## 📦 Project Structure

```
FraudDetection-main/
├── components/
│   ├── AnalystPanel.tsx              # Transaction detail & analysis
│   ├── ChatBot.tsx                   # AI analyst with voice input
│   ├── Dashboard.tsx                 # Real-time metrics visualization
│   ├── DocumentStoreViewer.tsx       # Compliance policies UI (5 tabs)
│   ├── LanguageSelector.tsx          # Multi-language dropdown
│   ├── Toast.tsx                     # Notification system
│   └── TransactionStream.tsx         # Live transaction feed
│
├── contexts/
│   └── LanguageContext.tsx           # Language state & persistence
│
├── services/
│   ├── documentStore.ts              # Compliance & policy data
│   ├── metrics.ts                    # Dashboard metrics calculation
│   └── simulation.ts                 # Fraud generation & detection
│
├── types.ts                          # TypeScript interfaces
├── constants.ts                      # Icons & initial knowledge base
├── translations.ts                   # Multi-language strings (5 languages)
├── App.tsx                           # Main application component
├── index.tsx                         # React entry point (LanguageProvider)
├── App.css                           # Global styles
├── index.html                        # HTML entry
├── vite.config.ts                    # Vite configuration
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── package.json                      # Dependencies
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** 8.0 or higher
- **Google Gemini API Key** (get one free at [ai.google.dev](https://ai.google.dev))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ambitiouswithayush/FraudDetection.git
   cd FraudDetection
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file (not included in repo for security)
   echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

---

## 📖 Usage Guide

### Main Navigation (Top Right & Left Sidebar)

| Icon | Feature | Purpose |
|------|---------|---------|
| 📄 | **Document Store** | View compliance policies, merchant ratings, sanction lists |
| 📊 | **Dashboard** | Real-time metrics and performance monitoring |
| 🧠 | **AI Chat** | Interactive discussion with Gemini analyst |
| 📡 | **Live Monitor** | Main analyst view with transaction stream |
| ⚡ | **Inject Event** | Trigger test fraud scenarios |
| ⏸️/▶️ | **Pause/Resume** | Control transaction stream simulation |
| 🌐 | **Language** | Switch between 5 languages (top-right) |

### Using the ChatBot

#### Text Input
1. Click **AI Chat** button in sidebar
2. Type your question or statement
3. Press **Enter** or click send arrow (→)

**Example Interactions:**
- "Analyze the current transaction"
- "What are the risk factors for this transaction?"
- "Should I block or allow this?"
- "How does the hybrid detection work?"
- "Tell me about the knowledge base"
- "What patterns trigger high-risk alerts?"

#### Voice Input 🎤
1. Click the **microphone button** (🎤) in ChatBot input area
2. **Grant microphone permission** when browser prompts
3. Speak your question clearly
4. Speech transcription appears in input field
5. Click "Stop" button or let auto-stop occur
6. Press Enter to send

**Requirements:**
- Chrome, Edge, or Safari browser (best support on Chrome)
- Microphone permission granted
- Network connection (for API if using Gemini)

### Analyzing Transactions

1. **Select a transaction** from the left stream
2. **View details** in Analyst Panel:
   - Amount and merchant information
   - Risk level (color-coded: green/yellow/red)
   - Z-Score (behavioral deviation metric)
   - Signature Match % (pattern similarity)
   - Fraud narrative explanation
3. **Ask ChatBot**: Select transaction, then ask AI for insights
4. **Take Action**:
   - ✅ **Allow**: Mark as legitimate transaction
   - 🚫 **Block & Learn**: Block and add pattern to knowledge base

### Using the Dashboard

1. Click **📊 Dashboard** button
2. View comprehensive metrics:
   - **KPI Cards**: Transactions, fraud count, approval status
   - **Trend Chart**: Transaction volume over time
   - **Model Performance**: Accuracy, precision, recall
   - **Latency Metrics**: P95/P99 response times
   - **System Health**: Current operational status
   - **Alert Distribution**: Pie chart of alert categories

### Accessing Document Store

1. Click **📄 Document Store** button
2. Browse 5 specialized tabs:

   **AML Policies Tab**
   - View jurisdiction-specific Anti-Money Laundering rules
   - See configurable thresholds and actions
   - Check policy versions and effective dates

   **Sanction List Tab**
   - See OFAC-blocked entities
   - Filter by entity type (Organization/Individual/Bank)
   - View blocking action details

   **Merchant Ratings Tab**
   - Risk tier classifications (LOW/MEDIUM/HIGH)
   - Fraud rate and chargeback percentages
   - Compliance issue history with dates

   **Customer Policies Tab**
   - Daily and monthly transaction limits
   - Allowed and blocked countries
   - KYC verification status

   **Audit Logs Tab**
   - Complete transaction approval/rejection history
   - Policy change audit trail
   - Timestamp and decision maker info

### Changing Language

1. Click **🌐 globe icon** in top-right navbar
2. Select language from dropdown:
   - 🇬🇧 English
   - 🇮🇳 हिंदी (Hindi)
   - 🇵🇰 اردو (Urdu)
   - 🇮🇳 मराठी (Marathi)
   - 🇮🇳 ગુજરાતી (Gujarati)
3. UI updates instantly
4. Selection saved automatically to localStorage

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root:

```env
# Google Gemini API Key (Required)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Security Note**: The `.env` file is excluded from git via `.gitignore`. Never commit API keys.

### Vite Configuration
The `vite.config.ts` handles:
- Development server on port 3000
- API key injection into build
- TypeScript resolution
- React Fast Refresh

---

## 🧠 How It Works

### Detection Pipeline

```
Incoming Transaction
        ↓
[1. Behavioral Analysis] ← User History (Z-Score)
        ├─ Calculate mean & stddev of user transactions
        ├─ Compute Z-score for new transaction
        └─ Flag if deviation > threshold (typically 2.0)
        ↓
[2. Signature Matching] ← Knowledge Base (Pattern Matching)
        ├─ Compare against known fraud patterns
        ├─ Calculate similarity score
        └─ Retrieve most similar historical cases
        ↓
[3. Policy Validation]
        ├─ Check OFAC sanction lists
        ├─ Validate AML compliance rules
        └─ Verify merchant risk rating
        ↓
[4. Risk Scoring] → Combined Risk Level (LOW/MEDIUM/CRITICAL)
        ↓
[5. Display in Stream]
        ├─ Color-coded by risk level
        └─ Available for analyst review
        ↓
[6. Analyst Panel Review] ← Z-Score, Match %, Narrative
        ↓
[7. Ask ChatBot for Insights] ← Gemini AI Analysis
        ├─ Context-aware recommendations
        ├─ Pattern explanations
        └─ Risk factor breakdown
        ↓
[8. Decision] → Allow / Block & Learn / Ask for More Info
        ↓
[9. Feedback Loop] → Learn from Decision
        ├─ "Block & Learn" updates knowledge base
        └─ Improves future detections
```

### Behavioral Analysis (Z-Score)
- **Calculation**: Z-score = (Value - Mean) / Standard Deviation
- **Data**: Uses rolling window of user's last 50 transactions
- **Threshold**: Transactions with Z-score > 2.0 flagged as suspicious
- **Interpretation**:
  - Z-score 2.0 = 95.4% confidence it's an outlier
  - Z-score 3.0 = 99.7% confidence it's an outlier

### Signature Matching (Pattern Recognition)
- **Method**: Compares transaction against knowledge base patterns
- **Scoring**: Similarity metric (0-1 scale)
- **Data**: Includes transaction amount, merchant, narrative
- **Threshold**: Match > 0.6 indicates suspected fraud
- **Knowledge Base**: Starts with 3 patterns, grows with feedback

### AI Analysis (Gemini Integration)
- **Model**: Google Gemini 2.5 Flash (optimized for speed)
- **Input**: Current transaction + Z-score + Signature match + Selected context
- **Process**:
  1. Builds system prompt with fraud detection guidelines
  2. Includes current transaction details
  3. Provides knowledge base context
  4. Sends to Gemini API for analysis
- **Output**: Intelligent recommendations with explanations
- **Fallback**: Smart pattern matching if API unavailable

### Compliance Validation
- **OFAC Check**: Blocks transactions with sanctioned entities
- **AML Rules**: Validates against jurisdiction-specific regulations
- **Merchant Rating**: Checks merchant risk tier and compliance history
- **Action**: AUTO_APPROVE, REQUIRE_VERIFICATION, FLAG, or BLOCK

---

## 📊 Data Structures

### Transaction
```typescript
interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  merchantId: string;
  narrative: string;
  timestamp: number;
  riskLevel: "LOW" | "MEDIUM" | "CRITICAL";
  zScore: number;
  signatureMatchScore: number;
  matchedCaseId?: string;
  status?: "ALLOWED" | "BLOCKED" | "PENDING";
}
```

### Analysis Result
```typescript
interface AnalysisResult {
  isLikelyFraud: boolean;
  confidence: number;
  reasoning: string;
  recommendedAction: "BLOCK" | "ALLOW" | "HOLD";
  keyRiskFactors: string[];
}
```

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 🔐 Security Considerations

1. **API Key Protection**
   - Store API keys in `.env` (git-ignored)
   - Use `VITE_` prefix for client-side exposure only
   - Never commit `.env` to version control

2. **Data Handling**
   - All sensitive data stays client-side in development
   - Production deployments should use backend authentication
   - Consider rate limiting for API calls

3. **Best Practices**
   - Rotate API keys regularly
   - Use environment-specific credentials
   - Implement request signing for production APIs

---

## 🧪 Testing

### Inject Fraud Events
Click the ⚡ **Inject Event** button to:
- Trigger simulated fraud transactions
- Test analyst workflow
- Validate AI analysis functionality
- Pause stream for detailed examination

---

## 🔗 API Integration

### Google Gemini API
- **Model**: Gemini 2.5 Flash (optimized for speed/cost)
- **Format**: JSON schema with structured responses
- **Prompt Engineering**: RAG-enhanced prompts with transaction context

Example usage in `services/gemini.ts`:
```typescript
const result = await genAI.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
  config: {
    responseMimeType: "application/json",
    responseSchema: { /* schema */ }
  }
});
```

---

## 📈 Performance Metrics

- **Transaction Generation**: 2.5 seconds per new transaction
- **AI Analysis**: < 2 seconds per analysis request
- **UI Responsiveness**: 60 FPS interactions
- **Memory Footprint**: ~30MB for 50 transactions

---

## 🐛 Troubleshooting

### "API Key not found" Error
```
Solution: Create .env file with VITE_GEMINI_API_KEY=your_key
```

### Blank Page on Load
```
Solution: Clear browser cache (Cmd+Shift+R) and restart dev server
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💼 Author

**Ayush Kumar**
GitHub: [@ambitiouswithayush](https://github.com/ambitiouswithayush)

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev) for advanced LLM capabilities
- [React](https://react.dev) for the UI framework
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Vite](https://vitejs.dev) for the build tool

---

## 📞 Support

For issues, feature requests, or questions, please open an issue on [GitHub](https://github.com/ambitiouswithayush/FraudDetection/issues).

---

<div align="center">

**Made with ❤️ for fraud detection excellence**

[⬆ Back to top](#fraudlens---hybrid-fraud-detection-platform)

</div>
