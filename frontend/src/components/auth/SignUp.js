import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      password: '',
      gender: '',
      category: '',
      showLogin: false,
      firstNameErr: '',
      lastNameErr: '',
      emailErr: '',
      contactErr: '',
      passwordErr: '',
      
    };
    axios.defaults.baseURL = "http://localhost:4000";

  }

  componentDidMount = () => {
    if (this.props.userData.isLoggedIn) {
      this.props.history.replace("/");
    }
  }

  handleValidation = () => {
    let firstNameErr = "";
    let lastNameErr = "";
    let contactErr = "";
    let passwordErr = "";

    if (this.state.firstName.length === 0) {
      firstNameErr = "empty field"

    }
    if (this.state.lastName.length === 0) {
      lastNameErr = "empty field"

    }
    if (this.state.contact.length === 0) {
      contactErr = "empty field";

    }
    if (this.state.password.length === 0) {
      passwordErr = "empty field";

    }
    if (firstNameErr || lastNameErr || contactErr || passwordErr) {
      this.setState({
        firstNameErr,
        lastNameErr,
        contactErr,
        passwordErr
      })
      return false;
    }
    return true;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.handleValidation();

    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      contact: this.state.contact,
      password: this.state.password,
      gender: this.state.gender,
      
    }

    if (isValid) {
      axios.post("/users", data)
        .then(function (res) {
          window.location.replace("/")
        })
        .catch(function (error) {
        })
      setTimeout(
        alert("Account Created"), 3000);
    }
    else {
      console.log("Showing")
    }
  }


  handleChange = (e) => {
    switch (e.target.name) {
      case "firstName":
        this.setState({
          firstName: e.target.value
        })
        break;

      case "lastName":
        this.setState({
          lastName: e.target.value
        })
        break;

      case "email":
        this.setState({
          email: e.target.value
        })
        break;

      case "contact":
        this.setState({
          contact: e.target.value
        })
        break;

      case "password":
        this.setState({
          password: e.target.value
        })
        break;

      case "gender":
        this.setState({
          gender: e.target.value
        })
        break;

      case "category":
        this.setState({
          category: e.target.value
        })
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <Container style={{margin:50, paddingLeft:150}}>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col sm="2"></Col>
            <Col sm="8" style={{ padding: 25, backgroundColor: "#fff", borderRadius: 5, border: "1px solid rgba(0,0,0,0.4)", boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.3)" }}>
              <Row>
                <Col sm="12">
                  <h4 style={{ textAlign: "center", marginTop: 10 }}> Create Account </h4>
                   <span style={{ color: "rgb(243, 83, 83)" }}> {this.state.errorMsg} </span>
                </Col>
                <Col>
                  <FormGroup style={{ margin: 7 }}>
                    <Input
                      minLength={1}
                      type="text"
                      value={this.state.firstName}
                      placeholder="First Name"
                      name="firstName"
                      onChange={this.handleChange}
                    />
                    <small style={{ color: "rgb(243, 83, 83)" }}>{this.state.firstNameErr}</small>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup style={{ margin: 7 }}>
                    <Input
                      type="text"
                      value={this.state.lastName}
                      placeholder="Last Name"
                      name="lastName"
                      onChange={this.handleChange}
                    />
                    <small style={{ color: "rgb(243, 83, 83)" }}>{this.state.lastNameErr}</small>
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup style={{ margin: 7 }}>
                    <Input
                      type="email"
                      value={this.state.email}
                      placeholder="E-Mail"
                      name="email"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" >
                  <FormGroup style={{ margin: 7 }}>
                    <Input
                      type="text"
                      value={this.state.contact}
                      placeholder="Contact"
                      name="contact"
                      onChange={this.handleChange}
                    />
                    <small style={{ color: "rgb(243, 83, 83)" }}>{this.state.contactErr}</small>
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup style={{ margin: 7 }}>
                    <Input
                      type="select"
                      value={this.state.gender}
                      name="gender"
                      onChange={this.handleChange}
                    >
                      <option>Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup style={{ margin: 7 }}>
                    <Input
                      type="password"
                      value={this.state.password}
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                    />
                    <small style={{ color: "rgb(243, 83, 83)" }}>{this.state.passwordErr}</small>
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <Row>
                    <Col sm="4">
                      <Button style={{ margin: 8 }} color="link" onClick={() => this.props.history.replace("/login")}> Login </Button>
                    </Col>
                    <Col sm="4"></Col>
                    <Col sm="4">
                      <FormGroup style={{ margin: 8 }}>
                        <Button color="secondary" type="submit">Create Account</Button>
                        {/* <small>Already have an account?</small> */}
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col sm="2"></Col>
          </Row>
        </Form>
      </Container >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  }
}

export default connect(mapStateToProps, null)(withRouter(SignUp));
