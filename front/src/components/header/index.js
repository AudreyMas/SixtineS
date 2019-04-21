import React, { Component } from 'react';
import './index.css';
import logo from './assets/logo.png';


class Header extends Component {
  render() {
    return (

        <div className = "header_container">
          <div>
            <img className="header_logo" src={logo} alt="logo"></img>
          </div>
          <div>
            <h3>
              {this.props.location === "/" && <p>Login for Customers</p>}
              {this.props.location === "/sales" && <p>Login for Sales</p>}
              {this.props.location === "/agent-homepage" && <p>Sales Homepage</p>}
              {this.props.location === "/shop-homepage" && <p>Shop Homepage</p>}
              {this.props.location === "/create-profile" && <p>Profile Creation</p>}
              {this.props.location === "/outdated-orders" && <p>Outdated Order List</p>}
              {this.props.location === "/search-shop" && <p>Search Shop</p>}
              {this.props.location === "/new-order" && <p>Create New Order</p>}
              {this.props.location === "/resume-order" && <p>Resume of your order</p>}
              {this.props.location === "/unpaid-bills" && <p>Unpaid bills</p>}
              {this.props.location === "/old-orders-list" && <p>Old order list</p>}
              {this.props.location === "/bill-not-paid" && <p>bill(s) not paid</p>}
              {this.props.location === "/direct-order" && <p>Direct order</p>}

            </h3>
          </div>
        </div>
    );
  }
}

export default Header;