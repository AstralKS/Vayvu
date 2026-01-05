# TransitFlow - Smart City Crowd Prediction

AI-powered crowd level predictions for India's public transport. Built for the Smart City Hackathon.

![TransitFlow](https://img.shields.io/badge/TransitFlow-Smart%20City-amber?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square)
![PyTorch](https://img.shields.io/badge/PyTorch-2.0-red?style=flat-square)

## 🚇 Features

- **6 Major Indian Cities**: Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata
- **25+ Transit Routes**: Metro lines, local trains, buses, and trams
- **Real-time Weather Integration**: OpenWeather API for weather impact analysis
- **Holiday Detection**: Calendarific API for Indian public holidays
- **AI-Powered Predictions**: PyTorch neural network for crowd level estimation
- **Beautiful UI**: Glassmorphism + Neumorphism dark theme

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Vite (build tool)

### Backend
- Node.js + Express
- Vercel Serverless Functions

### ML Component
- Python 3.10+
- PyTorch 2.0+
- Flask (inference API)

## 📁 Project Structure

```
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom React hooks
│   │   └── data/        # Static transit data
│   └── index.html
│
├── api/               # Vercel serverless functions
│   ├── predict-crowd.js
│   ├── transit.js
│   └── lib/
│       ├── weather.js
│       ├── holidays.js
│       ├── transit-data.js
│       └── prediction.js
│
├── ml/                # Python ML component
│   ├── model.py       # PyTorch model definition
│   ├── train.py       # Training script
│   └── inference.py   # Flask inference API
│
└── vercel.json        # Vercel deployment config
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd d:\Vayvu
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Setup Python environment (optional, for ML)**
   ```bash
   cd ml
   python -m venv venv
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   ```

### Development

1. **Run frontend**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Run API locally (requires Vercel CLI)**
   ```bash
   npm install -g vercel
   vercel dev
   ```

3. **Train ML model (optional)**
   ```bash
   cd ml
   python train.py
   ```

## 🌐 API Endpoints

### POST /api/predict-crowd
Predict crowd level for a given route and time.

**Request:**
```json
{
  "city": "delhi",
  "route_id": "yellow-line",
  "stop_id": "rajiv-chowk",
  "timestamp": "2026-01-05T09:30:00",
  "includeWeather": true
}
```

**Response:**
```json
{
  "success": true,
  "prediction": {
    "crowdLevel": "High",
    "score": 0.85,
    "factors": [
      { "name": "Morning rush hour", "impact": "high" },
      { "name": "Weekday", "impact": "neutral" }
    ],
    "explanation": "Morning rush hour"
  },
  "weather": {
    "condition": "Clear",
    "temp": 18
  }
}
```

### GET /api/transit
Get transit data (cities, routes, stops).

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#09090b` | Page background |
| `bg-card` | `#27272a` | Card surfaces |
| `accent` | `#f59e0b` | CTA, highlights |
| `crowd-low` | `#10b981` | Low crowd level |
| `crowd-medium` | `#f59e0b` | Medium crowd level |
| `crowd-high` | `#ef4444` | High crowd level |

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables** (in Vercel dashboard)
   - `OPENWEATHER_API_KEY`
   - `CALENDARIFIC_API_KEY`

## 📊 Prediction Logic

The crowd prediction considers:

1. **Time Analysis**
   - Peak hours (8-11 AM, 5-9 PM) → Higher crowd
   - Late night (10 PM - 5 AM) → Lower crowd

2. **Day Type**
   - Weekdays → Higher crowd
   - Weekends → Lower crowd

3. **Weather Impact**
   - Rain/Storm → Higher crowd (more transit usage)
   - Clear → Neutral

4. **Holidays**
   - Public holidays → Lower commuter traffic

## 🤝 Contributing

Built for the Smart City Hackathon 2026.

## 📄 License

MIT License
