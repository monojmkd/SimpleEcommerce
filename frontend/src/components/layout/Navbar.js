import React from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav, Button, Badge, Collapse,
  NavbarToggler, NavItem
} from 'reactstrap'
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import axios from 'axios'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount = () => {
    this.showCartCount();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.userData.userId !== this.props.userData.userId) {
      this.showCartCount();
    }
  }

  handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.replace("/");
  }

  showCartCount = () => {
    var id = this.props.userData.userId;
    axios.get("http://localhost:4000/cart?user_id=" + id)
      .then(res => {
        // console.log("res", res)
        this.props.count(res.data.length);
      })
  }

  render() {
    return (
      <Navbar style={{ display: "flex", padding: 5, backgroundColor: "rgb(12, 26, 47)", color: "white", overflow: "hidden" }} light expand="sm" >
        <NavbarBrand href="/" >
          <h5 style={{
            border: "1px solid white", marginLeft: 50,
            marginTop: 10, background: "313c398c ", borderRadius: 7, font: "italic bold 12px/30px Georgia, sans-serif", wordSpacing: "10px", textShadow: "2px 4px #635614", fontWeight: 550, fontSize: 28, color: "white"
          }} >  Refined.buys  </h5>
        </NavbarBrand>
        <NavbarToggler style={{ backgroundColor: "white" }} onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          {
            this.props.location.pathname === "/login" || this.props.location.pathname === "/signup" ? null : (
              <Nav className="ml-auto" navbar >
                {
                  this.props.userData.isLoggedIn ? (
                    <NavItem style={{ padding: 10 }}>
                      <Button color="light" style={{ paddingRight: 14 }} onClick={this.handleLogout}>Logout</Button>
                    </NavItem>
                  ) : (
                      <NavItem style={{ padding: 10 }}>
                        <NavLink to="/login" style={{ color: "white", paddingRight: 14 }}>Login</NavLink>
                      </NavItem>
                    )
                }
                <NavItem style={{ padding: 5, paddingRight: 80, margin: 10 }}>
                  <NavLink to="/cart">
                    <ShoppingCart
                      style={{
                        color: "white",
                        transition: "all 0.5s ease-in-out"
                      }}
                    />
                    <Badge>{this.props.userData.noOfItemsInCart}</Badge>
                  </NavLink>
                </NavItem>
              </Nav>
            )
          }
        </Collapse>
      </Navbar >

    );
  }
}

const mapStateToProps = (state) => {
  // console.log("sate in nav", state);
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
