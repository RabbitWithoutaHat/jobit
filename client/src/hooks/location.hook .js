import { useState, useCallback } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState(null);

  const saveLocation = useCallback((mapData) => {
    setLocation(mapData);
  }, []);


  return { saveLocation, location};
};
