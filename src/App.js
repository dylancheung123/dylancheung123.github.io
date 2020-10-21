import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { withHeader } from './components/withHeader'

import Home from './views/Home'
import Projects from './views/Projects'
import Photography from './views/Photography'

import './styles/RootStyles.css'

const App = (
  <Router className="router">
    <Switch>
      <Route path="/" component={withHeader(Home)} exact={true}/>
      <Route path="/projects" component={withHeader(Projects)}/>
      <Route path="/photography" component={withHeader(Photography)}/>
    </Switch>   
  </Router>
)

ReactDOM.render(App, document.getElementById('root'))
