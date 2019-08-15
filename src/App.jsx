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
  NewDocumentPage,
  DraftsPage,
  ExternalsPage,
  CompanyPage,
  InboxConfirmedDocumentsPage,
  InboxUnconfirmedDocumentsPage,
  OutConfirmedDocumentsPage,
  OutUnconfirmedDocumentsPage
} from './views'

function App () {
  return (
    <Fragment>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path='/' component={Home} />

          <PrivateRoute path='/new-document' component={NewDocumentPage} />

          <PrivateRoute path='/inbox-confirmed-documents' component={InboxConfirmedDocumentsPage} />
          <PrivateRoute path='/inbox-unconfirmed-documents' component={InboxUnconfirmedDocumentsPage} />

          <PrivateRoute path='/out-confirmed-documents' component={OutConfirmedDocumentsPage} />
          <PrivateRoute path='/out-unconfirmed-documents' component={OutUnconfirmedDocumentsPage} />

          <PrivateRoute path='/drafts' component={DraftsPage} />
          <PrivateRoute path='/externals' component={ExternalsPage} />

          <PrivateRoute path='/companies' component={CompanyPage} />

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
