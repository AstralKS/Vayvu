const { CITY_COORDINATES, CITY_ROUTES, ROUTE_STOPS } = require('./lib/transit-data');

/**
 * Serverless function to get transit data
 * GET /api/transit?city=delhi
 * GET /api/transit?city=delhi&route=yellow-line
 */
module.exports = async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { city, route } = req.query;
  
  // If no city specified, return all cities
  if (!city) {
    const cities = Object.entries(CITY_COORDINATES).map(([id, data]) => ({
      id,
      name: data.name,
      lat: data.lat,
      lon: data.lon
    }));
    return res.status(200).json({ cities });
  }
  
  // Validate city
  const cityData = CITY_COORDINATES[city.toLowerCase()];
  if (!cityData) {
    return res.status(400).json({
      error: 'Invalid city',
      validCities: Object.keys(CITY_COORDINATES)
    });
  }
  
  // Get routes for city
  const routes = CITY_ROUTES[city.toLowerCase()] || [];
  
  // If no route specified, return city info with routes
  if (!route) {
    return res.status(200).json({
      city: {
        id: city.toLowerCase(),
        name: cityData.name,
        lat: cityData.lat,
        lon: cityData.lon
      },
      routes: routes.map(r => ({
        id: r.id,
        name: r.name,
        type: r.type
      }))
    });
  }
  
  // Validate route
  const routeData = routes.find(r => r.id === route);
  if (!routeData) {
    return res.status(400).json({
      error: 'Invalid route',
      validRoutes: routes.map(r => r.id)
    });
  }
  
  // Get stops for route
  const stops = ROUTE_STOPS[route] || [];
  
  return res.status(200).json({
    city: {
      id: city.toLowerCase(),
      name: cityData.name
    },
    route: {
      id: routeData.id,
      name: routeData.name,
      type: routeData.type
    },
    stops: stops.map(s => ({
      id: s.id,
      name: s.name
    }))
  });
};
