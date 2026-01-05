/**
 * Core crowd prediction logic
 * Combines time, day, weather, and holiday signals
 */

/**
 * Analyze time-based crowding factors
 * @param {Date} date - Timestamp to analyze
 * @returns {Object} Time analysis
 */
function analyzeTime(date) {
  const hour = date.getHours();
  const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  // Peak hours analysis
  const isMorningPeak = hour >= 8 && hour <= 11;
  const isEveningPeak = hour >= 17 && hour <= 21;
  const isPeakHour = isMorningPeak || isEveningPeak;
  
  // Off-peak analysis
  const isLateNight = hour >= 22 || hour <= 5;
  const isMidday = hour >= 12 && hour <= 16;
  
  let timeScore = 0;
  let timeReason = 'Normal hours';
  let timeImpact = 'neutral';
  
  if (isPeakHour && !isWeekend) {
    timeScore = 0.5;
    timeReason = isMorningPeak ? 'Morning rush hour' : 'Evening rush hour';
    timeImpact = 'high';
  } else if (isPeakHour && isWeekend) {
    timeScore = 0.2;
    timeReason = 'Weekend peak hours';
    timeImpact = 'medium';
  } else if (isLateNight) {
    timeScore = -0.3;
    timeReason = 'Late night hours';
    timeImpact = 'low';
  } else if (isMidday && !isWeekend) {
    timeScore = 0.1;
    timeReason = 'Midday hours';
    timeImpact = 'low';
  }
  
  // Weekend factor
  let dayScore = 0;
  let dayReason = 'Weekday';
  if (isWeekend) {
    dayScore = -0.2;
    dayReason = dayOfWeek === 0 ? 'Sunday' : 'Saturday';
  }
  
  return {
    hour,
    dayOfWeek,
    isWeekend,
    isPeakHour,
    time: { score: timeScore, impact: timeImpact, reason: timeReason },
    day: { score: dayScore, impact: isWeekend ? 'low' : 'neutral', reason: dayReason }
  };
}

/**
 * Calculate final crowd prediction
 * @param {Object} params - All factors
 * @returns {Object} Prediction result
 */
function predictCrowd({ timeAnalysis, weatherImpact, holidayImpact, includeWeather = true }) {
  // Base score (0.5 = medium)
  let score = 0.5;
  const factors = [];
  
  // Add time factor
  score += timeAnalysis.time.score;
  if (timeAnalysis.time.impact !== 'neutral') {
    factors.push({ name: timeAnalysis.time.reason, impact: timeAnalysis.time.impact });
  }
  
  // Add day factor
  score += timeAnalysis.day.score;
  if (timeAnalysis.day.impact !== 'neutral') {
    factors.push({ name: timeAnalysis.day.reason, impact: timeAnalysis.day.impact });
  }
  
  // Add weather factor (if enabled)
  if (includeWeather && weatherImpact) {
    score += weatherImpact.score;
    if (weatherImpact.impact !== 'neutral') {
      factors.push({ name: weatherImpact.reason, impact: weatherImpact.impact });
    }
  }
  
  // Add holiday factor
  if (holidayImpact) {
    score += holidayImpact.score;
    if (holidayImpact.impact !== 'neutral') {
      factors.push({ name: holidayImpact.reason, impact: holidayImpact.impact });
    }
  }
  
  // Clamp score between 0 and 1
  score = Math.max(0, Math.min(1, score));
  
  // Determine crowd level
  let crowdLevel;
  if (score < 0.35) {
    crowdLevel = 'Low';
  } else if (score < 0.65) {
    crowdLevel = 'Medium';
  } else {
    crowdLevel = 'High';
  }
  
  // Generate explanation
  const highFactors = factors.filter(f => f.impact === 'high').map(f => f.name);
  const lowFactors = factors.filter(f => f.impact === 'low').map(f => f.name);
  
  let explanation = '';
  if (highFactors.length > 0) {
    explanation = highFactors.join(' + ');
  } else if (lowFactors.length > 0) {
    explanation = lowFactors.join(' + ');
  } else {
    explanation = 'Normal conditions';
  }
  
  return {
    crowdLevel,
    score: Math.round(score * 100) / 100,
    factors,
    explanation
  };
}

module.exports = { analyzeTime, predictCrowd };
