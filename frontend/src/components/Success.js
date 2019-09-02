import React, { Component } from 'react'
import { Row, Col, Container, Button } from 'reactstrap'

class Success extends Component {
	render() {
		return (
			<Container>
				<Row style={{ margin: 100, alignContent: "center", overflow: "hidden" }}>
					<Col sm="12">
						<h3 style={{ textAlign: "center" }}>Thank you for your purchase.</h3>
					</Col>
					<Col sm="12">
						<Row>
							<Col sm="4"></Col>
							<Col sm="4" >
								<Button color="success" style={{ margin: 30 }} onClick={() => window.location.replace('/')}>Continue Shopping</Button>
							</Col>
							<Col sm="4"></Col>
						</Row>
					</Col>
				</Row>
			</Container>
		)
	}
}
export default Success;