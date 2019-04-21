import React, { Component } from 'react';
import './index.scss';
import { Link } from 'react-router-dom'
import RecentOrder from '../RecentOrder/index'
import Old4MonthOrder from '../Old4MonthOrder/index';
import BillNotPayDisplay from '../BillNotPayDisplay/index';
import TotalSales from '../TotalSales/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { totalSold, totalUnitSell, oldOrder, recentOrders, billUnpaid } from '../../actions/index';
import Header from '../header/index';

class AgentHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
      this.props.totalSold();
      this.props.totalUnitSell();
      this.props.oldOrder();
      this.props.recentOrders();
      this.props.billUnpaid();
    
  }

  render() {
    return (
      <div className="container">
      <Header location={this.props.location.pathname} />
        <div className="deux-buttons">
          <Link to="/search-shop" className="buttons"> New Order</Link>
          <Link to="/create-profile" className="buttons">New Client</Link>
        </div>
        <TotalSales />
        <div className="container_recall_recent_unpaid">
          <Old4MonthOrder />
          <BillNotPayDisplay />
          <RecentOrder />
        </div>


      </div>
    )
  }
}

const mapStateToProps = state => ({
  state: state.getSellerPage
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ oldOrder, totalUnitSell, totalSold, recentOrders, billUnpaid }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AgentHomePage);