import React, { Component } from 'react';
import './index.scss';
import List from '../List/index';
import { connect } from 'react-redux';
import Header from '../header/index';
import axios from 'axios';




class ResumeOrder extends Component {
  constructor(props) {
    super(props);
    const today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state = {
      startDate: "",
      dateOfTheDay: date,
      totalPrice: 0,
      order: [],
      newStock: {},
      totalUnit: 0,
    }
  }

  getCombine(quantityArray, combinedArray) {
    let object = {};
    combinedArray.map(elem => {
      const quantityArray2 = quantityArray.map(element => {
        if (elem.id === element.id) {
          const combine = Object.assign(elem, element);
          object[combine.id] = {
            id: combine.id,
            xs: combine.xs,
            s: combine.s,
            m: combine.m,
            l: combine.l,
            xl: combine.xl,
            xxl: combine.xxl,
            product_id: combine.id,
          }
          this.setState(prevState => ({ order: [...prevState.order, combine] }))
          return combine
        }
        return '';
      }).filter(element => element !== undefined);
      return quantityArray2;
    }).filter(elem => elem !== undefined);
    this.setState({ newStock: object })
  }

  getTotal(quantityArray) {
    let addition = 0;
    quantityArray.map(element => {
      if (element.quantity_xs !== undefined) {
        addition += element.quantity_xs;
      }
      if (element.quantity_s !== undefined) {
        addition += element.quantity_s;
      }
      if (element.quantity_m !== undefined) {
        addition += element.quantity_m;
      }
      if (element.quantity_l !== undefined) {
        addition += element.quantity_l;
      }
      if (element.quantity_xl !== undefined) {
        addition += element.quantity_xl;
      }
      if (element.quantity_xxl !== undefined) {
        addition += element.quantity_xxl;
      }
      return '';
    })
    const totalUnit = addition;
    addition = addition * 35;
    this.setState(prevState => ({ totalPrice: prevState.totalPrice + addition, totalUnit: totalUnit }))

  }
  componentDidMount() {
    const quantityArray = Object.keys(this.props.orders).map(elem => {
      return this.props.orders[elem]
    });
    let combineArray = []
    let combinedArray = combineArray.concat(this.props.infoProduct);
    if (this.props.infoBoxers !== undefined) {
      combinedArray = combinedArray.concat(this.props.infoBoxers);
    }
    if (this.props.infoWoman !== undefined) {
      combinedArray = combinedArray.concat(this.props.infoWoman);
    }
    this.getCombine(quantityArray, combinedArray);
    this.getTotal(quantityArray);
  }

  handleChange(ev) {
    this.setState({
      startDate: ev.target.value,
    });
  }

  confirmOrder(id) {
    fetch("/api/send-quantity",
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          quantity: this.state.totalUnit,
          orders_id: id,
          orders_customer_id: this.props.customer.id,
          orders_sales_id: this.props.customer.sales_id,
          orders_customer_sales_id: this.props.customer.sales_id,
          product_id: 1
        }),
      })

    fetch('/api/update-size', {
      method: 'put',
      body: JSON.stringify({
        data: this.state.newStock
      }
      ),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })

    fetch("/mail-confirm-order")
      .then(res => res.json());

    this.props.history.push('/confirm/confirm-order')



  }

  onSubmit(ev) {
    ev.preventDefault();
    axios.post("/api/send-order", {
      date: this.state.dateOfTheDay,
      wished_delivery_date: this.state.startDate,
      price_total: this.state.totalPrice,
      status: "not Paid",
      url: "",
      sales_id: (this.props.customer.sales_id || this.props.sales_id),
      customer_id: this.props.customer.id,
      customer_sales_id: this.props.customer.sales_id,
    })
      .then(
        response => {
          if (response.status === 200) {
            this.confirmOrder(response.data.insertId)
          }
        },
        error => {
          alert("Please select a delivery date, or check if your shop is login");
        }
      )
  }

  render() {
    return (
      <div>
        <Header location={this.props.location.pathname} />

        <h1 className='first_title'>{this.props.customer.name_shop}</h1>
        <div className="detail-list">
          <p>Wished date of delivery:</p>
          <input type="date" placeholder="YYYY/MM/DD" value={this.state.startDate} onChange={(ev) => this.handleChange(ev)} />
          <p >Total: {this.state.totalPrice} €</p>
          <button className="button" onClick={(ev) => this.onSubmit(ev)} >CONFIRM</button>
        </div>
        <div className="table">
          <ul className="table-title">
            <li className="img-hidden"></li>
            <li className="name-product">Name</li>
            <li className="taille"> XS</li>
            <li className="taille">S</li>
            <li className="taille">M</li>
            <li className="taille">L</li>
            <li className="taille">XL</li>
            <li className="taille">XXL</li>
            <li className="taille">Color</li>
            <li className="price">Price</li>

          </ul>
          <div className="table-list resumeorder">
            <List data={this.state.order} listType="resumeOrder" />
          </div>

        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({

  orders: state.saveOrder,
  infoProduct: state.saveDBContent.calecons,
  infoBoxers: state.saveDBContent.boxers,
  infoWoman: state.saveDBContent.woman,
  sales_id: state.saveIdLogin[0],
  customer: state.saveIdShop

})

export default connect(mapStateToProps)(ResumeOrder);