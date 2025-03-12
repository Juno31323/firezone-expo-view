import { useState, useEffect } from 'react';
import { Marker } from '../components/marker';

const API_URL = 'https://firezone-nest-api-mjh-88013499747.asia-northeast2.run.app/firezone';

export const useMarkers = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch markers');
        const data: Marker[] = await response.json();
        console.log('Fetched markers:', data); // 데이터 확인
        setMarkers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkers();
  }, []);

  return { markers, loading, error };
};