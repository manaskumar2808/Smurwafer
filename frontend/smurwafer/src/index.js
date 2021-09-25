import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import Thunk from 'redux-thunk';

import authReducer from './store/reducers/auth-reducer';
import storyReducer from './store/reducers/story-reducer';
import galleryReducer from './store/reducers/gallery-reducer';
import userReducer from './store/reducers/user-reducer';
import profileReducer from './store/reducers/profile-reducer';
import dashboardReducer from './store/reducers/dashboard-reducer';
import bookmarkReducer from './store/reducers/bookmark-reducer';
import reportReducer from './store/reducers/report-reducer';
import settingReducer from './store/reducers/setting-reducer';

const rootReducer = combineReducers({
    ath: authReducer,
    sty: storyReducer,
    gly: galleryReducer,
    usr: userReducer,
    prf: profileReducer,
    dsh: dashboardReducer,
    bmk: bookmarkReducer,
    rpt: reportReducer,
    stg: settingReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(Thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
