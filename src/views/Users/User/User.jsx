import React, { Component } from 'react';
import $ from 'jquery';

import {
    Grid, Row, Col,
    Table,
    OverlayTrigger,
    Tooltip, Modal, FormGroup, FormControl, Media, Checkbox, ControlLabel, Form, Glyphicon
} from 'react-bootstrap';
import axios from 'axios';
// react component that creates a switch button that changes from on to off mode
import Switch from 'react-bootstrap-switch';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

import { connect } from 'react-redux';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            formData: {
                userEmail: "",
                password: ""
              }
        };
    }

    handleInputNameChange = (event) => {
        let newState = { ...this.state };
        newState.formData = { ...this.state.formData };
        newState.formData.userEmail = event.target.value;
        this.setState(newState);
    }

    handleInputPasswordChange = (event) => {
        let newState = { ...this.state };
        newState.formData = { ...this.state.formData };
        newState.formData.password = event.target.value;
        this.setState(newState);
    }

    reloadData = () => {
        let userEmail = this.props.currentUser.email
        let newState = { ...this.state };
        newState.formData = { ...this.state.formData };
        newState.formData.userEmail = userEmail;
        newState.formData.password = "";
        this.setState(newState);
    }

    handleCancelBtnClick = () => {
        this.reloadData();
        this.setState({ isEdit: false});
    }

    componentDidMount() {
        this.reloadData();
    }

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={ 1 }>
                        </Col>
                        <Col md={ 11 }>
                            <Card
                                title="Profile"
                                tableFullWidth
                                content={
                                    <div>
                                        <Form horizontal>
                                            <FormGroup controlId="formHorizontalEmail" >
                                                <Col componentClass={ ControlLabel } sm={ 1 }>
                                                    Email
                                                </Col>
                                                <Col sm={ 10 }>
                                                    <FormControl disabled={!this.state.isEdit} type="email" placeholder="Email" value={this.state.formData.userEmail} onChange={this.handleInputNameChange} />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup controlId="formHorizontalPassword">
                                                <Col componentClass={ ControlLabel } sm={ 1 }>
                                                    Password
                                                </Col>
                                                <Col sm={ 10 }>
                                                    <FormControl disabled={!this.state.isEdit} type="password" placeholder="Type here to change password" value={this.state.formData.password} onChange={this.handleInputPasswordChange}/>
                                                </Col>
                                            </FormGroup>

                                            <FormGroup>
                                                <Col smOffset={ 1 } sm={ 1 }>
                                                    <Button onClick={ () => {this.setState({ isEdit: true})} }>Edit Profile</Button>
                                                </Col>
                                                {
                                                    this.state.isEdit ?
                                                        <div>
                                                            <Col sm={1}>
                                                                <Button onClick={this.handleCancelBtnClick}>Cancel</Button>
                                                            </Col>
                                                            <Col sm={1}>
                                                                <Button type="submit">Save</Button>
                                                            </Col>
                                                        </div> : null
                                                }
                                            </FormGroup>
                                        </Form>;
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
