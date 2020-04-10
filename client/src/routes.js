import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { UserPage } from './pages/User/UserPage'
import { CompanyPage } from './pages/Company/CompanyPage'
import { MainPage } from './pages/MainPage'
import { ProfilePage } from './pages/User/ProfilePage'
import { CompaniesListPage } from './pages/Company/CompaniesListPage'
import { UsersListPage } from './pages/User/UsersListPage'
import { ReviewsListPage } from './pages/Review/ReviewsListPage'
import { NewReviewPage } from './pages/Review/NewReviewPage'
import AuthPage from './pages/AuthPage'
import {ReviewReadMorePage} from './pages/Review/ReviewReadMorePage'

export const useRoutes = isAuthenticated => {
  console.log('isAuthenticated', isAuthenticated)
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
        <Route path="/review/edit/:id" component={NewReviewPage} exact />
        <Route path="/review/:id" component={ReviewReadMorePage} exact />
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/user" exact>
          <UsersListPage />
        </Route>
        <Route path="/review" exact>
          <ReviewsListPage />
        </Route>
        <Route path="/company" exact>
          <CompaniesListPage />
        </Route>
        <Route path="/" exact>
          <MainPage />
        </Route>
        {/* <Redirect to="/" /> */}
      </Switch>
    )
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
  )
}
