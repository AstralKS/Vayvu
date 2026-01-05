import { motion } from 'framer-motion';
import { type Route, ROUTES_BY_CITY, getRouteIcon } from '../data/cities';

interface RouteSelectorProps {
  cityId: string;
  value: string;
  onChange: (routeId: string) => void;
}

export function RouteSelector({ cityId, value, onChange }: RouteSelectorProps) {
  const routes = cityId ? ROUTES_BY_CITY[cityId] || [] : [];
  const isDisabled = !cityId;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 }}
      className="space-y-2"
    >
      <label className="input-label">
        <span className="flex items-center gap-2">
          <span>🛤️</span>
          <span>Select Route</span>
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
          {isDisabled ? 'Select a city first...' : 'Choose a route...'}
        </option>
        {routes.map((route: Route) => (
          <option key={route.id} value={route.id}>
            {getRouteIcon(route.type)} {route.name}
          </option>
        ))}
      </select>
    </motion.div>
  );
}
