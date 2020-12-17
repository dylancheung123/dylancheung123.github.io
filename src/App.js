import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import { withHeader } from './components/Header/withHeader'
import { withFooter } from './components/Footer/withFooter'

import Home from './components/Home/Home'
import Projects from './components/Projects/Projects'
import Photography from './components/Photography/Photography'

import './styles.css'

const withApp = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <div className='with-app'><WrappedComponent/></div>
      )
    }
  }
}

const regularPage = WrappedComponent => withApp(withHeader(withFooter(WrappedComponent)))

const App = (
  <Router className="router">
    <Switch>
      <Route path="/" component={regularPage(Home)} exact={true}/>
      <Route path="/projects" component={regularPage(Projects)}/>
      <Route path="/photography" component={regularPage(Photography)}/>
    </Switch>   
  </Router>
)

ReactDOM.render(App, document.getElementById('root'))
