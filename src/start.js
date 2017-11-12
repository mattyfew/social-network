import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import ChatRoom from './ChatRoom'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { Router, Route, Link, IndexRoute, IndexRedirect, hashHistory, browserHistory } from 'react-router';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(reduxPromise));

const router = (
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ App }>
                <IndexRoute component={ ChatRoom } />
            </Route>
        </Router>
    </Provider>
)

ReactDOM.render(
    router,
    document.querySelector('main')
);
