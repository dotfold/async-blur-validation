/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import Root from './modules/root'

const defaultReducer = (state: any = {}, action: any) => {
  return state
}
const middleware = []
const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose
const reducers = {
  defaultReducer,
  form: formReducer
}
const store = createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(...middleware))
)

const rootEl = document.getElementById('root')
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    rootEl
  )

render(Root)
if (module.hot) {
  ;(module.hot: any).accept('./modules/root', () => {
    const NextApp = require('./modules/root').default
    render(NextApp)
  })
}
