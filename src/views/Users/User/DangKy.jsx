import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Form, FormGroup, FormControl, ControlLabel, Breadcrumb
} from 'react-bootstrap';
import Select from 'react-select';
import Datetime from 'react-datetime';
import Card from 'components/Card/Card.jsx';

import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import { Link } from 'react-router-dom';
class DangKy extends Component {
    constructor(props) {
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {
            // Register
            email: "",
            hoTen: "",
            diaChi: "",
            ngaySinh: "",
            password: "",
            cfpassword: "",
            emailError: null,
            passwordError: null,
            cfpasswordError: null,
            /// Login
            emailLogin: "",
            emailErrorLogin: null,
            passwordLogin: "",
            passwordErrorLogin: null,
            // Type
            type_text: "",
            type_textError: null,
            type_email: "",
            type_emailError: null,
            type_number: "",
            type_numberError: null,
            type_url: "",
            type_urlError: null,
            type_source: "",
            type_sourceError: null,
            type_destination: "",
            type_destinationError: null,
            // Select
            singleSelect: null,
        }
    }
    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(event.target.value) === false ? this.setState({ emailError: (<small className="text-danger">Email is required and format should be <i>john@doe.com</i>.</small>) }) : this.setState({ emailError: null });
    }
    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
        event.target.value.length < 6 ? this.setState({ passwordError: (<small className="text-danger">You must enter a password of at least 6 characters.</small>) }) : this.setState({ passwordError: null });
    }
    handleCfPasswordChange(event) {
        this.setState({
            cfpassword: event.target.value
        });
        event.target.value !== this.state.password ? this.setState({ cfpasswordError: (<small className="text-danger">Passwords do not match.</small>) }) : this.setState({ cfpasswordError: null });
    }
    handleRegisterSubmit() {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(this.state.email) === false ? this.setState({ emailError: (<small className="text-danger">Email is required and format should be <i>john@doe.com</i>.</small>) }) : this.setState({ emailError: null });
        this.state.password.length < 6 ? this.setState({ passwordError: (<small className="text-danger">You must enter a password of at least 6 characters.</small>) }) : this.setState({ passwordError: null });
        this.state.cfpassword !== this.state.password ? this.setState({ cfpasswordError: (<small className="text-danger">Passwords do not match.</small>) }) : this.setState({ cfpasswordError: null });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }

    render() {

        const selectOptions = [
            { value: 'student', label: 'Học sinh' },
            { value: 'teacher', label: 'Giáo viên' },
            { value: 'admin', label: 'Quản lý' },
        ];


        return (
            <div className="main-content">
                <Grid fluid>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/admin/manageUser">Quản lý tài khoản</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Tạo tài khoản mới
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>
                        <Col mdOffset={ 3 } md={ 6 }>
                            <form>
                                <Card
                                    title="Register Form"
                                    content={
                                        <div style={ { overflow: "auto" } }>
                                            <FormGroup>
                                                <ControlLabel>Email: <span className="star">*</span></ControlLabel>
                                                <FormControl type="text" name="email" onChange={ (event) => this.handleEmailChange(event) } />
                                                { this.state.emailError }
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Họ tên: <span className="star">*</span></ControlLabel>
                                                <FormControl type="text" name="hoten" onChange={ this.handleChange('hoTen') } />
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Ngày sinh <span className="star">*</span></ControlLabel>
                                                <Datetime
                                                    timeFormat={ false }
                                                    inputProps={ { placeholder: "Date Picker Here" } }
                                                    defaultValue={ new Date() }
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Địa chỉ: <span className="star">*</span></ControlLabel>
                                                <FormControl type="text" name="hoten" onChange={ this.handleChange('diaChi') } />
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Mật khẩu: <span className="star">*</span></ControlLabel>
                                                <FormControl type="password" name="password" onChange={ (event) => this.handlePasswordChange(event) } />
                                                { this.state.passwordError }
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Loại tài khoản<span className="star">*</span></ControlLabel>
                                                <Select
                                                    placeholder="Single Select"
                                                    name="singleSelect"
                                                    value={ this.state.singleSelect }
                                                    options={ selectOptions }
                                                    onChange={ (value) => this.setState({ singleSelect: value }) }
                                                />
                                            </FormGroup>
                                            <div className="category">
                                                <span className="star">*</span> Required fields
                                            </div>
                                            <Button bsStyle="info" fill pullRight onClick={ this.handleRegisterSubmit.bind(this) }>
                                                Register
                                            </Button>
                                        </div>
                                    }
                                />
                            </form>
                        </Col>

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default DangKy;
