import { motion } from 'framer-motion';
import { CITIES, type City } from '../data/cities';

interface CitySelectorProps {
  value: string;
  onChange: (cityId: string) => void;
}

export function CitySelector({ value, onChange }: CitySelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-2"
    >
      <label className="input-label">
        <span className="flex items-center gap-2">
          <span>🏙️</span>
          <span>Select City</span>
        </span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field cursor-pointer"
      >
        <option value="">Choose a city...</option>
        {CITIES.map((city: City) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </motion.div>
  );
}
