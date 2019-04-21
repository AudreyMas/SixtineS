import React, { Component } from 'react';
import './confirm.css';
import { withRouter } from 'react-router-dom';

import Lottie from 'react-lottie'
import animationData from './asset/ok.json'


const routes = {
  '/confirm/confirm-order':{ message: "Your order is confirmed and a mail is sent!", path : "/shop-homepage" ,},
  '/confirm/confirm-customer':{ message: "Customer correctly registered !" , path : "/agent-homepage", },
  '/confirm/confirm-sales':{ message: "Sale account corectly registered !", path:"/admin" ,},
  '/confirm/confirm-product':{ message: "Product correctly added !", path:"/admin" ,},
  '/confirm/confirm-mail-all-invoices':{ message: "Mail correctely sent !", path:"/admin/all-invoices" ,},
  '/confirm/confirm-mail-new-stock':{ message: "Mail correctely sent !", path:"/admin" ,},
  '/confirm/confirm-add-new-stock':{ message: "Stock correctely update !", path:"/admin/manage-stock" ,}
}

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:null,
    }
  }

  componentDidMount() {
    
      this.setState(
        {message : routes[this.props.location.pathname].message,}
      )
  }

  routeChange() {
    this.props.history.push(routes[this.props.location.pathname].path); 
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }

    return (
      <div>
        <div className="confirm_container">

          <div>
            <Lottie options={defaultOptions}
              height={200}
              width={200} />
          </div>

          <h2>
            {this.state.message}
          </h2>
          <p>
            Thank you for trusting the Sixtine's team.
        </p>
          <button className="confirm_button" type="submit" onClick={() => this.routeChange()}>Home</button>
        </div>
      </div>

    )
  }

}


export default withRouter(Confirm);