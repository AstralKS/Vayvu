import { motion } from 'framer-motion';

interface WeatherToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function WeatherToggle({ checked, onChange }: WeatherToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="pt-2"
    >
      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="flex items-center gap-2">
          <span>☁️</span>
          <span className="text-sm text-zinc-300">Include weather impact</span>
        </span>
      </label>
      <p className="text-xs text-zinc-600 mt-2 ml-8">
        Rain and extreme weather can affect crowd levels
      </p>
    </motion.div>
  );
}
