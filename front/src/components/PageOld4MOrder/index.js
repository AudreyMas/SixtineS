import React, { Component } from "react";
import './index.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { oldOrder } from '../../actions/index';
import Header from '../header/index';


class PageOld4Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldOrderList: [],
        }
    }

    componentDidMount() {
        if (this.props.state === undefined) {
            this.props.oldOrder();
        } else {
            this.setState({ oldOrderList: this.props.state })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.state !== this.props.state) {
            this.setState({ oldOrderList: this.props.state })
        }
    }
    render() {
        const list = this.state.oldOrderList.map((el, index) =>
            <li key={index} >
                <p><span>Name shop : </span> {el.name_shop}</p>
                <p key={index}><span>Last order date : </span> {el.date.slice(0, 10)}</p>
                <p><span>Phone : </span>{el.phone}</p>
            </li>
        )

        return (
            <div>
                <Header location={this.props.location.pathname} />
                <div className='page four_shop_list'>
                    <h1 className="first_title">Shop to recall </h1>
                    <div className="table">
                        <ul className="table-title">
                            <li>Name shop</li>
                            <li>Last order date</li>
                            <li>Phone</li>
                        </ul>
                        <ul className="table-list">
                            {list}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}
const mapStateToProps = state => ({
    state: state.getSellerPage.oldMonth
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ oldOrder }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageOld4Order);
