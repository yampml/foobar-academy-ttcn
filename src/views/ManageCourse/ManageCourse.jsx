import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import Button from 'elements/CustomButton/CustomButton.jsx';

import ReactLoading from 'react-loading';
import SweetAlert from 'react-bootstrap-sweetalert';

import Datetime from 'react-datetime';
import $ from 'jquery';

import * as actions from '../../reduxStore/actions/actionsIndex';
import Card from 'components/Card/Card.jsx';

import CourseDetailModal from './CourseDetailModal';
import AddCourseModal from './AddCourseModal';
// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

class ManageCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: {
                header: ["ID", "Tên khóa học", "Học phí", "Thời gian học"],
                data: []
            },
            showCourseDetailModal: false,
            showCourseAddModal: false,
            showingCourseId: null,
            isLoading: true,
            alert: null
        };
    }

    handleCloseDetailModal = () => {
        this.setState({ showCourseDetailModal: false });
        this.fetchData();
    }

    handleShowCourseModal = (courseId) => {
        this.setState({ showCourseDetailModal: true, showingCourseId: courseId });
    }

    handleCloseAddModal = () => {
        this.setState({ showCourseAddModal: false });
        this.fetchData();
    }

    handleShowAddModal = (courseId) => {
        this.setState({ showCourseAddModal: true });
    }

    jsonDataToTable = () => {
        let data = this.state.tableData.data;
        let tableRows = data.map((row, index) => {
            return Object.values(row)
        })

        let tableHeader = this.state.tableData.header;
        tableHeader.push("Actions");
        return {
            headerRow: tableHeader,
            footerRow: tableHeader,
            dataRows: tableRows
        }
    }

    onDelete = (id) => {
        this.warningWithConfirmMessage(id);
    }

    warningWithConfirmMessage = (id) => {
        this.setState({
            alert: (
                <SweetAlert
                    warning
                    style={ { display: "block", marginTop: "-200px" } }
                    title="Bạn có chắc chắn muốn xóa?"
                    onConfirm={ () => this.successDelete(id) }
                    onCancel={ () => this.hideAlert() }
                    confirmBtnBsStyle="info"
                    cancelBtnBsStyle="danger"
                    confirmBtnText="Xóa"
                    cancelBtnText="Hủy"
                    showCancel
                >
                    Bạn sẽ không thể hoàn tác lại hành động này
                </SweetAlert>
            )
        });
    }

    successDelete = (id) => {
        axios.delete('https://api-english-academy.herokuapp.com/courses/' + id, 'Content-Type').then(res => {
            this.setState({
                alert: (
                    <SweetAlert
                        success
                        style={ { display: "block", marginTop: "-200px" } }
                        title="Đã xóa!"
                        onConfirm={ this.hideAlert }
                        onCancel={ this.hideAlert }
                        confirmBtnBsStyle="info"
                    >
                        Khóa học đã bị xóa!
                    </SweetAlert>
                ),

            });
        }).catch(err => {
            alert("Co loi xay ra roi !");
            this.hideAlert();
        });
    }

    hideAlert = () => {
        this.setState({
            alert: null,
            isLoading: true,
        });
        this.fetchData()
    }

    fetchData = async () => {
        let url = "https://api-english-academy.herokuapp.com/courses";
        await this.setState({ isLoading: true });
        await axios.get(url)
            .then(response => {
                let newTableData = { ...this.state.tableData };
                newTableData.data = response.data.tableData.data;
                console.log(newTableData)
                this.setState({ tableData: newTableData, isLoading: false });

            })
            .catch(err => {
                alert("Co loi xay ra roi !");
            })

        await $("#datatables").DataTable({
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
        var table = $('#datatables').DataTable();

        $('#datatables tfoot th').each(function () {
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

        await this.setState({isLoading: false})

    }



    componentDidMount() {
        this.fetchData();

        // // Edit record
        // table.on('click', '.edit', function () {
        //     var $tr = $(this).closest('tr');

        //     var data = table.row($tr).data();
        //     alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
        // });

        // Delete a record
        // table.on('click', '.remove', function (e) {
        //     var $tr = $(this).closest('tr');
        //     table.row($tr).remove().draw();
        //     e.preventDefault();
        // });

        // // //Like record
        // // table.on('click', '.like', () => {
        // //     this.handleShowCourseModal();
        // // });
    }
    // componentWillUnmount() {

    //     $('#datatables')
    //         .DataTable()
    //         .clear()
    //         .destroy(true);
    // }

    // shouldComponentUpdate() {
    //     return false;
    // }

    render() {

        const dataTable = this.jsonDataToTable();
        const style = {
            rowMargin: {
                height: '50px',
            }
        }
        return (
            <div className="main-content">
                { this.state.alert }
                { this.state.isLoading ? (<ReactLoading style={ { width: '100px', margin: 'auto' } } type={ "spinningBubbles" } color={ "#ADFF2F" } height={ '10' } width={ '10' } />) : (
                    <Grid fluid>
                        <Row>
                            <Col md={ 1 } style={ style.rowMargin }>
                                <Button bsStyle="success" fill wd onClick={ () => this.handleShowAddModal() }>
                                    Thêm mới
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={ 12 }>
                                <Card
                                    content={
                                        <div className="fresh-datatables">
                                            <table id="datatables" ref="main" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={ { width: "100%" } }>
                                                <thead>
                                                    <tr>
                                                        <th>{ dataTable.headerRow[0] }</th>
                                                        <th>{ dataTable.headerRow[1] }</th>
                                                        <th>{ dataTable.headerRow[2] }</th>
                                                        <th>{ dataTable.headerRow[3] }</th>
                                                        <th className="disabled-sorting text-right">{ dataTable.headerRow[4] }</th>
                                                    </tr>
                                                </thead>
                                                <tfoot style={ { display: "table-header-group" } }>
                                                    <tr>
                                                        <th>{ dataTable.footerRow[0] }</th>
                                                        <th>{ dataTable.footerRow[1] }</th>
                                                        <th>{ dataTable.footerRow[2] }</th>
                                                        <th>{ dataTable.footerRow[3] }</th>
                                                        {/* <th>{ dataTable.footerRow[4] }</th> */ }
                                                        <th></th>
                                                        {/* <th className="text-right">{ dataTable.footerRow[5] }</th> */ }
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        dataTable.dataRows.map((prop, key) => {
                                                            return (
                                                                <tr key={ key }>
                                                                    {
                                                                        prop.map((prop, key) => {
                                                                            return (
                                                                                <td key={ key }>{ prop }</td>
                                                                            );
                                                                        })
                                                                    }
                                                                    <td className="text-right">
                                                                        <a className="btn btn-simple btn-info btn-icon"><i className="glyphicon glyphicon-folder-open" onClick={ () => this.handleShowCourseModal(prop[0]) }></i></a>
                                                                        <a className="btn btn-simple btn-danger btn-icon remove"><i className="fa fa-times" onClick={ () => this.onDelete(prop[0]) }></i></a>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                />
                            </Col>
                        </Row>
                    </Grid>) }

                {
                    this.state.showCourseDetailModal ?
                        <CourseDetailModal courseId={ this.state.showingCourseId } isShow={ this.state.showCourseDetailModal } handleClose={ this.handleCloseDetailModal } />
                        : null
                }
                {
                    this.state.showCourseAddModal ?
                        <AddCourseModal isShow={ this.state.showCourseAddModal } handleClose={ this.handleCloseAddModal } motherReFetchData={ this.fetchData } /> :
                        null
                }


            </div>
        );
    }
}

// const mapStateToProps = state => {
//     return {

//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {

//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);
export default ManageCourse;
