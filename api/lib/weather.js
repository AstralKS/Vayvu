const https = require('https');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'a05cf7d57fb67a8d78b03008fc734be5';

/**
 * Fetch current weather for given coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data
 */
async function getWeather(lat, lon) {
  return new Promise((resolve, reject) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.cod !== 200) {
            resolve(getDefaultWeather());
            return;
          }
          resolve({
            condition: parsed.weather?.[0]?.main || 'Clear',
            description: parsed.weather?.[0]?.description || 'clear sky',
            temp: Math.round(parsed.main?.temp || 25),
            humidity: parsed.main?.humidity || 50,
            windSpeed: parsed.wind?.speed || 0,
            icon: parsed.weather?.[0]?.icon || '01d'
          });
        } catch (e) {
          resolve(getDefaultWeather());
        }
      });
    }).on('error', () => {
      resolve(getDefaultWeather());
    });
  });
}

/**
 * Get weather impact score for crowding prediction
 * Rain/Storm increases crowd (people rush to transit), extreme heat/cold too
 * @param {Object} weather - Weather data
 * @returns {Object} Weather impact
 */
function getWeatherImpact(weather) {
  const condition = weather.condition?.toLowerCase() || 'clear';
  
  // Rain/Storm conditions increase crowding (more people use transit)
  if (condition.includes('rain') || condition.includes('drizzle')) {
    return { score: 0.3, impact: 'high', reason: 'Rainy weather' };
  }
  if (condition.includes('thunder') || condition.includes('storm')) {
    return { score: 0.4, impact: 'high', reason: 'Stormy weather' };
  }
  
  // Extreme temperatures
  const temp = weather.temp || 25;
  if (temp > 40) {
    return { score: 0.2, impact: 'medium', reason: 'Extreme heat' };
  }
  if (temp < 10) {
    return { score: 0.1, impact: 'low', reason: 'Cold weather' };
  }
  
  // Clear/normal weather
  return { score: 0, impact: 'neutral', reason: 'Normal weather' };
}

function getDefaultWeather() {
  return {
    condition: 'Clear',
    description: 'clear sky',
    temp: 25,
    humidity: 50,
    windSpeed: 5,
    icon: '01d'
  };
}

module.exports = { getWeather, getWeatherImpact };
