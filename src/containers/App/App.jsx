import React, {Component} from 'react';
import {
    Switch,
    Route,
    Redirect,
    withRouter
} from 'react-router-dom';

// dinamically create app routes
import appRoutes from 'routes/app.jsx';

import { connect } from 'react-redux';
import * as actions from '../../reduxStore/actions/actionsIndex.js';
// import Pages from 'containers/Pages/Pages.jsx';

import asyncComponent from '../HOC/asyncComponent';

import { isAllowed } from '../../reduxStore/utility';
const AsyncPages = asyncComponent(() => {
    return import('containers/Pages/Pages.jsx');
})

const AsyncHomePage = asyncComponent(() => {
    return import('../../components/Homepage/Homepage');
})

const AsyncDash = asyncComponent(() => {
    return import('containers/Dash/Dash.jsx');
})

class App extends Component{
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.props.checkSignIn();
      this.props.fetchUsers();
    }

    switchRoutes = () => {
        const isLogin = this.props.isAuthenticated;
        console.log(this.props.location.pathname)
        let route = (
            <Switch>
                <Route path="/homepage" component={AsyncHomePage} />
                <Route path="/pages/login-page" exact component={AsyncPages} />
                <Route path="/pages/register-page" exact component={AsyncPages} />

                <Redirect exact from="/" to="/homepage" />
            </Switch>
        )
        if(isLogin) {
            return (
                <Switch>
                    <Route path="/homepage" component={AsyncHomePage} />
                    <Route path="/admin" component={AsyncDash} />
                    {/* {isAllowed(this.props.currentUser, "admin") ? <Route path="/admin" component={AsyncDash} /> : null} */}
                    
                    <Redirect from="/" to="/admin" />
                </Switch>
            )
        }
        return route;
    }

    render(){
        return this.switchRoutes();
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        currentUser: state.auth.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkSignIn: () => dispatch(actions.authCheckState()),
        fetchUsers: () => dispatch(actions.fetchUserFromDB())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
