import React, { Component } from 'react';
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

import callApi from '../../reduxStore/apiCaller';

class Invoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      invoiceList: [],
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

  componentDidMount() {
    callApi('invoices', 'GET', null).then(res => {
      this.setState({ invoiceList: res.data });
    })
  }
  onDelete = (id) => {
    callApi('invoices/' + id, 'DELETE', null).then(res => {
      callApi('invoices', 'GET', null).then(res => {
        this.setState({ invoiceList: res.data });
      })
    })
  }

  renderInvoiceModal = (invoice) => {
    return (
      <Modal show={this.state.showAddModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thông tin hóa đơn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card
              title={'Hóa đơn  ' + invoice.invoice_type.toString() +' số '+ invoice.id}
              content={
                <form>
                    <FormGroup>
                    <ControlLabel>
                    NGƯỜI NỘP	
                            </ControlLabel>
                    <FormControl
                      value={invoice.user.name}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>
                      NGÀY NỘP	
                            </ControlLabel>
                    <FormControl
                      value={invoice.paid_day}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>
                    SỐ TIỀN	
                            </ControlLabel>
                    <FormControl
                      value={invoice.fee}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>
                    GHI CHÚ	
                            </ControlLabel>
                    <FormControl
                      value={invoice.description}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>
                    LOẠI HÓA ĐƠN
                            </ControlLabel>
                    <FormControl
                      value={invoice.invoice_type}
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
      <Tooltip id="view">View Invoice</Tooltip>
    );
    const remove = (
      <Tooltip id="remove">Remove</Tooltip>
    );

    let invoiceModal = null;
    if(this.state.currentID) invoiceModal = this.renderInvoiceModal(this.state.invoiceList[this.state.currentID]);

    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
          <Col md={1}></Col>
          <Col md={11}>
              <Card
                title="Quản lý hóa đơn"
                category="Trung tâm ngoại ngữ Lê Xinh"
                tableFullWidth
                content={
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Người nộp</th>
                        <th className="text-center">Ngày nộp</th>
                        <th className="text-center">Số tiền</th>
                        <th className="text-center">Ghi chú</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.invoiceList.map((item, index) =>
                        <tr key={index}>
                          <td className="text-center">{item.id}</td>
                          <td className="text-center">{item.user.name}</td>
                          <td className="text-center">{item.paid_day}</td>
                          <td className="text-center">{item.fee}</td>
                          <td className="text-center">{item.description}</td>
                          <td className="td-actions text-right">
                            <OverlayTrigger placement="top" overlay={view}>
                              <Button simple bsStyle="info" bsSize="xs" onClick={() => this.handleShow(item.id)}>
                                <i className="fa fa-dollar"></i>
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

        {invoiceModal}
      </div>
    );
  }
}

export default Invoices;
