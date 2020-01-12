import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AutorsPage } from './pages/AutorsPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { MainPage } from './pages/MainPage';
import { ReviewsPage } from './pages/ReviewsPage';
import AuthPage from './pages/AuthPage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/autors" exact>
          <AutorsPage />
        </Route>
        <Route path="/companies" exact>
          <CompaniesPage />
        </Route>
        <Route path="/reviews" exact>
          <ReviewsPage />
        </Route>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
    </Switch>
  );
};
