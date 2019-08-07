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
  CompanyPage,
  ConfirmMessagesPages,
  UnconfirmedMessagesPage,
  OutConfirmedDocumentsPage,
  OutUnconfirmedDocumentsPage
} from './views'

function App () {
  return (
    <Fragment>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute path='/documents/:id' component={SingleDocumentPage} />
          <PrivateRoute path='/new-document' component={NewDocumentPage} />
          <PrivateRoute path='/company' component={CompanyPage} />
          <PrivateRoute path='/confirm-messages' component={ConfirmMessagesPages} />
          <PrivateRoute path='/unconfirmed-messages' component={UnconfirmedMessagesPage} />
          <PrivateRoute path='/out-confirmed-documents' component={OutConfirmedDocumentsPage} />
          <PrivateRoute path='/out-unconfirmed-documents' component={OutUnconfirmedDocumentsPage} />
          <PrivateRoute path='/drafts' component={DraftsPage} />
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
