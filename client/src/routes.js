import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { UserPage } from './pages/UserPage';
import { CompanyPage } from './pages/CompanyPage';
import { MainPage } from './pages/MainPage';
import { ReviewPage } from './pages/ReviewPage';
import {ProfilePage} from './pages/ProfilePage'
import { CompaniesListPage } from './pages/CompaniesListPage'
import { UsersListPage } from './pages/UsersListPage'
import { ReviewsListPage } from './pages/ReviewsListPage'
import { NewReviewPage } from './pages/NewReviewPage'
import AuthPage from './pages/AuthPage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/review/new" exact>
          <NewReviewPage />
        </Route>
        <Route path="/user/:id" exact>
          <UserPage />
        </Route>
        <Route path="/company/:id" exact>
          <CompanyPage />
        </Route>
        <Route path="/review/:id" exact>
          <ReviewPage />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/user" exact>
          <UsersListPage />
        </Route>
        <Route path="/review" exact>
          <CompaniesListPage />
        </Route>
        <Route path="/company" exact>
          <ReviewsListPage />
        </Route>
        <Route path="/" exact>
          <MainPage />
        </Route>
        {/* <Redirect to="/" /> */}
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/auth" exact>
        <AuthPage />
      </Route>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );
};
