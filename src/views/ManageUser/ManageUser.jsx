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
import UserDetailModal from './UserDetailModal.jsx';
import AddUserModal from './AddUserModal.jsx';

// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: {
                header: ["ID", "Email", "Họ tên", "SĐT", "Loại tài khoản"],
                data: []
            },
            showUserDetailModal: false,
            showUserAddModal: false,
            showingUserId: null,

            isLoading: true,
            alert: null
        };
    }

    handleCloseDetailModal = () => {
        this.setState({ showUserDetailModal: false });
        this.fetchData();
    }

    handleShowUserModal = (userId) => {
        this.setState({ showUserDetailModal: true, showingUserId: userId });
    }

    handleCloseAddModal = () => {
        this.setState({ showUserAddModal: false });
        this.fetchData();
    }

    handleShowAddModal = (userId) => {
        this.setState({ showUserAddModal: true });
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

        const auth_token = localStorage.getItem('token');
        axios.delete('https://api-english-academy.herokuapp.com/users/' + id, {
            headers: {
                Authorization: 'Bearer ' + auth_token
            }
        }).then(res => {
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
                        Tài khoản đã bị xóa!
                    </SweetAlert>
                ),

            });
        }).catch(err => {
            alert(err);
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

    fetchData = () => {
        const auth_token = localStorage.getItem('token');

        let url = "https://api-english-academy.herokuapp.com/users";
        axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + auth_token
            }
        })
            .then(response => {
                // console.log(response);

                let newTableData = { ...this.state.tableData };
                newTableData.data = response.data.map((row, index) => {
                    return {
                        id: row.id,
                        email: row.email,
                        name: row.name,
                        phone: row.phone,
                        role: row.role
                    }
                });
                // console.log(newTableData)
                this.setState({ tableData: newTableData, isLoading: false });

                $("#datatables").DataTable({
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

            })
            .catch(err => {
                alert(err);

            })

    }



    componentDidMount() {
        this.fetchData();
    }
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
                                    title="Quản lý người dùng"
                                    category="Trung tâm ngoại ngữ Lê Xinh"
                                    // tableFullWidth
                                    content={
                                        <div className="fresh-datatables">
                                            <table id="datatables" ref="main" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={ { width: "100%" } }>
                                                <thead>
                                                    <tr>
                                                        <th>{ dataTable.headerRow[0] }</th>
                                                        <th>{ dataTable.headerRow[1] }</th>
                                                        <th>{ dataTable.headerRow[2] }</th>
                                                        <th>{ dataTable.headerRow[3] }</th>
                                                        <th>{ dataTable.headerRow[4] }</th>
                                                        <th className="disabled-sorting text-right">{ dataTable.headerRow[5] }</th>
                                                    </tr>
                                                </thead>
                                                <tfoot style={ { display: "table-header-group" } }>
                                                    <tr>
                                                        <th>{ dataTable.footerRow[0] }</th>
                                                        <th>{ dataTable.footerRow[1] }</th>
                                                        <th>{ dataTable.footerRow[2] }</th>
                                                        <th>{ dataTable.footerRow[3] }</th>
                                                        <th>{ dataTable.footerRow[4] }</th>
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
                                                                        <a className="btn btn-simple btn-info btn-icon"><i className="glyphicon glyphicon-folder-open" onClick={ () => this.handleShowUserModal(prop[0]) }></i></a>
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
                    this.state.showUserDetailModal ?
                        <UserDetailModal userId={ this.state.showingUserId } isShow={ this.state.showUserDetailModal } handleClose={ this.handleCloseDetailModal } />
                        : null
                }
                {
                    this.state.showUserAddModal ?
                        <AddUserModal isShow={ this.state.showUserAddModal } handleClose={ this.handleCloseAddModal } motherReFetchData={ this.fetchData } /> :
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
export default ManageUser;
