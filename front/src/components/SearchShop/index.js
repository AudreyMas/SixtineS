import React, { Component } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { searchShops, saveIdShop } from '../../actions/index';
import { bindActionCreators } from 'redux';
import Header from '../header/index';


class SearchShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopList: [],
      filteredShopList: [],
      newlist: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.state === undefined) {
      this.props.searchShops()
    } else {
      this.setState({ shopList: this.props.state })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.state !== this.props.state) {
      this.setState({
        shopList: this.props.state
      })
    }
    if (prevState.shopList !== this.state.shopList) {
      this.setState({
        filteredShopList: this.state.shopList
      })
    }
  }

  handleChange(e) {

    const value = e.target.value.toLowerCase();
    const newlist = this.state.shopList.filter((elem) => {
      return elem.name_shop.toLowerCase().includes(value)
    })
    this.setState({
      filteredShopList: newlist
    });
  }

  handleClick(event) {
    const id = event.currentTarget.getAttribute('id');
    this.props.saveIdShop(this.state.filteredShopList[id])
    this.props.history.push('/shop-homepage')
  }

  render() {
    let _shopList = this.state.filteredShopList.map((el, index) => (
      <li key={index}>
        <ul className="infos-shop" onClick={(event) => this.handleClick(event)} id={index}>
          <li className="num"> <span>N° : </span>{el.id}</li>
          <li><span>Name shop : </span> {el.name_shop}</li>
          <li><span>Company name :</span>{el.company_name}</li>
          <li> <span>Phone : </span>{el.phone}</li>
          <li className="lg"><span>Language :</span>{el.language}</li>
          <li className="sale"><span>Seller id:</span> {el.sales_id}</li>
        </ul>
      </li>)
    )

    return (
      <div >
        <Header location={this.props.location.pathname} />
        <h1 className="first_title">Shop List</h1>
        <div className="content-page">
          <input type="text" onChange={this.handleChange} placeholder="Search shop" />
          <div className="table">
            <ul className="title-table" >
              <li className="num">N°</li>
              <li>Name shop</li>
              <li>Company name</li>
              <li>Phone</li>
              <li className="lg">Language</li>
              <li className="sale">Seller id</li>
            </ul>
            <ul className="list-shops">
              {_shopList}
            </ul>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state.getSellerPage.searchShop
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ searchShops, saveIdShop }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchShop);
