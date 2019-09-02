import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {
  Row, Col, Card, CardImg, CardGroup,
  CardBody, Button
} from 'reactstrap'
import Sidebar from './layout/Sidebar';
import { connect } from "react-redux"
import Laptop from '../img/laptop.jpg'
import Mobile from '../img/mobile.jpg'
import Book from '../img/book.jpg'
import ProductDetails from '../components/ProductDetails'
import Carousel from './layout/Carousel'


class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProductDetails: false,
      selectedProductId: null,
      btn: "Add to Cart"
    }
  }

  componentDidMount() {
    axios.get("http://localhost:4000/products")
      .then(res => {
        this.props.fetchData(res.data);
      })
      .catch(function (error) {
        console.log("found errors", error)
      })

  }

  showProductsView = () => {
    this.setState({
      showProductDetails: false,
      selectedProductId: null,
    })
  }

  handleProductDetails = (productId) => {
    this.setState({
      selectedProductId: productId,
      showProductDetails: true
    })
  }

  handleAddToCart = (productId, price) => {
    var data = {
      productId,
      userId: parseInt(this.props.userData.userId),
      quantity: 1,
      totalPrice: price
    }
    axios.post("http://localhost:4000/cart", data)
      .then(res => {
        var id = this.props.userData.userId;
        axios.get("http://localhost:4000/cart?user_id=" + id)
          .then(res => {
            this.props.count(res.data.length);
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
    const products = this.props.userData.productList;
    const productList = products.length ? (
      products.map(product => {
        return (
          <Col key={product.product_id} sm="3" style={{ margin: 10 }}>
            <CardGroup>
              <Card style={{ paddingTop: 20, cursor: "pointer" }} onClick={() => this.handleProductDetails(product.product_id)}>
                <CardImg style={{ height: 150, width: "auto" }} top width="100%" src={this.handleImage(product.category)} alt="Card image" />
                <CardBody style={{ paddingTop: 7 }}>
                  <Row>
                    <Col sm="12" style={{}}>
                      <Button color="link" style={{ fontSize: 15, fontWeight: 550, color: "black", textAlign: "center" }}>{product.product_name}</Button>
                    </Col>
                    <Col sm="12">
                      <div style={{ fontSize: 14, textAlign: "center" }}>Rs. {product.price}</div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </CardGroup>
            <Button color="info" style={{ fontSize: 13, width: "100%" }} onClick={() => this.handleAddToCart(product.product_id, product.price)}>
              Add to Cart
              </Button>
          </Col>
        )
      })
    ) : (
        <Col>
          <div className="center">No products to show</div>
        </Col>
      );

    return (
      <Row style={{ marginTop: 10 }}>
        <Col sm="1"></Col>
        {
          this.state.showProductDetails ? (
            <ProductDetails productId={this.state.selectedProductId} showProductsView={this.showProductsView} />
          ) : (
              <Fragment>
                <Col sm="2">
                  <h5 style={{ textAlign: "center", padding: 10 }}>Category</h5>
                  <Sidebar />
                </Col >
                <Col sm="9">
                  <Row>
                    <Col style={{ marginLeft: 7, marginRight: 35 }}>
                      <Carousel />
                    </Col>
                    <Col sm="2">
                    </Col>
                  </Row>
                  <Row>
                    {productList}
                  </Row>
                </Col>
              </Fragment>
            )
        }
        <Col>
        </Col>
      </Row >
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
    fetchData: (payload) => dispatch({
      type: "GET_PRODUCTS",
      payload
    }),
    count: (noOfItemsInCart) =>
      dispatch({
        type: "COUNT_CART",
        noOfItemsInCart
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList));