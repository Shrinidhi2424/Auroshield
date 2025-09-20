import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationError {
  code: number;
  message: string;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<LocationError | null>(null);

  const getCurrentLocation = async (): Promise<LocationData | null> => {
    if (!navigator.geolocation) {
      setError({ code: 0, message: 'Geolocation is not supported by this browser.' });
      return null;
    }

    setLoading(true);
    setError(null);

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Mock reverse geocoding - in real implementation, use Google Maps Geocoding API
          const address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          
          const locationData = { latitude, longitude, address };
          setLocation(locationData);
          setLoading(false);
          resolve(locationData);
        },
        (error) => {
          setError({
            code: error.code,
            message: error.message,
          });
          setLoading(false);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    location,
    loading,
    error,
    getCurrentLocation,
  };
}
