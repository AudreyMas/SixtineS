import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { billUnpaid } from '../../actions/index';
import Header from '../header/index';

class PageBillNotPayDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billList: [],
        }
    }
    componentDidMount() {
        if (this.props.state === undefined) {
            this.props.billUnpaid();
        } else {
            this.setState({ billList: this.props.state })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.state !== this.props.state) {
            this.setState({ billList: this.props.state })
        }

    }

    render() {
        const bill = this.state.billList.map((el, index) => {
            if (el.status === "not paid" || el.status === "not Paid") {
                return <li key={index} >
                        <p>{el.name_shop}</p>
                        <p>{el.Customer_id}</p>
                        <p>{el.price_total} € TVAC</p>
                
                </li>
            }
            return '';
        })
        return (
            <div className='page four_bill_list'>
                <Header location={this.props.location.pathname} />
                <h1 className="first_title">Unpaid Orders</h1>
                <div className="table">
                    <ul className="table-title">
                        <li>Name shop</li>
                        <li>Order n°</li>
                        <li>Total Price</li>
                    </ul>
                    <div div className="table-list">
                        <ul>
                            {bill}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    state: state.getSellerPage.unpaid
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ billUnpaid }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageBillNotPayDisplay);