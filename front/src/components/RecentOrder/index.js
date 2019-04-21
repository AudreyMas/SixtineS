import React, { Component } from 'react';
import './index.css';
import iconRecentOrder from '../../assets/icone-recentOrders.svg'
import { connect } from 'react-redux';
 
class RecentOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billList: [],
        }
    }
        
    componentDidUpdate(prevProps){
        if(prevProps.state !== this.props.state){
            this.setState({billList: this.props.state})
        }
    }

    render() {
        const bill = this.state.billList.slice(0, 4).map((el, index) => {
            return <ul key={index}>
                <li>{el.name_shop}<span>-</span></li>
                <li>{el.id}<span>-</span></li>
                <li>{el.price_total} € TVAC </li>
            </ul>

        })
        return (
            <div className='bloc four_bill_list'>
                <div className="title-icon">
                    <img src={iconRecentOrder} className="icon" alt='recent' />
                    <p className="title_homepage">Recent Orders</p>
                </div>
                {bill}
            </div>)
    }

}

const mapStateToProps = state => ({
    state: state.getSellerPage.recent
})

export default connect(mapStateToProps)(RecentOrder);