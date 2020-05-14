import React, { Fragment } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import history from './history'
import 'typeface-roboto'

import { PrivateRoute, PublicRoute } from './components'

import {
  LoginPage,
  RegisterPage,
  CompleteRegistrationForm,
  ResetPasswordPage,
  UserInfoPage,
  SingleDocumentPage,
  SingleCompanyPage,
  NewDocumentPage,
  SingleSharedDocumentPage,
  CompaniesPage,
  DocumentsPage,
  AttachmentsPage,
  EcsCheckingPage,
  RegistryPage,
  StoredRegistryPage,
  EsignLoginPage,
  EsignFirstStepPage,
  ExternalRedirectPage,
  CompleteResetForm
} from './views'

import ProtectedRoute from './components/ProtectedRoute'
import WhitePageRoute from './components/WhitePageRoute'

function App () {
  return (
    <Fragment>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path='/'><Redirect to={{ pathname: '/application/documents', search: '?status=2', state: { id: '/documents/2' } }} /></PrivateRoute>

          <PrivateRoute path='/application/new-document' component={NewDocumentPage} />

          <ProtectedRoute path='/application/esc-checking' component={EcsCheckingPage} />

          <PrivateRoute exact path='/application/companies' component={CompaniesPage} />
          <PrivateRoute path='/application/companies/:id' component={SingleCompanyPage} />

          <PrivateRoute exact path='/application/documents' component={DocumentsPage} />
          <PrivateRoute exact path='/application/attachments' component={AttachmentsPage} />
          <PrivateRoute path='/application/documents/:id' component={SingleDocumentPage} />
          <PrivateRoute path='/application/attachments/:id' component={SingleDocumentPage} />
          <PrivateRoute path='/application/registry' component={RegistryPage} />
          <PrivateRoute path='/application/registry-stored' component={StoredRegistryPage} />
          <PrivateRoute path='/application/user-me' component={UserInfoPage} />

          <PublicRoute path='/application/login' component={LoginPage} />
          <PublicRoute path='/application/register' component={RegisterPage} />
          <PublicRoute path='/application/complete-registration/:id' component={CompleteRegistrationForm} />
          <PublicRoute path='/application/complete-reset/:id' component={CompleteResetForm} />
          <PublicRoute path='/application/password-recovery' component={ResetPasswordPage} />
          <ProtectedRoute path='/application/document/:id/shared/:code' component={SingleSharedDocumentPage} />
          <WhitePageRoute path='/application/e-sign-first-step' component={EsignFirstStepPage} />
          <WhitePageRoute path='/application/e-sign-login' component={EsignLoginPage} />
          <WhitePageRoute path='/application/external/auth' component={ExternalRedirectPage} />
          <PublicRoute path='*' component={LoginPage} />
        </Switch>
      </Router>
    </Fragment>
  )
}

export default App
