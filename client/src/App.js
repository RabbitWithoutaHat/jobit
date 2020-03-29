import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from './components/AppContainer';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { useLocation } from './hooks/location.hook ';
import { AuthContext } from './context/AuthContext';
import { LocationContext } from './context/LocationContext';
import NavBar from './components/NavBar';
import Loader from './components/Loader';

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const { saveLocation, location } = useLocation();

  const isAuthenticated = !!token;

  const routes = useRoutes(isAuthenticated);
  if (!ready) {
    return  <Loader/>
  }
  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
    <LocationContext.Provider value={{ saveLocation, location }}>
      <Router>
        <NavBar />
        <AppContainer auth={isAuthenticated}>{routes}</AppContainer>
      </Router>
    </LocationContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
