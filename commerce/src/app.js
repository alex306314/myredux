
import './app.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute} from 'react-router'
import { createStore, combineReducers } from 'redux';
import { Provider }  from 'react-redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import { appReducer } from './reducers';

import history from './utils/history';
import {
  MainView,
  AppView,
  CategoryView,
} from './views'
import '../../common/utils/uuid'

const reducer = combineReducers(
  Object.assign({}, {appReducer},  {routing: routeReducer})
)
let store = createStore(reducer);

syncReduxAndRouter(history, store)
g.store = store;
//<Route path="success" component={SuccessView}/>
ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppView}>
        <IndexRoute component={MainView} />
        <Route path="category" component={CategoryView} />
      </Route>
    </Router>
  </Provider>
), document.getElementById("container"));