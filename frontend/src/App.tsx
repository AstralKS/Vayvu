import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

import { Header } from './components/Header';
import { CitySelector } from './components/CitySelector';
import { RouteSelector } from './components/RouteSelector';
import { StopSelector } from './components/StopSelector';
import { DateTimePicker } from './components/DateTimePicker';
import { WeatherToggle } from './components/WeatherToggle';
import { PredictionCard } from './components/PredictionCard';
import { usePrediction } from './hooks/usePrediction';

import './index.css';

function App() {
  // Form state
  const [city, setCity] = useState('');
  const [route, setRoute] = useState('');
  const [stop, setStop] = useState('');
  const [datetime, setDatetime] = useState('');
  const [includeWeather, setIncludeWeather] = useState(true);

  // Prediction hook
  const { prediction, loading, error, fetchPrediction, reset } = usePrediction();

  // Initialize datetime to current time
  useEffect(() => {
    const now = new Date();
    setDatetime(format(now, "yyyy-MM-dd'T'HH:mm"));
  }, []);

  // Reset dependent fields when parent changes
  useEffect(() => {
    setRoute('');
    setStop('');
    reset();
  }, [city, reset]);

  useEffect(() => {
    setStop('');
  }, [route]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!city || !route) {
      return;
    }

    await fetchPrediction({
      city,
      route_id: route,
      stop_id: stop || undefined,
      timestamp: datetime,
      includeWeather,
    });
  };

  const isFormValid = city && route && datetime;

  return (
    <div className="min-h-screen relative">
      {/* Ambient Background */}
      <div className="ambient-bg">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Know Before You{' '}
            <span className="text-gradient">Commute</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            AI-powered crowd predictions for India's public transport.
            Plan your journey with real-time insights.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="neuro-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Plan Your Journey</h3>
                  <p className="text-sm text-zinc-500">Select your route details</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <CitySelector value={city} onChange={setCity} />
                <RouteSelector cityId={city} value={route} onChange={setRoute} />
                <StopSelector routeId={route} value={stop} onChange={setStop} />
                <DateTimePicker value={datetime} onChange={setDatetime} />
                <WeatherToggle checked={includeWeather} onChange={setIncludeWeather} />

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className="btn-primary w-full"
                  >
                    {loading ? (
                      <>
                        <div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} />
                        <span>Predicting...</span>
                      </>
                    ) : (
                      <>
                        <span>🔮</span>
                        <span>Predict Crowd Level</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Info Cards */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="glass-card p-4 text-center">
                <div className="text-2xl mb-2">🏙️</div>
                <div className="text-2xl font-bold text-amber-500">6</div>
                <div className="text-xs text-zinc-500">Major Cities</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-2xl mb-2">🛤️</div>
                <div className="text-2xl font-bold text-amber-500">25+</div>
                <div className="text-xs text-zinc-500">Transit Routes</div>
              </div>
            </div>
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PredictionCard
              prediction={prediction}
              loading={loading}
              error={error}
            />
          </motion.div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 glass-card px-6 py-3 text-sm text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Live Weather Data
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Holiday Detection
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Peak Hour Analysis
            </span>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-zinc-600 text-sm">
        <p>Built for Smart City Hackathon 🚀</p>
      </footer>
    </div>
  );
}

export default App;
