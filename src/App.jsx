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
  EsignLoginPage
} from './views'
import ProtectedRoute from './components/ProtectedRoute'

function App () {
  return (
    <Fragment>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path='/'><Redirect to={{ pathname: '/documents', search: '?status=2', state: { id: '/documents/2' } }} /></PrivateRoute>

          <PrivateRoute path='/new-document' component={NewDocumentPage} />

          <ProtectedRoute path='/esc-checking' component={EcsCheckingPage} />

          <PrivateRoute exact path='/companies' component={CompaniesPage} />
          <PrivateRoute path='/companies/:id' component={SingleCompanyPage} />

          <PrivateRoute exact path='/documents' component={DocumentsPage} />
          <PrivateRoute exact path='/attachments' component={AttachmentsPage} />
          <PrivateRoute path='/documents/:id' component={SingleDocumentPage} />
          <PrivateRoute path='/attachments/:id' component={SingleDocumentPage} />
          <PrivateRoute path='/registry' component={RegistryPage} />
          <PrivateRoute path='/user-me' component={UserInfoPage} />

          <PublicRoute path='/login' component={LoginPage} />
          <PublicRoute path='/register' component={RegisterPage} />
          <PublicRoute path='/complete-registration/:id' component={CompleteRegistrationForm} />
          <PublicRoute path='/password-recovery' component={ResetPasswordPage} />
          <ProtectedRoute path='/document/:id/shared/:code' component={SingleSharedDocumentPage} />
          <ProtectedRoute path='/e-sign-login' component={EsignLoginPage} />
          <Route path='*' render={() => <div>404</div>} />
        </Switch>
      </Router>
    </Fragment>
  )
}

export default App
