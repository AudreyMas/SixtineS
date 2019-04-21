import React, { Component } from 'react';
import './index.scss';
import home from '../../assets/home.svg';

import { Link } from "react-router-dom";



class AdminMenu extends Component {

  render() {
    return (
      <div>
        <div className="admin_button_container_general">
          <div className="admin_container_txt">
            <h1>
              Administration
            </h1>
            <Link to="/" className="login-menu" type="submit"><img src={home} className="login" alt="order" /></Link>

          </div>
         
          <div className="admin_button_container">
            
            <div>
              <Link to="/admin/all-invoices" className="admin_button" type="submit">All Invoices</Link>
            </div>
            <div>
              <Link to="/admin/all-orders" className="admin_button" type="submit">All Orders</Link>
            </div>
            <div>
              <Link to="/admin/add-sales" className="admin_button " type="submit">Add Seller</Link>
            </div>
            <div>
              <Link to="/admin/add-product" className="admin_button" type="submit">Add Product</Link>
            </div>
            <div>
              <Link to="/admin/manage-stock" className="admin_button" type="submit">Manage Stock</Link>
            </div>
          </div>

        </div>

      </div>
    )
  }
}
export default AdminMenu;