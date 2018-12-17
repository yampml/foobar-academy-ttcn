import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

import indexRoutes from '../routes/index.jsx';
import registerServiceWorker from './../registerServiceWorker';

// import '../assets/css/bootstrap.min.css';
// import '../assets/sass/light-bootstrap-dashboard.css';
// import '../assets/css/demo.css';
// import '../assets/css/pe-icon-7-stroke.css';

// import '../../assets/stylesheets/bootstrap.min.css';
// import '../../assets/stylesheets/light-bootstrap-dashboard.css';
// import '../../assets/stylesheets/demo.css';
// import '../../assets/stylesheets/pe-icon-7-stroke.css';


import App from 'containers/App/App.jsx';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import authReducer from '../reduxStore/reducers/auth';
import homepageReducer from '../reduxStore/reducers/homepage';
import coursesClassReducer from '../reduxStore/reducers/courseClass';
import usersReducer from '../reduxStore/reducers/userList';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    homepage: homepageReducer,
    coursesClass: coursesClassReducer,
    usersList: usersReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
