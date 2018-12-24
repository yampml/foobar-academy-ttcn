import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    Grid, Row, Col, Modal, Form, FormControl, FormGroup, ControlLabel, Checkbox, ButtonToolbar
} from 'react-bootstrap';

import CustomButton from "elements/CustomButton/CustomButton.jsx";

import { connect } from 'react-redux';
import * as actions from '../../reduxStore/actions/actionsIndex';
import Card from 'components/Card/Card.jsx';

class ManageCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            danhsach: [
                {
                    id: 1,
                    ten: "IELTS 5.0",
                    hocPhi: 690000,
                    thoiGianHoc: 2
                },
                {
                    id: 2,
                    ten: "IELTS 2.0",
                    hocPhi: 6920000,
                    thoiGianHoc: 2
                },
                {
                    id: 3,
                    ten: "IELTS 4.0",
                    hocPhi: 6930000,
                    thoiGianHoc: 2
                },
              ]

        };
    }

    render() {

        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col mdOffset={ 8 } md={ 3 }>
                            <ButtonToolbar>
                                <CustomButton bsStyle="primary" >
                                    Tìm kiếm
                                </CustomButton>
                                <CustomButton bsStyle="success">
                                    Thêm mới
                                </CustomButton>
                                <CustomButton bsStyle="info">
                                    Làm gì đó!?
                                </CustomButton>
                            </ButtonToolbar>
                        </Col>
                    </Row>

                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);

