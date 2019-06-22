import React, { Fragment } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import history from './history'
import 'typeface-roboto'
import 'typeface-nunito-sans'

import { PrivateRoute, PublicRoute } from './components'

import {
  LoginPage,
  RegisterPage,
  Home,
  SingleDocumentPage,
  NewDocumentPage,
  DraftsPage,
  CompanyPage,
  ConfirmMessagesPages,
  UnconfirmedMessagesPage,
  SentMessagesPage
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
          <PrivateRoute path='/sent-messages' component={SentMessagesPage} />
          <PrivateRoute path='/drafts' component={DraftsPage} />

          <PublicRoute path='/login' component={LoginPage} />
          <PublicRoute path='/register' component={RegisterPage} />

          <Route path='*' render={() => <div>404</div>} />
        </Switch>
      </Router>
    </Fragment>
  )
}

export default App
