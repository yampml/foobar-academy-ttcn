import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net
import $ from 'jquery';
import {
  Grid, Row, Col, Modal, Button, OverlayTrigger, Form, FormControl, FormGroup, ControlLabel, Checkbox
} from 'react-bootstrap';
import Datetime from 'react-datetime';
import Card from 'components/Card/Card.jsx';

import { connect } from 'react-redux';

import * as actions from '../../reduxStore/actions/actionsIndex';
// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

const glyphiconStyles = {
  fontSize: "30px"
}

class ManageClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      tableData: {
        header: ["ID", "Tên lớp học", "Tên khóa học", "Thời gian học", "Số lượng HS"],
        data: [
          {
            id: 1,
            ten: "Airi Satou",
            khoaHoc: "Foobar",
            thoiGianBatDau: "1/1/2011",
            soLuongHocSinh: '56'
          },
          {
            id: 2,
            ten: "Yasuo",
            khoaHoc: "Foobar",
            thoiGianBatDau: "1/1/2011",
            soLuongHocSinh: '51236'
          },
          {
            id: 3,
            ten: "Ziggs",
            khoaHoc: "Foobar",
            thoiGianBatDau: "1/1/2011",
            soLuongHocSinh: '5631'
          },
          {
            id: 4,
            ten: "Zed",
            khoaHoc: "Foobar",
            thoiGianBatDau: "1/1/2011",
            soLuongHocSinh: '56'
          }
        ]
      }
    }
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

  handleClose = () => {
    this.setState({ showAddModal: false });
    this.resetFormData();
  }

  handleShow = () => {
    this.setState({ showAddModal: true });
  }

  handleInputNameChange = (event) => {
    let newState = { ...this.state };
    newState.addClassFormData = { ...this.state.addClassFormData };
    newState.addClassFormData.className = event.target.value;
    this.setState(newState);
  }

  handleNewClassFormSubmit = () => {
    let data = { ...this.state.addClassFormData };
    let newRow = [];
    for (var key in data) {
      newRow.push(data[key]);
    }
    let updatedDataTable = { ...this.state.dataTable };
    updatedDataTable.dataRows.push(newRow);
    this.props.updateCoursesList(updatedDataTable);
    this.resetFormData();
    this.handleClose();
  }

  resetFormData = () => {
    this.setState({
      addClassFormData: {
        className: "",
        startDate: "1/1/2001",
        numberOfStudents: 0,
      }
    })
  }


  componentDidMount() {
    // $(this.refs.main).DataTable({
    //     dom: '<"data-table-wrapper"t>',
    //     data: this.props.names,
    //     columns,
    //     ordering: false
    // });
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
  }
  render() {


    const dataTable = this.jsonDataToTable();


    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={ 12 }>
              <Card
                title="Danh sách lớp học"
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
                                  <a className="btn btn-simple btn-info btn-icon"><i className="glyphicon glyphicon-folder-open" onClick={ () => { this.props.history.push('/admin/classDetail/' + prop[0])}}></i></a>
                                  <a className="btn btn-simple btn-danger btn-icon remove"><i className="fa fa-times" ></i></a>
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
        </Grid>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     coursesClass: state.coursesClass.coursesClass,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     updateCoursesList: (updatedCourses) => dispatch(actions.updateCourses(updatedCourses))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ManageClass);
export default ManageClass;