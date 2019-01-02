import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    Grid, Row, Col, ButtonToolbar,
    Modal, Form, FormGroup, ControlLabel, FormControl, Button
} from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import ReactLoading from 'react-loading';
import Datetime from 'react-datetime';
import Select from 'react-select';
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

class AddInvoiceModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            admin_name: "",
            target_name: "",
            amount: "",
            taibu: "",
            date: "",
            name: "",
            naiyou: "",

            isLoading: false,
        }
    }

    resetData = () => {
        this.setState({
            id: "",
            admin_name: "",
            target_name: "",
            amount: "",
            taibu: "",
            date: "",
        })
    }

    handleAddBtnClick = () => {
        let newInvoiceData = {
            admin_name: this.state.admin_name,
            target_name: this.state.target_name,
            amount: this.state.amount,
            taibu: this.state.taibu,
            // date: this.state.date,
            name: this.state.name,
            naiyou: this.state.naiyou,
        };
        // console.log(newCourseData);
        const auth_token = localStorage.getItem('token');

        this.setState({ isLoading: true })
        axios.post('https://api-english-academy.herokuapp.com/invoices/', newInvoiceData, {
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
        // this.props.motherReFetchData();
        this.props.handleClose();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    componenDidMount() {
        //get data from this.props.courseId
    }

    render() {


        const selectOptions = [
            { value: 'incoming', label: 'Thu' },
            { value: 'outgoing', label: 'Chi' }
        ];

        return (
            <Modal show={ this.props.isShow } onHide={ this.props.handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo hóa đơn mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {

                        // id: this.state.id,
                        // admin_name: this.state.admin_name,
                        // target_name: this.state.target_name,
                        // amount: this.state.amount,
                        // taibu: this.state.taibu,
                        // date: this.state.date,
                        // name: this.state.name,
                        // naiyou: this.state.naiyou,


                        this.state.isLoading ? (<ReactLoading style={ { width: '100px', margin: 'auto' } } type={ "spinningBubbles" } color={ "#ADFF2F" } height={ '10' } width={ '10' } />) : (
                            <Form horizontal>
                                <FormGroup>
                                    <ControlLabel className="col-md-3" >
                                        Tên hóa đơn
                                    </ControlLabel>
                                    <Col md={ 9 }>
                                        <FormControl
                                            type="text"
                                            value={ this.state.name }
                                            onChange={ this.handleChange('name') }
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel className="col-md-3">
                                        Người tạo hóa đơn
                                    </ControlLabel>
                                    <Col md={ 9 }>
                                        <FormControl
                                            type="text"
                                            value={ this.state.admin_name }
                                            onChange={ this.handleChange('admin_name') }
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel className="col-md-3">
                                        Người nhận hóa đơn
                                </ControlLabel>
                                    <Col md={ 9 }>
                                        <FormControl
                                            type="text"
                                            value={ this.state.target_name }
                                            onChange={ this.handleChange('target_name') }
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel className="col-md-3">
                                        Số tiền
                                    </ControlLabel>
                                    <Col md={ 9 }>
                                        <FormControl
                                            type="number"
                                            value={ this.state.amount }
                                            onChange={ this.handleChange('amount') }
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel className="col-md-3">Loại tài khoản</ControlLabel>
                                    <Col md={ 9 }>
                                        <Select
                                            placeholder="Thu/Chi"
                                            name="singleSelect"
                                            value={ this.state.taibu }
                                            options={ selectOptions }
                                            onChange={ (value) => this.setState({ taibu: value }) }
                                        />
                                    </Col>
                                </FormGroup>
                                {/* <FormGroup>
                                    <ControlLabel className="col-md-3">Ngày</ControlLabel>
                                    <Col md={ 9 }>
                                        <Datetime
                                            timeFormat={ false }
                                            inputProps={ { placeholder: "Date Picker Here" } }
                                            // defaultValue={ new Date() }
                                            value={ this.state.date }
                                            onChange={ this.handleChange('date') }
                                        />
                                    </Col>
                                </FormGroup> */}
                                <FormGroup>
                                    <ControlLabel className="col-md-3">
                                        Nội dung
                                    </ControlLabel>
                                    <Col md={ 9 }>
                                        <FormControl
                                            type="text"
                                            value={ this.state.naiyou }
                                            onChange={ this.handleChange('naiyou') }
                                        />
                                    </Col>
                                </FormGroup>
                                {/* <FormGroup>
                            <ControlLabel className="col-md-3">
                                Danh sách lớp
                            </ControlLabel>
                            <Col md={ 9 }>
                                {
                                    this.state.courseData.danhSachLopHoc.map((lop, index) => {
                                        if (index !== this.state.courseData.danhSachLopHoc.length)
                                            return (<Link to="/#" key={index}>{ lop.tenLop }, </Link>)
                                        else return (<Link to="/#" key={index}>{ lop.tenLop }</Link>)
                                    })
                                }
                            </Col>
                        </FormGroup> */}
                            </Form>) }
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

export default AddInvoiceModal;