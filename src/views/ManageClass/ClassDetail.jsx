import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net
import $ from 'jquery';
import {
    Grid, Row, Col, Modal, Button, OverlayTrigger, Form, FormControl, FormGroup, ControlLabel, Checkbox, Breadcrumb,
    Nav, NavItem,
    Tab
} from 'react-bootstrap';
import Datetime from 'react-datetime';
import Card from 'components/Card/Card.jsx';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactLoading from "react-loading";
import * as actions from '../../reduxStore/actions/actionsIndex';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';
import { events } from 'variables/Variables.jsx';
import DualListBox from 'react-dual-listbox';
import Select from 'react-select';
import 'react-dual-listbox/lib/react-dual-listbox.css';
BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

const glyphiconStyles = {
    fontSize: "30px"
}

class ClassDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course_id: "",
            id: "",
            listStudentIDs: [],
            listTeacherIDs: [],
            listTimetableIDs: [],
            classroomName: "",

            all_courses: [],
            courses_selecting: "",
            courses_select_options: [], // {value: "", label: ""}
            courseData_id: "",
            courseData_fee: "",
            courseData_duration: "",
            courseData_name: "",
            
            listStudentData: [],
            listTeacherData: [],

            timetableData: [],

            lopID: 1,
            tenLop: "Foo",
            idKhoaHoc: 69,
            hocSinhIDs: [1, 2, 3, 4, 5, 6],
            idGiangVien: 696,
            // buoiHocIds: 1,2,3,4 // cai nay tao database buoi hoc luon, 3 column thoi, id, timeStart, timeEnd, dai loai the

            tenKhoaHoc: "FooKhoaHoc",

            danhSachGiangVien: [],
            isLoading: false,
            isEdit: false,

            thongBao: [
                {
                    id: 1,
                    thoiGian: "1/1/2011",
                    noiDung: "Foobar lam web met qua di nha",
                    nguoiDang: "Giao vien A"
                },
                {
                    id: 2,
                    thoiGian: "1/1/2011",
                    noiDung: "Foobar lam web met qua di nha",
                    nguoiDang: "Quan ly Z",
                },
                {
                    id: 3,
                    thoiGian: "1/1/2011",
                    noiDung: "Foobar lam web met qua di nha",
                    nguoiDang: "Giao vien F"
                },
                {
                    id: 4,
                    thoiGian: "1/1/2011",
                    noiDung: "Foobar lam web met qua di nha",
                    nguoiDang: "Giao vien E"
                }
            ],

            events: events,
            alert: null,

            teacher_options: [],
            teacher_selected: [],

            student_options: [],
            student_selected: [],
        };

        this.hideAlert = this.hideAlert.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }



    fetchData = async () => {
        let url = "https://api-english-academy.herokuapp.com/class-rooms/" + this.props.match.params.id;

        await this.setState({ isLoading: true });
        await axios.get(url)
            .then((response) => {

                let data = { ...response.data };
                this.setState({
                    course_id: data.course_id,
                    id: data.id,
                    listStudentIDs: data.listStudentIDs,
                    listTeacherIDs: data.listTeacherIDs,
                    listTimetableIDs: data.listTimetableIDs,
                    classroomName: data.name,
                })

            })
            .catch(err => {
                alert(err.message);
            })

        await axios.get("https://api-english-academy.herokuapp.com/courses/" + this.state.course_id)
            .then((response) => {
                let data = { ...response.data.courseData[0] };
                let courseData = {
                    courseData_id: data.id,
                    courseData_fee: data.fee,
                    courseData_duration: data.duration,
                    courseData_name: data.name
                }
                this.setState({
                    ...courseData
                })

            })
            .catch(err => {
                console.log(err.message);
            })

        await axios.get("https://api-english-academy.herokuapp.com/courses/")
            .then(response => {
                let all_courses = response.data.tableData.data.slice();
                let courses_select_options = all_courses.map((el, index) => {
                    return {
                        value: el.id,
                        label: el.name
                    }
                })
                let courses_selecting = this.state.course_id;
                this.setState({ all_courses, courses_select_options, courses_selecting });

            }).catch(err => {
                console.log(err.message);
            })


        const auth_token = localStorage.getItem('token');
        await axios.get("https://api-english-academy.herokuapp.com/users/", {
            headers: {
                Authorization: 'Bearer ' + auth_token
            }
        })
            .then((response) => {
                let userList = response.data;
                let studentList = userList.filter(o => o.role === 'student');
                let teacherList = userList.filter(o => o.role === 'teacher');
                let thisClassroomTeaList = teacherList.filter(o => this.state.listTeacherIDs.includes(o.id));
                let thisClassroomStuList = studentList.filter(o => this.state.listStudentIDs.includes(o.id));


                let student_options = [];
                studentList.map((st, index) => {
                    student_options.push({
                        value: st.id.toString(),
                        label: st.name
                    })
                })
                let student_selected = [];
                // console.log(this.state.listStudentIDs)
                this.state.listStudentIDs.map((st, index) => {
                    student_selected.push(st.toString());
                });

                let teacher_options = [];
                teacherList.map((tc, index) => {
                    teacher_options.push({
                        value: tc.id.toString(),
                        label: tc.name
                    })
                })
                let teacher_selected = [];
                this.state.listTeacherIDs.map((tc, index) => {
                    teacher_selected.push(tc.toString());
                });

                let fixedStudentList = thisClassroomStuList.map((st, index) => {
                    return {
                        name: st.name,
                        email: st.email,
                        phone: st.phone
                    }
                })
                let fixedTeacherList = thisClassroomTeaList.map((st, index) => {
                    return {
                        name: st.name,
                        email: st.email,
                        phone: st.phone
                    }
                })
                this.setState({
                    listStudentData: fixedStudentList,
                    listTeacherData: fixedTeacherList,
                    teacher_options,
                    teacher_selected,
                    student_options,
                    student_selected,
                })
            })
            .catch(err => {
                alert(err.message);
            })

        await axios.get("https://api-english-academy.herokuapp.com/timetables/", {
            headers: {
                Authorization: 'Bearer ' + auth_token
            }
        })
            .then((response) => {

                let timetableList = response.data.slice();
                let timetableData = timetableList.filter(o => this.state.listTimetableIDs.includes(o.id));

                this.setState({
                    timetableData
                })


            })
            .catch(err => {
                alert(err.message);
            })

        await $("#dsHocSinhdatatables").DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Tất cả"]],
            // "searching": false,
            // "ordering": false,
            retrieve: true,
            responsive: true,
            language: {
                "decimal": "",
                "emptyTable": "Không có dữ liệu",
                "info": "Đang hiển thị từ _START_ đến _END_ trong tổng cộng _TOTAL_ mục",
                "infoEmpty": "Đang hiển thị từ 0 đến 0 trong tổng cộng 0 mục",
                "infoFiltered": "đã lọc tổng cộng _MAX_ mục)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Hiển thị _MENU_ mục",
                "loadingRecords": "Đang load...",
                "processing": "Đang xử lý...",
                "zeroRecords": "Không tìm thấy mục nào",
                "paginate": {
                    "first": "Trang đầu",
                    "last": "Trang cuối",
                    "next": "Trang tiếp",
                    "previous": "Trang trước"
                },
                search: "_INPUT_",
                searchPlaceholder: "Tìm kiếm tất cả",
            }
        });
        var table = $('#dsHocSinhdatatables').DataTable();

        $('#dsHocSinhdatatables tfoot th').each(function () {
            var title = $(this).text();
            if (title !== '') $(this).html('<input id="" type="text" placeholder="Tìm theo ' + title + '" />');
        });

        table.columns().every(function () {
            var that = this;
            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });

        await this.setState({ isLoading: false });
    }


    componentDidMount() {
        this.fetchData();
    }

    jsonDataToTable = () => {
        let data = this.state.listStudentData;
        let tableRows = data.map((row, index) => {
            return Object.values(row)
        })

        let tableHeader = ["ID", "Ten Hoc Sinh", "So Dien Thoai"]
        tableHeader.push("Actions");
        return {
            headerRow: tableHeader,
            footerRow: tableHeader,
            dataRows: tableRows
        }
    }


    selectedEvent(event) {
        alert(event.title);
    }
    addNewEventAlert(slotInfo) {
        this.setState({
            alert: (
                <SweetAlert
                    input
                    showCancel
                    style={ { display: "block", marginTop: "-100px" } }
                    title="Input something"
                    onConfirm={ (e) => this.addNewEvent(e, slotInfo) }
                    onCancel={ () => this.hideAlert() }
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="danger"
                />
            )
        });
    }
    addNewEvent(e, slotInfo) {
        console.log(e, slotInfo);
        var newEvents = this.state.events;
        newEvents.push({
            'title': e,
            'start': slotInfo.start,
            'end': slotInfo.end
        })
        this.setState({
            alert: null,
            events: newEvents
        })
    }
    hideAlert() {
        this.setState({
            alert: null
        });
    }

    handleEditBtn = () => {
        this.setState({ isEdit: true });
    }

    handleSaveBtn = async () => {
        let url = "https://api-english-academy.herokuapp.com/class-rooms/" + this.state.id;
        let list_students = this.state.student_selected.map((el, index) => {
            return parseInt(el);
        });

        let list_teachers = this.state.teacher_selected.map((el, index) => {
            return parseInt(el);
        })
        console.log(this.state.courseData_id)
        let newClassroomData = {
            name: this.state.classroomName,
            course_id: this.state.courses_selecting.value,
            list_students,
            list_teachers
        }

        await axios.put(url, newClassroomData).then(res => {

        }).catch(err => {
            alert(err.message)
        });
        await this.fetchData();
        await this.setState({ isEdit: false });
    }

    handleHuyBtn = async () => {
        await this.fetchData();
        await this.setState({ isEdit: false });
    }

    render() {

        let dsHocSinhDataTable = this.jsonDataToTable();

        const tabsIcons = (
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey="thongBao">
                <Row className="clearfix">
                    <Col md={ 12 }>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="thongBao">
                                <i className="fa fa-info"></i> Thông báo
                            </NavItem>
                            <NavItem eventKey="dsHocSinh">
                                <i className="fa fa-user"></i> Danh sách học sinh
                            </NavItem>
                            <NavItem eventKey="lichHoc">
                                <i className="fa fa-calendar"></i> Lịch học
                            </NavItem>
                            <NavItem eventKey="diemDanh">
                                <i className="fa fa-thumbs-up"></i> Điểm danh
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col md={ 12 }>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="thongBao">
                                {
                                    this.state.thongBao.map((tb, index) => {
                                        return (
                                            <div className="typo-line" key={ index }>
                                                <p className="category" >{ tb.thoiGian }</p>
                                                <blockquote>
                                                    <p>
                                                        { tb.noiDung }
                                                    </p>
                                                    <small>
                                                        { tb.nguoiDang }
                                                    </small>
                                                </blockquote>
                                            </div>
                                        )
                                    })
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="dsHocSinh">
                                <div className="fresh-datatables">
                                    <table id="dsHocSinhdatatables" ref="main" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={ { width: "100%" } }>
                                        <thead>
                                            <tr>
                                                <th>{ dsHocSinhDataTable.headerRow[0] }</th>
                                                <th>{ dsHocSinhDataTable.headerRow[1] }</th>
                                                <th>{ dsHocSinhDataTable.headerRow[2] }</th>
                                                {/* <th>{ dsHocSinhDataTable.headerRow[3] }</th> */ }
                                                {/* <th className="disabled-sorting text-right">{ dsHocSinhDataTable.headerRow[3] }</th> */ }
                                            </tr>
                                        </thead>
                                        <tfoot style={ { display: "table-header-group" } }>
                                            <tr>
                                                <th>{ dsHocSinhDataTable.footerRow[0] }</th>
                                                <th>{ dsHocSinhDataTable.footerRow[1] }</th>
                                                <th>{ dsHocSinhDataTable.footerRow[2] }</th>
                                                {/* <th>{ dsHocSinhDataTable.footerRow[3] }</th> */ }
                                                {/* <th>{ dataTable.footerRow[4] }</th> */ }
                                                {/* <th></th> */ }
                                                {/* <th className="text-right">{ dataTable.footerRow[5] }</th> */ }
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            {
                                                dsHocSinhDataTable.dataRows.map((prop, key) => {
                                                    return (
                                                        <tr key={ key }>
                                                            {
                                                                prop.map((prop, key) => {
                                                                    return (
                                                                        <td key={ key }>{ prop }</td>
                                                                    );
                                                                })
                                                            }
                                                            {/* <td className="text-right">
                                                                <a className="btn btn-simple btn-info btn-icon"><i className="glyphicon glyphicon-folder-open" onClick={ () => this.handleShowCourseModal(prop[0]) }></i></a>
                                                                <a className="btn btn-simple btn-danger btn-icon remove"><i className="fa fa-times" onClick={ () => this.onDelete(prop[0]) }></i></a>
                                                            </td> */}
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="lichHoc">
                                <h1>Constructing...</h1>
                                {
                                    this.state.timetableData.map((ele, index) => {
                                        return <p key={ index }>{ ele.id }  { ele.weekday }  { ele.start_time }  { ele.end_time }</p>
                                    })
                                }

                                <Card
                                    calendar
                                    content={
                                        <BigCalendar
                                            selectable
                                            events={ this.state.events }
                                            defaultView='month'
                                            scrollToTime={ new Date(1970, 1, 1, 6) }
                                            defaultDate={ new Date() }
                                            onSelectEvent={ event => this.selectedEvent(event) }
                                            onSelectSlot={ (slotInfo) => this.addNewEventAlert(slotInfo) }
                                        />
                                    }
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="diemDanh">
                                Constructinggg..
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );

        return (
            <div className="main-content">
                { this.state.alert }
                <Grid fluid>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/admin/manageClass">Manage Class</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Class ID { this.props.match.params.id }
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>
                        <Col md={ 12 }>
                            <Card
                                title={ "Lớp học " + this.state.tenLop }
                                content={
                                    <div>
                                        {
                                            this.state.isLoading ? (<ReactLoading style={ { width: '100px', margin: 'auto' } } type={ "spinningBubbles" } color={ "#ADFF2F" } height={ '10' } width={ '10' } />) :
                                                (
                                                    <Form horizontal>
                                                        <FormGroup>
                                                            <ControlLabel className="col-md-2" >
                                                                Tên lớp
                                                            </ControlLabel>
                                                            <Col md={ 4 }>
                                                                <FormControl
                                                                    type="text"
                                                                    value={ this.state.classroomName }
                                                                    onChange={ (event) => this.setState({ classroomName: event.target.value }) }
                                                                    disabled={ !this.state.isEdit }
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <ControlLabel className="col-md-2" >
                                                                Khóa học
                                                            </ControlLabel>
                                                            <Col md={ 4 }>
                                                                {/* <FormControl
                                                                    type="text"
                                                                    value={ this.state.courseData_name }
                                                                    onChange={ (event) => this.setState({ courseData_name: event.target.value }) }
                                                                    disabled={ !this.state.isEdit }
                                                                /> */}
                                                                <Select
                                                                    placeholder="Khóa học"
                                                                    value={ this.state.courses_selecting }
                                                                    options={ this.state.courses_select_options }
                                                                    onChange={ (value) => this.setState({ courses_selecting: value }) }
                                                                    disabled={ !this.state.isEdit }
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <ControlLabel className="col-md-2" >
                                                                Giảng viên
                                                            </ControlLabel>
                                                            <Col md={ 10 }>
                                                                <Col md={ 9 } style={ { padding: "10px 12px" } }>
                                                                    {
                                                                        !this.state.isEdit ?
                                                                            this.state.listTeacherData.map((gv, index) => {
                                                                                if (index !== this.state.danhSachGiangVien.length - 1)
                                                                                    return (<Link to="#" key={ index }>{ gv.name }, </Link>)
                                                                                else return (<Link to="#" key={ index }>{ gv.name }</Link>)
                                                                            }) :
                                                                            <DualListBox
                                                                                options={ this.state.teacher_options }
                                                                                selected={ this.state.teacher_selected }
                                                                                onChange={ (teacher_selected) => {
                                                                                    this.setState({ teacher_selected });
                                                                                } }
                                                                            />
                                                                    }
                                                                </Col>
                                                            </Col>
                                                        </FormGroup>
                                                        {
                                                            !this.state.isEdit ?
                                                                <FormGroup>
                                                                    <Col md={ 10 } mdOffset={ 1 }>
                                                                        <Card
                                                                            title="Quản lý"
                                                                            ctFullWidth
                                                                            content={ tabsIcons }
                                                                        />
                                                                    </Col>
                                                                </FormGroup>
                                                                :
                                                                <FormGroup>
                                                                    <ControlLabel className="col-md-2" >
                                                                        Học sinh
                                                                    </ControlLabel>
                                                                    <Col md={ 10 }>
                                                                        <Col md={ 9 } style={ { padding: "10px 12px" } }>

                                                                            <DualListBox
                                                                                options={ this.state.student_options }
                                                                                selected={ this.state.student_selected }
                                                                                onChange={ (student_selected) => {
                                                                                    this.setState({ student_selected });
                                                                                } }
                                                                            />

                                                                        </Col>
                                                                    </Col>
                                                                </FormGroup>
                                                        }

                                                        {
                                                            !this.state.isEdit ? <Button className="primary" onClick={ this.handleEditBtn }>Chỉnh sửa</Button> :
                                                                (
                                                                    <div>
                                                                        <Button className="primary" onClick={ this.handleSaveBtn }>Lưu</Button>
                                                                        <Button className="primary" onClick={ this.handleHuyBtn }>Hủy bỏ</Button>
                                                                    </div>
                                                                )
                                                        }

                                                    </Form>
                                                )
                                        }
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

// const mapStateToProps = state => {
//     return {
//         coursesClass: state.coursesClass.coursesClass,
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         updateCoursesList: (updatedCourses) => dispatch(actions.updateCourses(updatedCourses))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ClassDetail);
export default ClassDetail;