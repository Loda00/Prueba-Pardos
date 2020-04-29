import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import Details from './Details'
import NotFound from './NotFound'

const Root = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (
        <Redirect to="/home" />
      )}
    />
    <Route path="/home" component={Home} />
    <Route path="/details/:id" component={Details} />
    <Route component={NotFound} />
  </Switch>
)


export default Root