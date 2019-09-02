import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import { Form, FormGroup, Row, Col, Input, Button, InputGroup } from 'reactstrap'


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errorMsg: "",
			showSignup: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		axios.defaults.baseURL = "http://localhost:4000";
	}

	componentDidMount = () => {

		if (this.props.userData.isLoggedIn) {
			this.props.history.replace("/");
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		var data = {
			email: this.state.email,
			password: this.state.password
		};

		axios
			.post("/login", data)
			.then(res => {
				if (res.data.success && res.data.user_id) {
					this.props.setLogin(res.data.user_id);
					this.props.history.replace("/")
				} else {
					this.setState({
						errorMsg: "Incorrect username/password !"
					}, () => {

						setTimeout(() => {
							this.setState({
								errorMsg: ''
							})
						}, 5000)
					});
				}
			})
			.catch(error => {
				this.setState({
					errorMsg: "API Error!"
				});
			});
	};

	handleChange = e => {
		switch (e.target.name) {
			case "email":
				this.setState({
					email: e.target.value
				});
				break;
			case "password":
				this.setState({
					password: e.target.value
				});
				break;
			default:
				break;
		}
	};

	handleSignup = e => {
		this.setState({
			...this.state,
			showSignup: true
		})
	}
	render() {
		return (
			<Form onSubmit={this.handleSubmit} style={{ margin: 50 }}>
				<Row>
					<Col sm="4"></Col>
					<Col sm="4" style={{ padding: 25, backgroundColor: "#fff", borderRadius: 5, border: "1px solid rgba(0,0,0,0.4)", boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.3)" }}>
						<Row>
							<Col sm="12">
								<h4 style={{ textAlign: "center", marginTop: 10, fontWeight: 510 }}> Sign in </h4> <span style={{ color: "red" }}> {this.state.errorMsg} </span>
							</Col>
							<Col sm="12">
								<FormGroup style={{ marginTop: 10 }}>
									<Input style={{ height: 55, fontSize: "18px" }}
										type="text"
										placeholder="Email"
										name="email"
										value={this.state.email}
										onChange={this.handleChange}
									/>
								</FormGroup>
							</Col>
							<Col sm="12">
								<FormGroup style={{ marginTop: 10, border: "1px solid #ced4da", borderRadius: 5 }}>
									<InputGroup>
										<Input style={{ height: 55, fontSize: "18px", border: "none" }}
											type="password"
											id="password"
											placeholder="Password"
											name="password"
											value={this.state.password}
											onChange={this.handleChange}
										/>
									</InputGroup>
								</FormGroup>
							</Col>
							<Col sm="12" style={{ margin: 20 }}>
								<Row>
									<Col sm="4">
										<Button onClick={() => this.props.history.replace("/signup")} color="link"> Sign Up </Button>
									</Col>
									<Col sm="3"></Col>
									<Col sm="4">
										<FormGroup >
											<Button color="success" type="submit"> Login </Button>
										</FormGroup>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
					<Col sm="4"></Col>
				</Row>
			</Form>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userData: state.userData
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setLogin: (userId) =>
			dispatch({
				type: "CHANGE_USER_LOGGEDIN",
				userId
			})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
