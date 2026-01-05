const https = require('https');

const CALENDARIFIC_API_KEY = process.env.CALENDARIFIC_API_KEY || 'Bjh2nl4BqOSN1KptOXShCAS7HKVQcCFY';

// Cache holidays for the day to avoid repeated API calls
const holidayCache = new Map();

/**
 * Check if a date is a public holiday in India
 * @param {Date} date - Date to check
 * @returns {Promise<Object>} Holiday info
 */
async function checkHoliday(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const cacheKey = `${year}-${month}-${day}`;
  
  // Check cache first
  if (holidayCache.has(cacheKey)) {
    return holidayCache.get(cacheKey);
  }
  
  return new Promise((resolve) => {
    const url = `https://calendarific.com/api/v2/holidays?api_key=${CALENDARIFIC_API_KEY}&country=IN&year=${year}&month=${month}&day=${day}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const holidays = parsed.response?.holidays || [];
          
          // Filter for national/public holidays
          const publicHoliday = holidays.find(h => 
            h.type?.includes('National holiday') || 
            h.type?.includes('Public holiday') ||
            h.type?.includes('Gazetted holiday')
          );
          
          const result = {
            isHoliday: !!publicHoliday,
            name: publicHoliday?.name || null,
            type: publicHoliday?.type?.[0] || null
          };
          
          holidayCache.set(cacheKey, result);
          resolve(result);
        } catch (e) {
          resolve({ isHoliday: false, name: null, type: null });
        }
      });
    }).on('error', () => {
      resolve({ isHoliday: false, name: null, type: null });
    });
  });
}

/**
 * Get holiday impact on crowding
 * Holidays typically reduce regular commuter traffic
 * @param {Object} holidayInfo - Holiday info
 * @returns {Object} Holiday impact
 */
function getHolidayImpact(holidayInfo) {
  if (holidayInfo.isHoliday) {
    return {
      score: -0.4, // Negative = reduces crowd
      impact: 'low',
      reason: `Public holiday: ${holidayInfo.name}`
    };
  }
  return { score: 0, impact: 'neutral', reason: 'Regular day' };
}

module.exports = { checkHoliday, getHolidayImpact };
