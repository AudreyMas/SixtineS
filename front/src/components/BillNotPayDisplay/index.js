import React, { Component } from 'react';
import './index.scss';
import Unpaid from '../../assets/icone-unpaid.svg'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';


class BillNotPayDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billList: [],
        }
    }
    
    componentDidUpdate(prevProps) {
        if(prevProps.state !== this.props.state){
            this.setState({billList:this.props.state})
        } 
    }
    
    render() {
        const bill = this.state.billList.slice(0, 5).map((el, index) => {
            if (el.status === "not paid" || el.status === "not Paid") {
                return <ul key={index}>
                    <li>{el.name_shop}<span>-</span></li>
                    <li>{el.Customer_id}<span>-</span></li>
                    <li>{el.price_total} € TVAC</li>
                </ul>
            }
            return '';
        })
        return (
            <div className="bloc four_bill_list">
                <div className="title-icon">
                    <img src={Unpaid} className="icon" alt="unpaid" />
                    <p className="title_homepage">Unpaid Orders</p>
                </div>
                {bill}
                <Link to="/bill-not-paid" className="buttons view-more">View more</Link>
            </div>)
    }
}
const mapStateToProps = state => ({
    state: state.getSellerPage.unpaid
})

export default connect(mapStateToProps)(BillNotPayDisplay);