import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface DateTimePickerProps {
  value: string;
  onChange: (datetime: string) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  // Get current datetime formatted for datetime-local input
  const now = new Date();
  const minDateTime = format(now, "yyyy-MM-dd'T'HH:mm");
  
  // Get max datetime (30 days from now)
  const maxDate = new Date(now);
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateTime = format(maxDate, "yyyy-MM-dd'T'HH:mm");

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25 }}
      className="space-y-2"
    >
      <label className="input-label">
        <span className="flex items-center gap-2">
          <span style={{ filter: 'brightness(0) invert(1)' }}>📅</span>
          <span>Date & Time</span>
        </span>
      </label>
      <input
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={minDateTime}
        max={maxDateTime}
        className="input-field cursor-pointer"
      />
      <p className="text-xs text-zinc-600 mt-1">
        Predict crowd for now or up to 30 days ahead
      </p>
    </motion.div>
  );
}
