import React, { Component } from 'react'
import axios from 'axios';
import { Row, Col, Container, Media, Button } from 'reactstrap'
import Laptop from '../img/laptop.jpg'
import Mobile from '../img/mobile.jpg'
import Book from '../img/book.jpg'
import { connect } from "react-redux"
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

class ProductDetails extends Component {
	state = {
		product: [],
		btn: "Add to Cart"
	}
	componentDidMount() {
		console.log("Product details id", this.props.productId)
		const id = this.props.productId;
		axios.get("http://localhost:4000/products?product_id=" + id)
			.then(res => {
				this.setState({
					product: res.data
				});
			})
	}
	handleAddToCart = (productId, price) => {
		console.log("userid", this.props.userData.userId)
		var data = {
			productId,
			userId: parseInt(this.props.userData.userId),
			quantity: 1,
			totalPrice: price
		}
		axios.post("http://localhost:4000/cart", data)
			.then(res => {
				this.setState({
					btn: "Added"
				})
			})
			.catch(function (error) {
				console.log("found errors", error)
			})
	}
	handleImage = (img) => {
		if (img === "laptop") {
			return Laptop;
		} else if (img === "mobile") {
			return Mobile;
		} else if (img === "books") {
			return Book;
		}
	}

	render() {
		const product = this.state.product;
		console.log("products", product)
		return (
			<Container>
				<Row >
					<div>
						<Button color="link" onClick={this.props.showProductsView}>Go Back</Button>
					</div>
					<Col sm="6" style={{ marginTop: 50 }}>
						<Col >
							<h4 style={{ color: "black", paddingLeft: 70 }}>{product.product_name}</h4>
							<Media>
								<Media style={{ width: "80%", height: 'auto', marginTop: 10 }} src={this.handleImage(product.category)} alt="product_image" />
							</Media>
						</Col>
					</Col>
					<Col style={{ marginTop: 50 }}>
						<Col >
							<h5>{product.product_info}</h5>
							<h6 style={{ marginTop: 30, textAlign: "left", fontWeight: 600 }}>Price : Rs {product.price}</h6>
							<Row>
								<Col>
									<IconButton color="primary" style={{ margin: 10 }}>
										<AddShoppingCartIcon onClick={() => this.handleAddToCart(product.product_id, product.price)} />
									</IconButton>
								</Col>
							</Row>
						</Col>
					</Col>
				</Row>
			</Container>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		userData: state.userData
	}
}
export default connect(mapStateToProps, null)(ProductDetails);