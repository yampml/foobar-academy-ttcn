import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net
import $ from 'jquery';
import {
  Grid, Row, Col, Modal, Button, OverlayTrigger, Form, FormControl, FormGroup, ControlLabel, Checkbox
} from 'react-bootstrap';
import Datetime from 'react-datetime';
import Card from 'components/Card/Card.jsx';
import ReactLoading from 'react-loading';

import SweetAlert from 'react-bootstrap-sweetalert';

import axios from 'axios';
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
      tableData: {
        header: ["ID", "Tên lớp học", "Tên khóa học"],
        data: [
          {
            id: 1,
            ten: "Airi Satou",
            khoaHoc: "Foobar",
          },
          {
            id: 2,
            ten: "Yasuo",
            khoaHoc: "Foobar",
          },
          {
            id: 3,
            ten: "Ziggs",
            khoaHoc: "Foobar",
          },
          {
            id: 4,
            ten: "Zed",
            khoaHoc: "Foobar",
          }
        ]
      },

      showClassAddModal: false,

      isLoading: true,
      alert: null,
      coursesData: []
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
    axios.delete('https://api-english-academy.herokuapp.com/class-rooms/' + id, 'Content-Type').then(res => {
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
            Lớp học đã bị xóa!
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
    let url = "https://api-english-academy.herokuapp.com/class-rooms";
    await this.setState({ isLoading: true });
    await axios.get("https://api-english-academy.herokuapp.com/courses/")
      .then(res => {
        let course_data = res.data.tableData.data.slice();
        this.setState({ coursesData: course_data });
      })

    await axios.get(url)
      .then((response) => {
        console.log(response)
        console.log(this.state.coursesData)

        let newTableData = { ...this.state.tableData };
        newTableData.data = response.data;
        console.log(newTableData)
        let newTableDataWithCourseName = newTableData.data.map((cl, index) => {
          let courseName = this.state.coursesData.find(o => o.id === cl.course_id);
          
          return {
            id: cl.id,
            name: cl.name,
            courseName: courseName ? courseName.name : "NULL"
          }
        })
        newTableData.data = newTableDataWithCourseName;
        this.setState({ tableData: newTableData, isLoading: false });

      })
      .catch(err => {
        alert(err.message);
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
    await this.setState({ isLoading: false });


  }



  componentDidMount() {
    this.fetchData();
  }
  render() {
    const dataTable = this.jsonDataToTable();

    return (
      <div className="main-content">
        { this.state.alert }
        { this.state.isLoading ? (<ReactLoading style={ { width: '100px', margin: 'auto' } } type={ "spinningBubbles" } color={ "#ADFF2F" } height={ '10' } width={ '10' } />) : (

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
                            <th className="disabled-sorting text-right">{ dataTable.headerRow[5] }</th>
                          </tr>
                        </thead>
                        <tfoot style={ { display: "table-header-group" } }>
                          <tr>
                            <th>{ dataTable.footerRow[0] }</th>
                            <th>{ dataTable.footerRow[1] }</th>
                            <th>{ dataTable.footerRow[2] }</th>
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
                                    <a className="btn btn-simple btn-info btn-icon"><i className="glyphicon glyphicon-folder-open" onClick={ () => { this.props.history.push('/admin/classDetail/' + prop[0]) } }></i></a>
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