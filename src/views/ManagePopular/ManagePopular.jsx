import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net'
import { Link } from 'react-router-dom';
import $ from 'jquery';
import {
  Grid, Row, Col, Modal, Button, OverlayTrigger, Form, FormControl, FormGroup, ControlLabel, Checkbox
} from 'react-bootstrap';

import { connect } from 'react-redux';  
import * as actions from '../../reduxStore/actions/actionsIndex';
import Card from 'components/Card/Card.jsx';

// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

const glyphiconStyles = {
  fontSize: "30px"
}
class ManagePopular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddModal: false,
            dataTable: this.rawCoursesDataToTable(),
            addDepartFormData: {
                CourseName: "",
                TeacherName: "",
                TeacherPic: "",
                SingleDes: ""
            }
        };
    }

    rawCoursesDataToTable = () => {
      let rawData = this.props.courses;
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
      console.log(headerRow);
      console.log(dataRows)
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
        newState.addDepartFormData = { ...this.state.addDepartFormData };
        newState.addDepartFormData.CourseName = event.target.value;
        this.setState(newState);
    }

    handleInputTeacherNameChange = (event) => {
        let newState = { ...this.state };
        newState.addDepartFormData = { ...this.state.addDepartFormData };
        newState.addDepartFormData.TeacherName = event.target.value;
        this.setState(newState);
    }

    handleInputTeacherPicChange = (event) => {
        let newState = { ...this.state };
        newState.addDepartFormData = { ...this.state.addDepartFormData };
        newState.addDepartFormData.TeacherPic = event.target.value;
        this.setState(newState);
    }
    handleInputSingleDesChange = (event) => {
        let newState = { ...this.state };
        newState.addDepartFormData = { ...this.state.addDepartFormData };
        newState.addDepartFormData.SingleDes = event.target.value;
        this.setState(newState);
    }


    handleNewDepartFormSubmit = () => {
        let data = { ...this.state.addDepartFormData };
        let newRow = [];
        for (var key in data) {
            newRow.push(data[key]);
        }
        let updatedDataTable = { ...this.state.dataTable };
        updatedDataTable.dataRows.push(newRow);

        let oldCoursesData = this.props.courses;
        console.log(oldCoursesData )
        oldCoursesData.push(this.state.addDepartFormData);
        this.props.updateCourses(oldCoursesData);
        this.resetFormData();
        this.handleClose();
    }

    resetFormData = () => {
        this.setState({
            addDepartFormData: {
                CourseName: "",
                TeacherName:"",
                TeacherPic: "",
                SingleDes: "",
            }
        })
    }


    componentDidMount() {
        $("#datatables").DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            responsive: true,
            search: {
                search: "",
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

        table.columns().every( function () {
          var that = this.search;
          $( 'input', this.footer() ).on( 'keyup change', function () {
              if ( that.search() !== this.value ) {
                  that
                      .search( this.value )
                      .draw();
              }
          } );
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
                <Link to="/homepage">Check</Link>
                    <Row>
                        <Col md={1}></Col>
                        <Col md={10}>
                            <Card
                                title="Popular course management"
                                content={
                                    <div className="fresh-datatables">
                                        <table id="datatables" ref="main" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>{this.state.dataTable.headerRow[0]}</th>
                                                    <th>{this.state.dataTable.headerRow[1]}</th>
                                                    <th>{this.state.dataTable.headerRow[2]}</th>
                                                    <th>{this.state.dataTable.headerRow[3]}</th>
                                                    <th>{this.state.dataTable.headerRow[4]}</th>
                                                    {/* <th>{ dataTable.headerRow[4] }</th> */}
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
                        <Modal.Title>Add new course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <ControlLabel className="col-md-3">
                                    Course name
                            </ControlLabel>
                                <Col md={9}>
                                    <FormControl
                                        placeholder="Course name"
                                        type="text"
                                        value={this.state.addDepartFormData.CourseName}
                                        onChange={this.handleInputNameChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel className="col-md-3">
                                    Teacher Name
                            </ControlLabel>
                                <Col md={9}>
                                    <FormControl
                                        placeholder="Teacher name"
                                        type="text"
                                        value={this.state.addDepartFormData.TeacherName}
                                        onChange={this.handleInputTeacherNameChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel className="col-md-3">
                                    Teacher Picture
                            </ControlLabel>
                                <Col md={9}>
                                    <FormControl
                                        placeholder="Teacher name"
                                        type="text"
                                        value={this.state.addDepartFormData.TeacherPic}
                                        onChange={this.handleInputTeacherPicChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel className="col-md-3">
                                    Single course Description
                            </ControlLabel>
                                <Col md={9}>
                                    <FormControl
                                        placeholder="Single course description"
                                        type="text"
                                        value={this.state.addDepartFormData.SingleDes}
                                        onChange={this.handleInputSingleDesChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={9} mdOffset={3}>
                                    <Button bsStyle="info" onClick={this.handleNewDepartFormSubmit}>
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
    courses: state.homepage.courses,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCourses: (updatedCourses) => dispatch(actions.updateCourses(updatedCourses))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePopular);

