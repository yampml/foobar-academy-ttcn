import React, { Component } from 'react';
import {
  Grid, Row, Col,
  FormGroup, ControlLabel, FormControl, Form, Alert
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../reduxStore/actions/actionsIndex';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';
import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        email: {
          value: '',
        },
        password: {
          value: '',
        },
      },
    }
  }

  handleChange = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value
      }
    }
    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={4} sm={6} mdOffset={4} smOffset={3}>
            <form onSubmit={this.submitHandler}>
              <Card
                textCenter
                title="Login"
                content={
                  <div>
                    <FormGroup>
                      { this.props.error ? <Alert bsStyle="warning">
                        <strong>Holy guacamole!</strong> Best check yo self, you're not looking too
                        good.
                      </Alert> : null}
                      <ControlLabel>
                        Email addressz
                      </ControlLabel>
                      <FormControl
                        placeholder="Enter email"
                        type="email"
                        value={this.state.controls.email.value}
                        onChange={(event) => this.handleChange(event, "email")}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>
                        Password
                                            </ControlLabel>
                      <FormControl
                        placeholder="Password"
                        type="password"
                        value={this.state.controls.password.value}
                        onChange={(event) => this.handleChange(event, "password")}
                      />
                    </FormGroup>
                  </div>
                }
                legend={
                  <div>
                    <Button type="submit" bsStyle="info" fill wd>
                      Login
                    </Button>
                  </div>
                }
                ftTextCenter
              />
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
