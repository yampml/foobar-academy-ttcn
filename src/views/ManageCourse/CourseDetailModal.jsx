import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DualListBox from 'react-dual-listbox';
import {
    Grid, Row, Col, ButtonToolbar,
    Modal, Form, FormGroup, ControlLabel, FormControl, Button
} from 'react-bootstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Datetime from 'react-datetime';
import $ from 'jquery';

import 'react-dual-listbox/lib/react-dual-listbox.css';

require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

class CourseDetailModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseData: {
                id: null,
                ten: "",
                hocPhi: null,
                thoiGianHoc: null,
                danhSachLopHoc: []
            },
            isEdit: false,
            isLoading: true,



            options: [
            ],

            selected: [],
        }
    }


    fetchData = () => {

        let url = "https://api-english-academy.herokuapp.com/courses/" + this.props.courseId;

        axios.get("https://api-english-academy.herokuapp.com/class-rooms").then(response2 => {
            response2.data.map((cl, index) => {
                let dataa = response2.data.slice();
                dataa = dataa.filter(o => o.course_id == 0);
                let newOptions = dataa.map((cl, index) => {
                    return {
                        value: cl.id.toString(),
                        label: cl.name
                    }
                })

                this.setState({
                    options: newOptions,
                })
            })

        })

        axios.get(url).then(response => {
            console.log(response.data);
            let fetchedCourseData = {
                id: response.data.courseData[0].id,
                ten: response.data.courseData[0].name,
                hocPhi: response.data.courseData[0].fee,
                thoiGianHoc: response.data.courseData[0].duration,
                danhSachLopHoc: response.data.courseClass
            }


            let newOptions = this.state.options.slice();
            console.log(newOptions)
            response.data.courseClass.map((cl, index) => {
                newOptions.push({
                    value: cl.id.toString(),
                    label: cl.name
                })
                return null;
            })

            let newSelected = response.data.courseClass.map((cl, index) => {
                return cl.id.toString()
            })

            // console.log(fetchedCourseData)
            this.setState({
                courseData: fetchedCourseData,
                isLoading: false,
                isEdit: false,
                options: newOptions,
                selected: newSelected
            })
        }).catch(err => {

        });
    }

    onUpdate = () => {
        let url = "https://api-english-academy.herokuapp.com/courses/" + this.props.courseId;
        // console.log(url);
        let newCourseData = {
            name: this.state.courseData.ten,
            fee: parseInt(this.state.courseData.hocPhi),
            duration: parseInt(this.state.courseData.thoiGianHoc)
            //update list class
            
        };
        this.setState({ isLoading: true });

        const headers = {
            'Content-Type': 'application/json',
        };
        axios.put(url, newCourseData, { headers: headers }).then(response => {
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

    componentDidMount() {
        //get data from this.props.courseId
        this.fetchData();

    }

    render() {
        return (
            <Modal show={ this.props.isShow } onHide={ this.props.handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Khóa học { this.props.courseId }</Modal.Title>
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
                                            disabled={ !this.state.isEdit }
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
                                            disabled={ !this.state.isEdit }
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
                                            disabled={ !this.state.isEdit }
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <ControlLabel className="col-md-3">
                                        Danh sách lớp
                                            </ControlLabel>
                                    <Col md={ 9 }>
                                        {
                                            !this.state.isEdit ?
                                                this.state.courseData.danhSachLopHoc.map((lop, index) => {
                                                    if (index !== this.state.courseData.danhSachLopHoc.length)
                                                        return (<Link to="/#" key={ index }>{ lop.name }, </Link>)
                                                    else return (<Link to="/#" key={ index }>{ lop.name }</Link>)
                                                }) :
                                                <DualListBox
                                                    options={ this.state.options }
                                                    selected={ this.state.selected }
                                                    onChange={ (selected) => {

                                                        this.setState({ selected });
                                                    } }
                                                />
                                        }
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

export default CourseDetailModal;