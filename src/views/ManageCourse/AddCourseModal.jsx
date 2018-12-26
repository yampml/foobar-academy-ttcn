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

require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

class CourseDetailModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseData: {
                // id: "",
                ten: "",
                hocPhi: "",
                thoiGianHoc: "",
            },
            isLoading: false,
        }
    }

    resetData = () => {
        this.setState({
            courseData: {
                ten: "",
                hocPhi: "",
                thoiGianHoc: "",
            }
        })
    }

    handleAddBtnClick = () => {
        let newCourseData = {
            name: this.state.courseData.ten,
            fee: this.state.courseData.hocPhi,
            duration: this.state.courseData.thoiGianHoc
        }; //cc api cui bap
        // console.log(newCourseData);
        this.setState({ isLoading: true })
        axios.post('https://api-english-academy.herokuapp.com/courses/', newCourseData).then(response => {
            console.log(response.data);

        }).catch(err => {
            // alert("Co loi xay ra roi !");
            console.log(err);
        });
        this.setState({ isLoading: false });
        this.props.handleClose();
    }

    handleInputNameChange = (event) => {
        let newState = { ...this.state };
        newState.courseData = { ...this.state.courseData };
        newState.courseData.ten = event.target.value;
        this.setState(newState);
    }

    handleInputHocPhiChange = (event) => {
        let newState = { ...this.state };
        newState.courseData = { ...this.state.courseData };
        newState.courseData.hocPhi = event.target.value;
        this.setState(newState);
    }

    handleInputThoiGianHocChange = (event) => {
        let newState = { ...this.state };
        newState.courseData = { ...this.state.courseData };
        newState.courseData.thoiGianHoc = event.target.value;
        this.setState(newState);
    }

    componenDidMount() {
        //get data from this.props.courseId
    }

    render() {
        return (
            <Modal show={ this.props.isShow } onHide={ this.props.handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Khóa học mới { this.props.courseId }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.state.isLoading ? (<ReactLoading style={ { width: '100px', margin: 'auto' } } type={ "spinningBubbles" } color={ "#ADFF2F" } height={ '10' } width={ '10' } />) : (
                            <Form horizontal>
                                <FormGroup>
                                    <ControlLabel className="col-md-3" >
                                        Tên khóa học
                            </ControlLabel>
                                    <Col md={ 9 }>
                                        <FormControl
                                            type="text"
                                            value={ this.state.courseData.ten }
                                            onChange={ this.handleInputNameChange }
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel className="col-md-3">
                                        Thời gian học
                            </ControlLabel>
                                    <Col md={ 9 }>
                                        <FormControl
                                            type="text"
                                            value={ this.state.courseData.thoiGianHoc }
                                            onChange={ this.handleInputThoiGianHocChange }
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel className="col-md-3">
                                        Học phí
                            </ControlLabel>
                                    <Col md={ 9 }>
                                        <FormControl
                                            type="text"
                                            value={ this.state.courseData.hocPhi }
                                            onChange={ this.handleInputHocPhiChange }
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

export default CourseDetailModal;