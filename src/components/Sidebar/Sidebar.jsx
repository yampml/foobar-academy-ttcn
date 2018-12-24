import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css';

import HeaderLinks from 'components/Header/HeaderLinks.jsx';

// backgroundImage for Sidebar
import image from '../../assets/img/full-screen-image-2.jpg';
// image for avatar in Sidebar
import avatar from 'assets/img/Communism.jpg';
// logo for sidebar
import logo from "logo.svg";

import dashRoutes from 'routes/dash.jsx';

import { connect } from 'react-redux';

const bgImage = {backgroundImage: "url("+image+")"};

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            openAvatar: false,
            openComponents: (this.activeRoute("/components") !== '' ? true:false),
            openForms: (this.activeRoute("/forms") !== '' ? true:false),
            openTables: (this.activeRoute("/tables") !== '' ? true:false),
            openMaps: (this.activeRoute("/maps") !== '' ? true:false),
            openPages: (this.activeRoute("/pages") !== '' ? true:false),
            isWindows: (navigator.platform.indexOf('Win') > -1 ? true : false),
            width: window.innerWidth
        }
    }
    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }
    render(){
        return (

            <div className="sidebar" data-color="black" data-image={image}>
                <div className="sidebar-background" style={bgImage}></div>
                <div className="logo">
                	<a href="http://www.google.com" className="simple-text logo-mini">
                        <div className="logo-img">
                            <img src={logo} alt="react-logo" />
                        </div>
                	</a>
                	<a href="http://google.com" className="simple-text logo-normal">
                		Creative Xinh
                	</a>
                </div>
                <div className="sidebar-wrapper" ref="sidebarWrapper">
                    <div className="user">
                        <div className="photo">
                            <img src={avatar} alt="Avatar"/>
                        </div>
                        <div className="info">
                            <a onClick={ ()=> this.setState({ openAvatar: !this.state.openAvatar })}>
                                <span>
                                    {this.props.currentUser.email}
                                </span>
                            </a>
                        </div>
                    </div>

                    <ul className="nav">
                        {/* If we are on responsive, we want both links from navbar and sidebar
                            to appear in sidebar, so we render here HeaderLinks */}
                        { this.state.width <= 992 ? (<HeaderLinks />):null }
                        {/*
                            here we render the links in the sidebar
                            if the link is simple, we make a simple link, if not,
                            we have to create a collapsible group,
                            with the speciffic parent button and with it's children which are the links
                        */}
                        {
                            dashRoutes.map((prop,key) => {
                                var st = {};
                                st[prop["state"]] = !this.state[prop.state];
                                if(prop.collapse){
                                    return (
                                        <li className={this.activeRoute(prop.path)} key={key}>
                                            <a onClick={ ()=> this.setState(st)}>
                                                <i className={prop.icon}></i>
                                                <p>{prop.name}
                                                   <b className={this.state[prop.state] ? "caret rotate-180":"caret"}></b>
                                                </p>
                                            </a>
                                            <Collapse in={this.state[prop.state]}>
                                                <ul className="nav">
                                                    {
                                                        prop.views.map((prop,key) => {
                                                            return (
                                                                <li className={this.activeRoute(prop.path)} key={key}>
                                                                    <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                                                        <span className="sidebar-mini">{prop.mini}</span>
                                                                        <span className="sidebar-normal">{prop.name}</span>
                                                                    </NavLink>
                                                                </li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </Collapse>
                                        </li>
                                    )
                                } else {
                                    if(prop.redirect){
                                        return null;
                                    }
                                    else{
                                        return (
                                            <li className={this.activeRoute(prop.path)} key={key}>
                                                <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                                    <i className={prop.icon}></i>
                                                    <p>{prop.name}</p>
                                                </NavLink>
                                            </li>
                                        );
                                    }
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  }
}

export default connect(mapStateToProps, null)(Sidebar);
