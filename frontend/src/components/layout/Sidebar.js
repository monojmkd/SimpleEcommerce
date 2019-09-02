import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from 'react-redux';

class Sidebar extends Component {
    render() {
        return (
            <ListGroup>
                <ListGroupItem>
                    <Button color="link" onClick={() => this.props.changeCategory("all")}>All</Button>
                </ListGroupItem>
                <ListGroupItem>
                    <Button color="link" onClick={() => this.props.changeCategory("laptop")}>Laptop</Button>
                </ListGroupItem>
                <ListGroupItem>
                    <Button color="link" onClick={() => this.props.changeCategory("mobile")}>Mobile</Button>
                </ListGroupItem>
                <ListGroupItem>
                    <Button color="link" onClick={() => this.props.changeCategory("books")}>Books</Button>
                </ListGroupItem>
            </ListGroup>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCategory: (category) => dispatch({
            type: "CHANGE_CATEGORY",
            category
        })
    }
}

export default connect(null, mapDispatchToProps)(Sidebar);
