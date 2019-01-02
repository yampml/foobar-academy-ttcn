import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    Grid, Row, Col, ButtonToolbar,
    Modal, Form, FormGroup, ControlLabel, FormControl, Button
} from 'react-bootstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Select from 'react-select';
import Datetime from 'react-datetime';
import $ from 'jquery';

require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

class UserDetailModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            hoTen: "",
            diaChi: "",
            ngaySinh: "",
            password: "",
            singleSelect: null,
            phone: "",

            isEdit: false,
            isLoading: true
        }
    }


    fetchData = () => {
        const auth_token = localStorage.getItem('token');
        let url = "https://api-english-academy.herokuapp.com/users/" + this.props.userId;
        axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + auth_token
            }
        }).then(response => {
            console.log(response.data);

            // console.log(fetchedCourseData)
            this.setState({
                id: response.data[0].id,
                hoTen: response.data[0].name,
                email: response.data[0].email,
                diaChi: response.data[0].account.address,
                ngaySinh: response.data[0].account.dob,
                phone: response.data[0].phone,
                singleSelect: response.data[0].role,
                isLoading: false,
                isEdit: false
            })
        }).catch(err => {

        });
    }

    onUpdate = () => {
        const auth_token = localStorage.getItem('token');

        let url = "https://api-english-academy.herokuapp.com/users/" + this.props.userId;
        console.log(this.state.singleSelect.value);
        let newUserData = {
            name: this.state.hoTen,
            email: this.state.email,
            address: this.state.diaChi,
            dob: this.state.ngaySinh,
            role: this.state.singleSelect.value,
            phone: this.state.phone,
        };
        this.setState({ isLoading: true });

        axios.put(url, newUserData, {
            headers: {
                Authorization: 'Bearer ' + auth_token
            }
        }).then(response => {
            console.log(response.data);
        }).catch(err => {
            console.log(err.message);
        })
        this.fetchData();
        this.setState({ isLoading: false, isEdit: false })
    }

    handleCancelBtnClick = () => {
        this.setState({ isEdit: false });
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }


    componentDidMount() {
        //get data from this.props.courseId
        this.fetchData();

    }

    render() {


        const selectOptions = [
            { value: 'student', label: 'Học sinh' },
            { value: 'teacher', label: 'Giáo viên' },
            { value: 'admin', label: 'Quản lý' },
        ];

        return (
            <Modal show={ this.props.isShow } onHide={ this.props.handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Tài khoản { this.state.email }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.state.isLoading ? (<ReactLoading style={ { width: '100px', margin: 'auto' } } type={ "spinningBubbles" } color={ "#ADFF2F" } height={ '10' } width={ '10' } />) : (
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
                                            disabled={ !this.state.isEdit }
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
                                            disabled={ !this.state.isEdit }
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
                                            disabled={ !this.state.isEdit }
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
                                            disabled={ !this.state.isEdit }
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
                                            disabled={ !this.state.isEdit }
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel className="col-md-3">Loại tài khoản</ControlLabel>
                                    <Col md={ 9 }>
                                        <Select
                                            disabled={ !this.state.isEdit }
                                            placeholder="Single Select"
                                            name="singleSelect"
                                            value={ this.state.singleSelect }
                                            options={ selectOptions }
                                            onChange={ (value) => this.setState({ singleSelect: value }) }
                                        />
                                    </Col>
                                </FormGroup>

                            </Form>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.state.isEdit ?
                            [
                                //tam
                                <Button key="1" onClick={ this.onUpdate }><i className="glyphicon glyphicon-edit"></i> Lưu</Button>,
                                <Button key="2" onClick={ this.fetchData }><i className="glyphicon glyphicon-edit"></i> Hủy bỏ</Button>
                            ]
                            :
                            <Button onClick={ () => this.setState({ isEdit: true }) }><i className="glyphicon glyphicon-edit"></i> Chỉnh sửa</Button>
                    }
                    <Button onClick={ this.props.handleClose }>Đóng</Button>
                </Modal.Footer>
            </Modal>

        )
    }

}

export default UserDetailModal;