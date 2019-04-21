import React, { Component } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { totalSold, saveResumeSell } from '../../actions/index';
import { bindActionCreators } from 'redux';
import TotalSales from '../TotalSales/index';
import { Link } from "react-router-dom";
import home from '../../assets/home.svg';


class ResumeSell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOrders: [],
      getTotal: [],
    }
  }

  componentDidMount() {
    if (this.props.state === null) {
      this.props.saveResumeSell();
      this.props.totalSold();
    } else {
      this.setState({
        listOrders: this.props.state,
        getTotal: this.props.state
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.state !== this.props.state) {
      this.setState({ listOrders: this.props.state })
    }
  }

  render() {
    const orders = this.state.listOrders.map((elem, index) => {

      return <li key={index} className="resume">
        <ul className="resume-sell">
          <li className="resume-sell-li"><span>Country : </span>
            {elem.country}
          </li>
          <li className="resume-sell-li"><span>Order ID : </span>
            {elem.id}
          </li>
          <li className="resume-sell-li"><span>Shop Name : </span>
            {elem.name_shop}
          </li>
          <li className="resume-sell-li"><span>Total sales : </span>
            {elem.price_total}€ 
          </li>
          <li className="resume-sell-li"><span>Order Date : </span>
            {elem.date.slice(0, 10)}
          </li>
        </ul>
      </li>
    })
    return (
      <div id="page-resumeSell">
        <Link to="/admin" className="all-order" type="submit"><img src={home} className="login" alt="order" /></Link>

        <h1 className="page-resumeSell-title"> Total Orders</h1>

        <button className="button-submit-sell">Download</button>
        <div className="table-sell">
          <ul className="table-sell-ul" >
            <li className="table-sell-ul-li">Country</li>
            <li className="table-sell-ul-li">Order ID</li>
            <li className="table-sell-ul-li">Shop Name</li>
            <li className="table-sell-ul-li">Total sales</li>
            <li className="table-sell-ul-li">Order Date</li>
          </ul>

          <ul className="list-sell">
            {orders}
          </ul>
          <TotalSales />
        </div>
        <button className="button-submit-sell">Download</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state: state.getResumeSell.listOrders
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ saveResumeSell, totalSold }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ResumeSell);