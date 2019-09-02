import React, { Component } from 'react'
import { Table, Row, Col, Input, Button, Container, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Delete from '@material-ui/icons/Delete'

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			totalPrice: 0,
			editOn: false,
			selectedProductId: "",
			selectedQuantity: null,
			loading: false

		}
	}

	fetchData = () => {
		var id = this.props.userData.userId;
		axios.get("http://localhost:4000/cart?user_id=" + id)
			.then(res => {
				this.props.count(res.data.length);
				console.log("count data", this.props.count(res.data.length))
				this.setState({
					products: res.data
				});
				this.calculateTotalPrice();
			})
	}

	componentDidMount = () => {
		if (this.props.userData.isLoggedIn && this.props.userData.userId !== "") {
			this.fetchData();
		} else {
			this.props.history.push("/login");
		}
	}

	calculateTotalPrice = () => {
		var totalPrice = 0;
		var tempArr = this.state.products.map(p => {
			return totalPrice += p.total_price * p.quantity;
		})
		totalPrice = tempArr[tempArr.length - 1];
		this.setState({
			totalPrice: totalPrice
		})
	}

	handleChange = (e, id) => {
		console.log("cart target", id)
		switch (e.target.name) {
			case "quantity":
				this.setState({
					selectedQuantity: e.target.value
				}, () => {
					this.updateQuantity(id);
				})
				break;
			default:
				break;
		}
	}
	updateQuantity = (id) => {
		let data = {
			quantity: this.state.selectedQuantity
		}
		axios.put("http://localhost:4000/cart?cart_id=" + id, data)
			.then(res => {
				this.fetchData();
			})
			.catch(err => {
				console.log("Err", err)
			})
	}

	handleDelete = (id) => {
		this.setState({ loading: true });
		axios.delete("http://localhost:4000/cart?cart_id=" + id)
			.then(res => {
				this.fetchData();
				this.setState({ loading: false });
			}
			)

			.catch(err => {
				console.log("Err", err)
			})
	}

	handleSuccess = () => {
		var userId = this.props.userData.userId;
		console.log("userId", userId)
		axios.delete("http://localhost:4000/placeorder?user_id=" + userId)
			.then(res => {
				window.location.replace('/success')
			})
			.catch(err => {
				console.log("Err", err)
			})

	}
	render() {
		const loading = this.state.loading;
		const product = this.state.products;
		const cartList = product.length ? (
			product.map(cart => {
				return (
					<tr key={cart.cart_id}>
						<td>{cart.product_id}</td>
						<td>{cart.product_name}</td>
						<td>
							<Input style={{ size: 1 }} value={cart.quantity}
								min={1} max={100} type="number" step="1"
								name="quantity"
								onChange={(e) => this.handleChange(e, cart.cart_id)} />
						</td>
						<td>Rs. {cart.total_price}</td>
						<td>
							{loading && this.state.editOn && this.selectedProductId === cart.product_id ? (<Spinner size="sm" color="primary" />
							) : (<Delete style={{ color: "rgb(155, 49, 49)", cursor: "pointer" }} onClick={() =>
								this.handleDelete(cart.cart_id)
							} />)
							}
						</td>
					</tr>
				)
			})
		) : (
				<tr>
					<td colSpan="4">No items found</td>
				</tr>
			);
		return (
			<Container>
				<Row>
					<div style={{ margin: 20 }}>
						<Button color="link" onClick={() => this.props.history.push('/')}>Go Back</Button>
					</div>
					<Col>
						<Row style={{ marginTop: 50 }}>

							<Col>
								<Table hover >
									<thead>
										<tr>
											<th>Product id</th>
											<th>Product Name</th>
											<th style={{ width: 100 }}>Quantity</th>
											<th>Price</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{cartList}
										<tr>
											<td></td>
											<td style={{ fontWeight: 550 }}>Total</td>
											<td></td>
											<td>Rs. {this.state.totalPrice}</td>
											<td></td>
										</tr>
									</tbody>
								</Table>
								<Row>
									<Col sm="10" ></Col>
									<Col>
										<Button color="success" onClick={this.handleSuccess}>Place Order</Button>
									</Col>
								</Row>
							</Col>
							<Col sm="1"></Col>
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		userData: state.userData
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		count: (noOfItemsInCart) =>
			dispatch({
				type: "COUNT_CART",
				noOfItemsInCart
			})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));