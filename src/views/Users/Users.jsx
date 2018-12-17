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

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

import { RegisterPage } from 'views/Pages/RegisterPage.jsx';
import callApi from '../../reduxStore/apiCaller';
import { connect } from 'react-redux';
import * as actions from '../../reduxStore/actions/actionsIndex';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      currentID: null
    };
  }

  handleClose = () => {
    this.setState({ showAddModal: false, currentID: null });
  }

  handleShow = (id) => {
    this.setState({ 
      showAddModal: true,
      currentID: id
     });
  }

  onDelete = (id) => {
    callApi('users/' + id, 'DELETE', null).then(res => {
      this.props.fetchUsers();
    })
  }

  renderUserModal = (user) => {
    return (
      <Modal show={this.state.showAddModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thông tin tài khoản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card
              title={user.name}
              content={
                <form>
                  <FormGroup>
                    <ControlLabel>
                      Email
                            </ControlLabel>
                    <FormControl
                      value={user.email}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>
                      Số điện thoại
                            </ControlLabel>
                    <FormControl
                      value={user.phone}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>
                      Vị trí
                            </ControlLabel>
                    <FormControl
                      value={user.role}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>
                      Ngày tham gia
                            </ControlLabel>
                    <FormControl
                      value={user.created_at}
                    />
                  </FormGroup>
                </form>
              }
            />
          </Modal.Body>
        </Modal>
    )
  }
  render() {
    const view = (
      <Tooltip id="view">View Profile</Tooltip>
    );
    const remove = (
      <Tooltip id="remove">Remove</Tooltip>
    );

    let userModal = null;
    if(this.state.currentID) userModal = this.renderUserModal(this.props.userList[this.state.currentID]);

    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={1} />
            <Col md={11}>
              <Card
                title="Quản lý người dùng"
                category="Trung tâm ngoại ngữ Lê Xinh"
                tableFullWidth
                content={
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Role</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Phone</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.userList.map((item, index) =>
                        <tr key={index}>
                          <td className="text-center">{item.id}</td>
                          <td className="text-center">{item.name}</td>
                          <td className="text-center">{item.role}</td>
                          <td className="text-center">{item.email}</td>
                          <td className="text-center">{item.phone}</td>
                          <td className="td-actions text-right">
                            <OverlayTrigger placement="top" overlay={view}>
                              <Button simple bsStyle="info" bsSize="xs" onClick={() => this.handleShow(item.id)}>
                                <i className="fa fa-user"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={remove}>
                              <Button simple bsStyle="danger" bsSize="xs" onClick={() => this.onDelete(item.id)}>
                                <i className="fa fa-times"></i>
                              </Button>
                            </OverlayTrigger>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>

        {userModal}
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

export default connect(mapStateToProps,mapDispatchToProps)(Users);
