import React, { Component } from 'react';
import './index.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import home from '../../assets/home.svg';

import { Link } from "react-router-dom";


class AdminBills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billsAdminList: [],
      statusDate: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //get data of customers
  componentDidMount() {
    fetch('/api/admin/bills')
      .then(response => response.json())
      .then(data => {
        this.setState({
          billsAdminList: data
        })
      })
  }

  updateStatusDate(ev) {
    this.setState({
      statusDate: ev.target.value,
    });
  }

  //put status date + change status on "paid"
  handleSubmit(event) {
    event.preventDefault();
    const orderId = event.target.getAttribute("data-value");

    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: orderId,
        status: "paid",
        status_date: this.state.statusDate,
      }),
    };
    const url = (`http://localhost:5000/api/paymentdate/${orderId}`);

    fetch(url, config)
      .then(res => {
        if (res.status === 200) {
          alert(`DATE SAVED`)
          this.props.history.push('/admin/all-invoices')
        } else {
          alert(`ERROR DATE NOT SAVED`);
        }
      });
  }

  sentMailRemind() {
    fetch("/mail-remind-bill")
      .then(res => {

        if (res.status === 200) {
          alert(`MAIL SENT`)
        } else {
          alert(`ERROR WITH THE MAIL`);
        }
      });
    this.props.history.push('/confirm/confirm-mail-all-invoices')
  }


  render() {
    let paidBills = this.state.billsAdminList.map((el, index) => {
      if (el.status === "paid") {
        return (
          <ul className="table-list" key={index}>
            <li className="list-item" >
              <ul className="list-item-infos" >
                <li className="num"> <span>N°: </span>{el.id}</li>
                <li><span>Name shop: </span> {el.name_shop}</li>
                <li><span> Amount:</span>{el.price_total}€</li>
                <li> <span>Date of issue: </span>{el.date.slice(0, 10)}</li>
                <li><span>Status:</span>{el.status}</li>
                <li className="saveDate"><span>Payment date:</span>{el.status_date.slice(0, 10)}</li>
              </ul>
            </li>
          </ul>
        )

      }
      return '';
    });


    let notPaidBills = this.state.billsAdminList.map((el, index) => {
      if (el.status === "not Paid" || el.status === "not paid") {
        return <ul className="table-list" key={index}>
          <li className="list-item list-item-infos-notpaid" >
            <form className="" onSubmit={this.handleSubmit} data-value={el.id}>
              <ul className="list-item-infos" >
                <li className="num"><span>N° : </span>{el.id}</li>
                <li><span>Name shop : </span> {el.name_shop}</li>
                <li><span> Amount :</span>{el.price_total}€</li>
                <li> <span>Date of issue : </span>{el.date.slice(0, 10)}</li>
                <li onChange={this.updateStatusDate.bind(el.status)} ><span>Status:</span>{el.status}</li>
                <li className="saveDate">
                  <span>Payment date:</span>
                  <input className="saveDate-input"
                    type="date"
                    id="statusDate"
                    name="statusDate"
                    maxLength="10"
                    value={this.state.statusDate}
                    onChange={this.updateStatusDate.bind(this)}
                  />
                  <button className="button-save-date" type="submt" name="sent" value="soumettre">ok</button>
                </li>
              </ul>
            </form>
            <div className="list-item-infos-buttons">
              <button className="button" onClick={() => this.sentMailRemind()}>remind</button>
            </div>
          </li>
        </ul>
      }
      return '';
    });



    return (
      <div className="admin-bills">
        <Link to="/admin" className="login" type="submit"><img src={home} className="login" alt="order" /></Link>

        <h1 className="first_title">Admin invoices</h1>

        <div>
          <Tabs>
            <TabList>
              <div className="table-filter">
                <Tab className="table-filter-btn"><span>Paid</span></Tab>
                <Tab className="table-filter-btn"><span>Not Paid</span></Tab>
              </div>
            </TabList>
            <div className="table">
              <ul className="table-title">
                <li className="num">N°</li>
                <li>Name shop</li>
                <li>Amount</li>
                <li>Date of issue</li>
                <li>Status</li>
                <li className="saveDate">Payment date</li>
              </ul>


              <div className>
                <TabPanel>
                  {paidBills}
                </TabPanel>
                <TabPanel>
                  {notPaidBills}
                </TabPanel>
              </div>
            </div>

          </Tabs>
        </div>


      </div >
    )
  }
}

export default AdminBills;
