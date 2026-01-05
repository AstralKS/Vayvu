import { useState, useCallback } from 'react';

export interface PredictionRequest {
  city: string;
  route_id: string;
  stop_id?: string;
  timestamp: string;
  includeWeather: boolean;
}

export interface Factor {
  name: string;
  impact: 'low' | 'medium' | 'high' | 'neutral';
}

export interface PredictionResponse {
  success: boolean;
  prediction: {
    crowdLevel: 'Low' | 'Medium' | 'High';
    score: number;
    factors: Factor[];
    explanation: string;
  };
  location: {
    city: string;
    route: string;
    stop: string;
  };
  weather: {
    condition: string;
    description: string;
    temp: number;
    humidity: number;
  } | null;
  holiday: {
    name: string;
    type: string;
  } | null;
  timestamp: string;
  analysis: {
    hour: number;
    dayOfWeek: number;
    isWeekend: boolean;
    isPeakHour: boolean;
  };
}

export interface UsePredictionReturn {
  prediction: PredictionResponse | null;
  loading: boolean;
  error: string | null;
  fetchPrediction: (request: PredictionRequest) => Promise<void>;
  reset: () => void;
}

export function usePrediction(): UsePredictionReturn {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrediction = useCallback(async (request: PredictionRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/predict-crowd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch prediction');
      }

      const data: PredictionResponse = await response.json();
      setPrediction(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setPrediction(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    prediction,
    loading,
    error,
    fetchPrediction,
    reset,
  };
}
