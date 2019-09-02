import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import Success from './components/Success'
import { connect } from "react-redux";

class Routes extends React.Component {

  componentDidMount = () => {
    var userId = localStorage.getItem("userId")
    if (userId !== null) {
      this.props.setLogin(userId)
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <ProductList />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/cart" render={() => <Cart />} />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route exact path="/success" render={() => <Success />} />
        </Switch>
      </BrowserRouter>
    )
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
export default connect(null, mapDispatchToProps)(Routes);