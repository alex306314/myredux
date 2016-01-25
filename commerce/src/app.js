import './app.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute} from 'react-router'
import { createStore, combineReducers } from 'redux';
import { Provider }  from 'react-redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import { appReducer } from './reducers';

import './utils/setView'

import history from './utils/history';
import {
  MainView,
  AppView,
  NewsView,
  ExpertView,
  DataView,
  ConferenceView,
  FinanceView,
  ContentView
} from './views'

import './utils'
import '../../common/utils/uuid'

const reducer = combineReducers(
  Object.assign({}, {appReducer},  {routing: routeReducer})
)
let store = createStore(reducer);

syncReduxAndRouter(history, store)
//g.store = store;
//g.state = store.getState().appReducer

//<Route path="success" component={SuccessView}/>
$(document).on('viewReady', ()=>{
 
  ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={AppView}>
          <IndexRoute component={MainView} />
          <Route path="/news" component={NewsView} />
          <Route path="/expert" component={ExpertView} />
          <Route path="/data" component={DataView} />
          <Route path="/conference" component={ConferenceView} />
          <Route path="/finance" component={FinanceView} />
          <Route path="/detail/:id" component={ContentView} />
        </Route>
      </Router>
    </Provider>
  ), document.getElementById("container"));

})
