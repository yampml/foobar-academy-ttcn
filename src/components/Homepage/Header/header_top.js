import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../reduxStore/actions/actionsIndex';

import { isAllowed } from '../../../reduxStore/utility';
class header_top extends React.Component {
  render() {
    let loginlogout = (
      < div >
        <Link to="#" className="text-uppercase">
          FOOBAR
        </Link>
        <Link to="/pages/login-page" className="text-uppercase">
          Login
        </Link>
      </div >
    )
    console.log(this.props.currentUser)
    if(this.props.currentUser !== null) loginlogout = (
      < div >
      <Link to="#" className="text-uppercase">
        {this.props.currentUser.email}
      </Link>
      { isAllowed(this.props.currentUser, "admin") ? 
        <Link to="/admin" className="text-uppercase">
          ADMINCP
        </Link> : null 
      }
      <Link to="#" className="text-uppercase" onClick={this.props.logout}>
        Logout
      </Link>
    </div >
    )

    return (
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-sm-6 col-4 header-top-left">
              <Link to="#">
                <span className="lnr lnr-phone" />
                <span className="text">
                  <span className="text">+84 77 858 2046</span>
                </span>
              </Link>
              <Link to="#">
                <span className="lnr lnr-envelope" />
                <span className="text">
                  <span className="text">AN HIU XINH</span>
                </span>
              </Link>
            </div>
            <div className="col-lg-6 col-sm-6 col-8 header-top-right">
              {loginlogout}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(header_top);
