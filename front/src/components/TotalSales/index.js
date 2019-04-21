import React, { Component } from 'react';
import './index.scss';
import { connect } from 'react-redux';



class TotalSales extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total: '',
            totalUnitSell: '',
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.totalsold !== this.props.totalsold) {
            this.getTotal(this.props.totalsold);
            this.getTotalUnitSell(this.props.totalunitsell);
        }
    }

    getTotal(data) {
        if (data !== undefined) {
            let result = 0;
            for (let i = 0; i < data.length; i++) {
                result += parseInt(data[i].price_total);
            }
            this.setState({
                total: result,
            })
        }
    }

    getTotalUnitSell(data) {
        if (data !== undefined) {
            let result = 0;
            for (let i = 0; i < data.length; i++) {
                result += parseInt(data[i].quantity);
            }
            this.setState({
                totalUnitSell: result,
            })

        }
    }



    render() {
        return (
            <div>
                <ul className="container_sales_unit">
                    <li className="container_totsales">Total Sales : <span> {this.state.total} €</span></li>
                    <li className="container_totsales">Total Unit Sell : <span>{this.state.totalUnitSell}</span></li>
                </ul>
            </div>)
    }
}
const mapStateToProps = state => ({
    totalsold: state.getSellerPage.totalSold,
    totalunitsell: state.getSellerPage.totalUnit
})



export default connect(mapStateToProps)(TotalSales);