import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from './components/AppContainer';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import NavBar from './components/NavBar';
import Loader from './components/Loader';

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  console.log(isAuthenticated);

  const routes = useRoutes(isAuthenticated);
  if (!ready) {
    return  <Loader/>
  }
  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
      <Router>
        <NavBar />
        <AppContainer auth={isAuthenticated}>{routes}</AppContainer>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
