import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Web from './Web'

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" component={Web} />
    </Switch>
  </Router>
)

export default Root
