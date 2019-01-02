import React, { Component } from 'react';
import $ from 'jquery';

import {
  Grid, Row, Col,
  Table,
  OverlayTrigger,
  Tooltip, Modal, FormGroup, FormControl, Media, Checkbox, ControlLabel
} from 'react-bootstrap';
import axios from 'axios';
// react component that creates a switch button that changes from on to off mode
import Switch from 'react-bootstrap-switch';

import Select from 'react-select';
import Datetime from 'react-datetime';
import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

import SweetAlert from 'react-bootstrap-sweetalert';
import callApi from '../../reduxStore/apiCaller';
import { connect } from 'react-redux';
import * as actions from '../../reduxStore/actions/actionsIndex';
import ReactLoading from 'react-loading';
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');


class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      currentID: null,
      modalCurrentUser: {
        email: "",
        hoTen: "",
        diaChi: "",
        ngaySinh: "",
        password: "",
        singleSelect: null,
        isEdit: false
      },


      tableData: {
        header: ["ID", "Email", "Họ tên", "SĐT", "Loại tài khoản"],
        data: []
      },
      isLoading: true
    };
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
        console.log(response);

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
        console.log(newTableData)
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

  componentDidMount() {
    this.fetchData();
  }

  handleClose = () => {
    this.setState({ showAddModal: false, currentID: null });
  }

  handleShow = (id) => {
    const usr = this.state.tableData.data.find(o => o.id === id);

    this.setState({
      showAddModal: true,
      currentID: id,
      modalCurrentUser: {
        email: usr.email,
        hoTen: usr.name,
        diaChi: "",
        ngaySinh: "",
        password: "",
        role: usr.role,
        singleSelect: usr.role
      },
    });
  }

  handleChange = name => event => {
    const modalCurrentUser = { ...this.state.modalCurrentUser };
    modalCurrentUser[name] = event.target.value;
    this.setState({
      modalCurrentUser
    });
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
            Khóa học đã bị xóa!
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

  renderUserModal = (user) => {

    const selectOptions = [
      { value: 'student', label: 'Học sinh' },
      { value: 'teacher', label: 'Giáo viên' },
      { value: 'admin', label: 'Quản lý' },
    ];
    return (
      <Modal show={ this.state.showAddModal } onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Card
              title={ user.name }
              content={
                <div style={ { overflow: "auto" } }>
                  <FormGroup>
                    <ControlLabel>Email: <span className="star">*</span></ControlLabel>
                    <FormControl type="text" name="email" value={ this.state.modalCurrentUser.email } onChange={ this.handleChange('email') } />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Họ tên: <span className="star">*</span></ControlLabel>
                    <FormControl type="text" name="hoten" value={ this.state.modalCurrentUser.hoTen } onChange={ this.handleChange('hoTen') } />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Ngày sinh <span className="star">*</span></ControlLabel>
                    <Datetime
                      timeFormat={ false }
                      inputProps={ { placeholder: "Date Picker Here" } }
                      defaultValue={ new Date() }
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Địa chỉ: <span className="star">*</span></ControlLabel>
                    <FormControl type="text" name="hoten" value={ this.state.modalCurrentUser.diaChi } onChange={ this.handleChange('diaChi') } />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Mật khẩu: <span className="star">*</span></ControlLabel>
                    <FormControl type="password" name="password" value={ this.state.modalCurrentUser.password } onChange={ this.handleChange('password') } />
                    { this.state.passwordError }
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Loại tài khoản<span className="star">*</span></ControlLabel>
                    <Select
                      placeholder="Single Select"
                      name="singleSelect"
                      value={ this.state.modalCurrentUser.singleSelect }
                      options={ selectOptions }
                    // onChange={ (value) => this.setState({ modalCurrentUser.singleSelect: value }) }
                    />
                  </FormGroup>
                  <div className="category">
                    <span className="star">*</span> Required fields
                                            </div>
                  {/* <Button bsStyle="info" fill pullRight onClick={ this.handleRegisterSubmit.bind(this) }>
                    Register
                  </Button> */}
                </div>
              }
            />
          </form>
        </Modal.Body>
        <Modal.Footter>
          this.state.modalCurrentUser.isEdit ?
            ([
                //tam
                <Button key="1" onClick={ this.onUpdate }><i className="glyphicon glyphicon-edit"></i> Lưu</Button>,
                <Button key="2" onClick={ this.fetchData }><i className="glyphicon glyphicon-edit"></i> Hủy bỏ</Button>
            ])
          :
            <Button onClick={ () => this.setState({ isEdit: true }) }><i className="glyphicon glyphicon-edit"></i> Chỉnh sửa</Button>
        </Modal.Footter>
      </Modal>
    )
  }

  addNewAccount = () => {
    this.props.history.push("/admin/manageUser/registerAccount");
  }

  render() {
    const dataTable = this.jsonDataToTable();

    let userModal = null;
    if (this.state.currentID) userModal = this.renderUserModal(this.state.tableData.data.find(o => o.id === this.state.currentID));

    return (
      <div className="main-content">
        { this.state.alert }
        { this.state.isLoading ? (<ReactLoading style={ { width: '100px', margin: 'auto' } } type={ "spinningBubbles" } color={ "#ADFF2F" } height={ '10' } width={ '10' } />) : (
          <Grid fluid>
            <Row>
              <Col md={ 1 } style={ { height: '50px' } }>
                <Button bsStyle="success" fill wd onClick={ () => this.addNewAccount() }>
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
                                    <a className="btn btn-simple btn-info btn-icon"><i className="glyphicon glyphicon-folder-open" onClick={ () => this.handleShow(prop[0]) }></i></a>
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
        { userModal }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userList: state.usersList.userList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(actions.fetchUserFromDB())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
