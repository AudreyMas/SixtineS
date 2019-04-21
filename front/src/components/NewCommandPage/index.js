import React, { Component } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import orders from '../../assets/order.svg';
import shop from '../../assets/shop.svg';
import graphic from '../../assets/graphic.svg';
import { connect } from 'react-redux';
import Header from '../header/index';




class NewCommandPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div >
        <Header location={this.props.location.pathname} />
        
          <p className='first_titles'>{this.props.shop.name_shop}</p>
       
  
        <div className="container_grid-container1">
          <div className="container_image-title">
            <img src={orders} className="shop-image" alt="order" />
            <p className='second_title'>Orders</p>
          </div>
          <div className="grid-container1">
          <div className="grid-item1">
            <p className='third_title'>Make a direct order</p>
            <Link to={`/direct-order/${this.props.shop.id}`} className="button btn-size color">Order</Link>
          </div>
            <div className="grid-item1">
              <p className='third_title'>Make a pre-order</p>
              <Link to='#'className="button-unavailable btn-size">Pre-Order</Link>
            </div>
          </div>
        </div>
        
        <div className="container_grid-container2">
          <div className="container_image-title">
            <div className="image-padding">
            <img src={shop} className="shop-image" alt="shop" />
            </div>
            <p className='second_title'>Shop infos</p>
          </div>
          <div className="grid-container2">
            <div className="grid-item2">
              <p className='third_title'>My Bills</p>
              <Link to='#'className="button-unavailable btn-size">View All</Link>
            </div>
            <div className="grid-item2">
              <p className='third_title'>Orders history</p>
              <Link to='#' className="button-unavailable btn-size">View All</Link>
            </div>
            <div className="grid-item2">
              <p className='third_title'>My personnal datas</p>
              <Link to='#' className="button-unavailable btn-size">View More</Link>
            </div>
          </div>
        </div>

        <div className="container_grid-container3">
          <div className="container_image-title">
            <img src={graphic} className="shop-image" alt="graphic" />
            <p className='second_title'>Graphic kit</p>
          </div>
          <div className="grid-container1">
            <div className="grid-item1">
              <p className='third_title'>Ambiant Images</p>
              <Link to='#' className="button-unavailable btn-size">Download</Link>
            </div>
            <div className="grid-item1">
              <p className='third_title'>Product Images</p>
              <Link to='#' className="button-unavailable btn-size">Download</Link>
            </div>
          </div>
        </div>
      </div>
    )

  }
}

const mapStateToProps = state => ({
  shop: state.saveIdShop
})

export default connect(mapStateToProps)(NewCommandPage);
