import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-6"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl">🚇</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="text-gradient">TransitFlow</span>
              </h1>
              <p className="text-sm text-zinc-500">Smart Crowd Prediction</p>
            </div>
          </div>

          {/* Tagline */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass-card">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm text-zinc-400">Live predictions for Indian cities</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
