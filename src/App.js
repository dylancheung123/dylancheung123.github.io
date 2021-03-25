import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'

import Home from './components/Home/Home'
import Projects from './components/Projects/Projects'
import Photography from './components/Photography/Photography'

import './styles.css'

const withApp = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <div className='app'>
          <Header/>
          <WrappedComponent/>
          <Footer/>
        </div>
      )
    }
  }
}

const regularPage = WrappedComponent => withApp(WrappedComponent)

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
