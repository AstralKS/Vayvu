const { CITY_COORDINATES, CITY_ROUTES, ROUTE_STOPS } = require('./lib/transit-data');
const { getWeather, getWeatherImpact } = require('./lib/weather');
const { checkHoliday, getHolidayImpact } = require('./lib/holidays');
const { analyzeTime, predictCrowd } = require('./lib/prediction');

/**
 * Serverless function for crowd prediction
 * POST /api/predict-crowd
 */
module.exports = async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Parse request body or query params
    const body = req.method === 'POST' ? req.body : req.query;
    const { city, route_id, stop_id, timestamp, includeWeather = true } = body;
    
    // Validate required fields
    if (!city || !route_id) {
      return res.status(400).json({ 
        error: 'Missing required fields: city, route_id' 
      });
    }
    
    // Validate city
    const cityData = CITY_COORDINATES[city.toLowerCase()];
    if (!cityData) {
      return res.status(400).json({ 
        error: 'Invalid city',
        validCities: Object.keys(CITY_COORDINATES)
      });
    }
    
    // Parse timestamp or use current time
    const date = timestamp ? new Date(timestamp) : new Date();
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: 'Invalid timestamp format' });
    }
    
    // Analyze time factors
    const timeAnalysis = analyzeTime(date);
    
    // Fetch weather (if enabled)
    let weather = null;
    let weatherImpact = { score: 0, impact: 'neutral', reason: 'Weather not included' };
    
    if (includeWeather === true || includeWeather === 'true') {
      weather = await getWeather(cityData.lat, cityData.lon);
      weatherImpact = getWeatherImpact(weather);
    }
    
    // Check holiday
    const holidayInfo = await checkHoliday(date);
    const holidayImpact = getHolidayImpact(holidayInfo);
    
    // Generate prediction
    const prediction = predictCrowd({
      timeAnalysis,
      weatherImpact: includeWeather === true || includeWeather === 'true' ? weatherImpact : null,
      holidayImpact,
      includeWeather: includeWeather === true || includeWeather === 'true'
    });
    
    // Get route and stop info
    const routes = CITY_ROUTES[city.toLowerCase()] || [];
    const route = routes.find(r => r.id === route_id);
    const stops = ROUTE_STOPS[route_id] || [];
    const stop = stops.find(s => s.id === stop_id);
    
    return res.status(200).json({
      success: true,
      prediction: {
        crowdLevel: prediction.crowdLevel,
        score: prediction.score,
        factors: prediction.factors,
        explanation: prediction.explanation
      },
      location: {
        city: cityData.name,
        route: route?.name || route_id,
        stop: stop?.name || stop_id || 'All stops'
      },
      weather: weather ? {
        condition: weather.condition,
        description: weather.description,
        temp: weather.temp,
        humidity: weather.humidity
      } : null,
      holiday: holidayInfo.isHoliday ? {
        name: holidayInfo.name,
        type: holidayInfo.type
      } : null,
      timestamp: date.toISOString(),
      analysis: {
        hour: timeAnalysis.hour,
        dayOfWeek: timeAnalysis.dayOfWeek,
        isWeekend: timeAnalysis.isWeekend,
        isPeakHour: timeAnalysis.isPeakHour
      }
    });
    
  } catch (error) {
    console.error('Prediction error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};
