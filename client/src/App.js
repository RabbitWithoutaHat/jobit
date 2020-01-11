import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from './components/AppContainer';
import { useRoutes } from './routes';

function App() {
  const routes = useRoutes(false);
  return (
    <Router>
      <AppContainer>{routes}</AppContainer>
    </Router>
  );
}

export default App;
