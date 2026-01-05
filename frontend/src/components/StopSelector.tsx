import { motion } from 'framer-motion';
import { type Stop, STOPS_BY_ROUTE } from '../data/cities';

interface StopSelectorProps {
  routeId: string;
  value: string;
  onChange: (stopId: string) => void;
}

export function StopSelector({ routeId, value, onChange }: StopSelectorProps) {
  const stops = routeId ? STOPS_BY_ROUTE[routeId] || [] : [];
  const isDisabled = !routeId;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-2"
    >
      <label className="input-label">
        <span className="flex items-center gap-2">
          <span>📍</span>
          <span>Select Stop</span>
          <span className="text-xs text-zinc-600">(optional)</span>
        </span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field cursor-pointer"
        disabled={isDisabled}
        style={{ opacity: isDisabled ? 0.5 : 1 }}
      >
        <option value="">
          {isDisabled ? 'Select a route first...' : 'All stops (average)'}
        </option>
        {stops.map((stop: Stop) => (
          <option key={stop.id} value={stop.id}>
            {stop.name}
          </option>
        ))}
      </select>
    </motion.div>
  );
}
