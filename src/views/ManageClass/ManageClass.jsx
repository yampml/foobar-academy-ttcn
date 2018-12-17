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
      dataTable: this.rawCoursesDataToTable(),
      addClassFormData: {
        className: "",
        startDate: "1/1/2001",
        numberOfStudents: 0,
      }
    }
  }

  rawCoursesDataToTable = () => {
    let rawData = this.props.coursesClass;
    if(!rawData) return {
      headerRow: [],
      dataRows: []
    }

    let headerRow = [];
    let dataRows = [];
    for (var key in rawData[0]) {
      headerRow.push(key)
    }
    headerRow.push("Action");
    for (var i in rawData) {
      dataRows.push(Object.values(rawData[i]));
    }
    return { headerRow: headerRow, dataRows: dataRows};
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
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }
    });
    var table = $('#datatables').DataTable();

    // Edit record
    table.on('click', '.edit', function () {
      var $tr = $(this).closest('tr');

      var data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
    });

    // Delete a record
    table.on('click', '.remove', function (e) {
      var $tr = $(this).closest('tr');
      table.row($tr).remove().draw();
      e.preventDefault();
    });

    //Like record
    table.on('click', '.like', function () {
      alert('You clicked on Like button');
    });
  }
  componentWillUnmount() {
    $('.data-table-wrapper')
      .find('table')
      .DataTable()
      .destroy(true);
  }
  // shouldComponentUpdate() {
  //     return true;
  // }
  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={1}></Col>
            <Col md={10}>
              <Card
                title="Danh sách lớp học"
                content={
                  <div className="fresh-datatables">
                    <table id="datatables" ref="main" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>{this.state.dataTable.headerRow[0]}</th>
                          <th>{this.state.dataTable.headerRow[1]}</th>
                          <th>{this.state.dataTable.headerRow[2]}</th>
                          {/* <th>{ dataTable.headerRow[3] }</th> */}
                          {/* <th>{ dataTable.headerRow[4] }</th> */}
                          <th className="disabled-sorting text-right">{this.state.dataTable.headerRow[3]}</th>
                        </tr>
                      </thead>
                      {/* <tfoot>
                                                <tr>
                                                    <th>{ dataTable.footerRow[0] }</th>
                                                    <th>{ dataTable.footerRow[1] }</th>
                                                    <th>{ dataTable.footerRow[2] }</th>
                                                    <th>{ dataTable.footerRow[3] }</th>
                                                    <th>{ dataTable.footerRow[4] }</th>
                                                    <th className="text-right">{ dataTable.footerRow[3] }</th>
                                                </tr>
                                            </tfoot> */}
                      <tbody>
                        {
                          this.state.dataTable.dataRows.map((prop, key) => {
                            return (
                              <tr key={key}>
                                {
                                  prop.map((prop, key) => {
                                    return (
                                      <td key={key}>{prop}</td>
                                    );
                                  })
                                }
                                <td className="text-right">
                                  {/* <a className="btn btn-simple btn-info btn-icon like"><i className="fa fa-heart"></i></a> */}
                                  <a className="btn btn-simple btn-warning btn-icon edit"><i className="fa fa-edit"></i></a>
                                  <a className="btn btn-simple btn-danger btn-icon remove"><i className="fa fa-times"></i></a>
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
          <Row>
            <Col md={11}>
              <Button className="pull-right" bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                <i className="pe-7s-add-user" style={glyphiconStyles}></i>
              </Button>
            </Col>
          </Row>
        </Grid>

        <Modal show={this.state.showAddModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm lớp mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup>
                <ControlLabel className="col-md-3">
                  Tên lớp
                                </ControlLabel>
                <Col md={9}>
                  <FormControl
                    placeholder="Tên lớp"
                    type="text"
                    value={this.state.addClassFormData.className}
                    onChange={this.handleInputNameChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <ControlLabel className="col-md-3">
                  Ngày bắt đầu
                                </ControlLabel>
                <Col md={9}>
                  <Datetime
                    timeFormat={false}
                    inputProps={{ placeholder: "Date Picker Here" }}
                    defaultValue={new Date()}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col md={9} mdOffset={3}>
                  <Button bsStyle="info" onClick={this.handleNewClassFormSubmit}>
                    Add
                                    </Button>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    coursesClass: state.coursesClass.coursesClass,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCoursesList: (updatedCourses) => dispatch(actions.updateCourses(updatedCourses))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageClass);
