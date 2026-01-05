import { motion, AnimatePresence } from 'framer-motion';
import type { PredictionResponse } from '../hooks/usePrediction';

interface PredictionCardProps {
  prediction: PredictionResponse | null;
  loading: boolean;
  error: string | null;
}

export function PredictionCard({ prediction, loading, error }: PredictionCardProps) {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="neuro-card p-8 flex flex-col items-center justify-center min-h-[300px]"
      >
        <div className="spinner mb-4"></div>
        <p className="text-zinc-400">Analyzing crowd patterns...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="neuro-card p-8 border border-red-500/20"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚠️</span>
          <h3 className="text-lg font-semibold text-red-400">Prediction Failed</h3>
        </div>
        <p className="text-zinc-400">{error}</p>
      </motion.div>
    );
  }

  if (!prediction) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="neuro-card p-8 flex flex-col items-center justify-center min-h-[300px] text-center"
      >
        <div className="w-20 h-20 rounded-full bg-zinc-800/50 flex items-center justify-center mb-6">
          <span className="text-4xl opacity-50">📊</span>
        </div>
        <h3 className="text-xl font-semibold text-zinc-400 mb-2">
          Ready to Predict
        </h3>
        <p className="text-zinc-600 max-w-xs">
          Select a city, route, and time to get crowd level predictions
        </p>
      </motion.div>
    );
  }

  const { crowdLevel, score, factors, explanation } = prediction.prediction;
  const { city, route, stop } = prediction.location;
  const weather = prediction.weather;
  const holiday = prediction.holiday;
  const analysis = prediction.analysis;

  // Get colors based on crowd level
  const levelColors = {
    Low: { bg: 'var(--crowd-low-bg)', color: 'var(--crowd-low)', emoji: '🟢' },
    Medium: { bg: 'var(--crowd-medium-bg)', color: 'var(--crowd-medium)', emoji: '🟡' },
    High: { bg: 'var(--crowd-high-bg)', color: 'var(--crowd-high)', emoji: '🔴' },
  };

  const colors = levelColors[crowdLevel];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={prediction.timestamp}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {/* Main Prediction Card */}
        <div className="neuro-card p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-zinc-500 mb-1">Crowd Prediction</p>
              <h2 className="text-lg font-medium text-zinc-200">
                {route}
              </h2>
              <p className="text-sm text-zinc-500">
                {city} {stop !== 'All stops' && `• ${stop}`}
              </p>
            </div>
            <div
              className="badge animate-pulse-glow"
              style={{
                backgroundColor: colors.bg,
                color: colors.color,
                boxShadow: `0 0 20px -5px ${colors.color}`,
              }}
            >
              {colors.emoji} {crowdLevel}
            </div>
          </div>

          {/* Score Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-500">Crowd Level</span>
              <span className="font-mono text-zinc-400">{Math.round(score * 100)}%</span>
            </div>
            <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score * 100}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, var(--crowd-low) 0%, var(--crowd-medium) 50%, var(--crowd-high) 100%)`,
                }}
              />
            </div>
          </div>

          {/* Explanation */}
          <div className="glass-card p-4 mb-6">
            <p className="text-sm text-zinc-300">
              <span className="text-amber-500 font-medium">💡 Insight:</span>{' '}
              {explanation}
            </p>
          </div>

          {/* Factors */}
          {factors.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-zinc-500 mb-3">Contributing Factors</p>
              <div className="flex flex-wrap gap-2">
                {factors.map((factor, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * idx }}
                    className="px-3 py-1.5 rounded-lg text-sm"
                    style={{
                      backgroundColor:
                        factor.impact === 'high'
                          ? 'var(--crowd-high-bg)'
                          : factor.impact === 'low'
                          ? 'var(--crowd-low-bg)'
                          : 'var(--crowd-medium-bg)',
                      color:
                        factor.impact === 'high'
                          ? 'var(--crowd-high)'
                          : factor.impact === 'low'
                          ? 'var(--crowd-low)'
                          : 'var(--crowd-medium)',
                    }}
                  >
                    {factor.name}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Time Analysis */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <span>🕐</span>
              <span className="text-sm font-medium text-zinc-300">Time Analysis</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Hour</span>
                <span className="text-zinc-300 font-mono">{analysis.hour}:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Day</span>
                <span className="text-zinc-300">
                  {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][analysis.dayOfWeek]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Peak Hour</span>
                <span className={analysis.isPeakHour ? 'text-amber-400' : 'text-zinc-400'}>
                  {analysis.isPeakHour ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {/* Weather */}
          {weather && (
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <span>☁️</span>
                <span className="text-sm font-medium text-zinc-300">Current Weather</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Condition</span>
                  <span className="text-zinc-300">{weather.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Temperature</span>
                  <span className="text-zinc-300 font-mono">{weather.temp}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Humidity</span>
                  <span className="text-zinc-300 font-mono">{weather.humidity}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Holiday Notice */}
          {holiday && (
            <div className="glass-card p-4 md:col-span-2 border border-emerald-500/20">
              <div className="flex items-center gap-2">
                <span>🎉</span>
                <span className="text-sm text-emerald-400">
                  Today is <strong>{holiday.name}</strong> - Expect lower commuter traffic
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
