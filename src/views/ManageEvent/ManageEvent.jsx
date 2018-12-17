import React, { Component } from 'react';
// jQuery plugin - used for DataTables.net'
import { Link } from 'react-router-dom';
import $ from 'jquery';
import {
  Grid, Row, Col, Modal, Button, Form, FormControl, FormGroup, ControlLabel,
} from 'react-bootstrap';

import { connect } from 'react-redux';  
import * as actions from '../../reduxStore/actions/actionsIndex';
import Card from 'components/Card/Card.jsx';

require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

const glyphiconStyles = {
  fontSize: "30px"
}
class ManageEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddModal: false,
            dataTable: this.rawEventDataToTable(),
            addEventFormData: {
                EventName: "",
                EventPic: "",
                EventDes: "",
                InitDay: ""
            }
        };
    }

    rawEventDataToTable = () => {
      let rawData = this.props.events;
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
        newState.addEventFormData = { ...this.state.addEventFormData };
        newState.addEventFormData.EventName = event.target.value;
        this.setState(newState);
    }

    handleInputEventPicChange = (event) => {
        let newState = { ...this.state };
        newState.addEventFormData = { ...this.state.addEventFormData };
        newState.addEventFormData.EventPic = event.target.value;
        this.setState(newState);
    }

    handleInputEventDesChange = (event) => {
        let newState = { ...this.state };
        newState.addEventFormData = { ...this.state.addEventFormData };
        newState.addEventFormData.EventDes = event.target.value;
        this.setState(newState);
    }
    handleInputInitDayChange = (event) => {
        let newState = { ...this.state };
        newState.addEventFormData = { ...this.state.addEventFormData };
        newState.addEventFormData.InitDay = event.target.value;
        this.setState(newState);
    }


    handleNewEventFormSubmit = () => {
        let data = { ...this.state.addEventFormData };
        let newRow = [];
        for (var key in data) {
            newRow.push(data[key]);
        }
        let updatedDataTable = { ...this.state.dataTable };
        updatedDataTable.dataRows.push(newRow);

        let oldCoursesData = this.props.courses;
        console.log(oldCoursesData )
        oldCoursesData.push(this.state.addEventFormData);
        this.props.updateEvents(oldCoursesData);
        this.resetFormData();
        this.handleClose();
    }

    resetFormData = () => {
        this.setState({
            addEventFormData: {
              EventName: "",
              EventPic: "",
              EventDes: "",
              InitDay: ""
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
        } );
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
                                title="Events management"
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
                        <Modal.Title>Add new event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <ControlLabel className="col-md-3">
                                    Event name
                            </ControlLabel>
                                <Col md={9}>
                                    <FormControl
                                        placeholder="Event name"
                                        type="text"
                                        value={this.state.addEventFormData.EventName}
                                        onChange={this.handleInputNameChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel className="col-md-3">
                                    Event Picture
                            </ControlLabel>
                                <Col md={9}>
                                    <FormControl
                                        placeholder="Event picture"
                                        type="text"
                                        value={this.state.addEventFormData.EventPic}
                                        onChange={this.handleInputEventPicChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel className="col-md-3">
                                    Description
                            </ControlLabel>
                                <Col md={9}>
                                    <FormControl
                                        placeholder="Some thing...."
                                        type="text"
                                        value={this.state.addEventFormData.EventDes}
                                        onChange={this.handleInputEventDesChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel className="col-md-3">
                                    Initial day
                            </ControlLabel>
                                <Col md={9}>
                                    <FormControl
                                        placeholder="Single course description"
                                        type="text"
                                        value={this.state.addEventFormData.InitDay}
                                        onChange={this.handleInputInitDayChange}
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
    events: state.homepage.events,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateEvents: (updatedEvents) => dispatch(actions.updateEvents(updatedEvents))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageEvent);

