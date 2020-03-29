import { createContext } from 'react';

function noop() {}

export const LocationContext = createContext({
  saveLocation: noop,
  location: null,
});
