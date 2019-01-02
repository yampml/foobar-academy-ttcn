import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    Grid, Row, Col, ButtonToolbar,
    Modal, Form, FormGroup, ControlLabel, FormControl, Button
} from 'react-bootstrap';
import axios from 'axios';
import Datetime from 'react-datetime';
import $ from 'jquery';
import ReactLoading from 'react-loading';

import Select from 'react-select';
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

class AddUserModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseData: {
                // id: "",
                email: "",
                hoTen: "",
                diaChi: "",
                ngaySinh: "",
                phone: "",
                password: "",
                singleSelect: null,
            },
            isLoading: false,
        }
    }

    resetData = () => {
        this.setState({
            courseData: {
                email: "",
                hoTen: "",
                diaChi: "",
                phone: "",
                ngaySinh: "",
                password: "",
                singleSelect: null,
            }
        })
    }

    handleAddBtnClick = () => {
        let newUserData = {
            email: this.state.email,
            name: this.state.hoTen,
            phone: this.state.phone,
            address: this.state.diaChi,
            dob: this.state.ngaySinh,
            role: this.state.singleSelect.value,
            phone: this.state.phone,
            password: this.state.password,
            password_confirmation: this.state.password
        }; //cc api cui bap
        // console.log(newCourseData);
        const auth_token = localStorage.getItem('token');

        this.setState({ isLoading: true })
        axios.post('https://api-english-academy.herokuapp.com/users/', newUserData, {
            headers: {
                Authorization: 'Bearer ' + auth_token
            }
        }).then(response => {
            console.log(response.data);

        }).catch(err => {
            // alert("Co loi xay ra roi !");
            console.log(err);
        });
        this.setState({ isLoading: false });
        this.props.handleClose();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    componenDidMount() {
        //get data from this.props.courseId
    }

    render() {

        const selectOptions = [
            { value: 'student', label: 'Học sinh' },
            { value: 'teacher', label: 'Giáo viên' },
            { value: 'admin', label: 'Quản lý' },
        ];


        // name: this.state.hoTen,
        // phone: this.state.phone,
        // // address: this.state.diaChi,
        // // ngaySinh: this.state.ngaySinh,
        // role: this.state.singleSelect.value,
        // phone: this.state.phone,
        // password: this.state.password
        return (
            <Modal show={ this.props.isShow } onHide={ this.props.handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo tài khoản mới { this.props.userId }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup>
                            <ControlLabel className="col-md-3" >
                                Họ tên
                            </ControlLabel>
                            <Col md={ 9 }>
                                <FormControl
                                    type="text"
                                    value={ this.state.hoTen }
                                    onChange={ this.handleChange('hoTen') }
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="col-md-3">
                                Email:
                                    </ControlLabel>
                            <Col md={ 9 }>
                                <FormControl
                                    type="text"
                                    value={ this.state.email }
                                    onChange={ this.handleChange('email') }
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="col-md-3">
                                Địa chỉ
                                </ControlLabel>
                            <Col md={ 9 }>
                                <FormControl
                                    type="text"
                                    value={ this.state.diaChi }
                                    onChange={ this.handleChange('diaChi') }
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel className="col-md-3">
                                Số điện thoại
                                </ControlLabel>
                            <Col md={ 9 }>
                                <FormControl
                                    type="text"
                                    value={ this.state.phone }
                                    onChange={ this.handleChange('phone') }
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="col-md-3">
                                Ngày sinh
                                </ControlLabel>
                            <Col md={ 9 }>
                                <FormControl
                                    type="text"
                                    value={ this.state.ngaySinh }
                                    onChange={ this.handleChange('ngaySinh') }
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel className="col-md-3">Loại tài khoản</ControlLabel>
                            <Col md={ 9 }>
                                <Select
                                    placeholder="Single Select"
                                    name="singleSelect"
                                    value={ this.state.singleSelect }
                                    options={ selectOptions }
                                    onChange={ (value) => this.setState({ singleSelect: value }) }
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel className="col-md-3">
                                Mật khẩu
                                </ControlLabel>
                            <Col md={ 9 }>
                                <FormControl
                                    type="text"
                                    value={ this.state.password }
                                    onChange={ this.handleChange('password') }
                                />
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ this.handleAddBtnClick }>Thêm</Button>
                    <Button onClick={ this.resetData }>Làm lại</Button>

                    <Button onClick={ this.props.handleClose }>Đóng</Button>
                </Modal.Footer>
            </Modal>

        )
    }

}

export default AddUserModal;