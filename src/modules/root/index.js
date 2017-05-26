/* @flow */
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from '../home'
import './root.less'

type LayoutComponentProps = {
  component: any
}

const Layout = ({ component: Component, ...rest }: LayoutComponentProps) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div>
          <Component {...matchProps} />
        </div>
      )}
    />
  )
}

export default function Root ({ store }: { store: any }) {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Layout exact path='/' component={Home} />
        </Switch>
      </Router>
    </Provider>
  )
}
