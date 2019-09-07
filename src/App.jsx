import React, { Fragment } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import history from './history'
import 'typeface-roboto'

import { PrivateRoute, PublicRoute } from './components'

import {
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  UserInfoPage,
  Home,
  SingleDocumentPage,
  SingleCompanyPage,
  NewDocumentPage,
  DraftsPage,
  ExternalsPage,
  CompanyPage,
  InboxDocumentsPage,
  OutDocumentsPage
} from './views'

function App () {
  return (
    <Fragment>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path='/' component={Home} />

          <PrivateRoute path='/new-document' component={NewDocumentPage} />

          <PrivateRoute path='/inbox-documents' component={InboxDocumentsPage} />
          <PrivateRoute path='/out-documents' component={OutDocumentsPage} />

          <PrivateRoute path='/drafts-documents' component={DraftsPage} />
          <PrivateRoute path='/externals' component={ExternalsPage} />

          <PrivateRoute exact path='/companies' component={CompanyPage} />
          <PrivateRoute path='/companies/:id' component={SingleCompanyPage} />

          <PrivateRoute path='/documents/:id' component={SingleDocumentPage} />
          <PrivateRoute path='/user-me' component={UserInfoPage} />

          <PublicRoute path='/login' component={LoginPage} />
          <PublicRoute path='/register' component={RegisterPage} />
          <PublicRoute path='/password-recovery' component={ResetPasswordPage} />

          <Route path='*' render={() => <div>404</div>} />
        </Switch>
      </Router>
    </Fragment>
  )
}

export default App
