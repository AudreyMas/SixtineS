import React, { Component } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveStockManagement } from '../../actions/index';
import { Link } from "react-router-dom";
import home from '../../assets/home.svg';


class StockManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stockManagement: [],
            dataStock: {},

        }
    }

    componentDidMount() {
        this.props.saveStockManagement();
    }

    getDataStore() {
        this.setState({ stockManagement: this.props.state })
        let object = {};
        for (let i = 0; i < this.props.state.length; i += 1) {
            object[this.props.state[i].id] = {
                id: this.props.state[i].id,
                xs: this.props.state[i].xs,
                s: this.props.state[i].s,
                m: this.props.state[i].m,
                l: this.props.state[i].l,
                xl: this.props.state[i].xl,
                xxl: this.props.state[i].xxl,
                product_id: this.props.state[i].id,
            }
        }
        this.setState({
            dataStock: object
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.state !== this.props.state) {
            this.getDataStore();
        }
    }
    handleChange(ev) {
        if (ev.target.value >= 0) {
            this.setState({
                dataStock: {
                    ...this.state.dataStock,
                    [ev.target.id]: {
                        ...this.state.dataStock[ev.target.id],
                        [ev.target.name]: ev.target.value,
                        product_id: parseInt(ev.target.id)
                    }
                }
            })
        }
    }
    handleSubmit(ev) {
        fetch('/api/update-stock-size', {
            method: 'PUT',
            body: JSON.stringify({ data: this.state.dataStock }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        ev.preventDefault();
        this.props.history.push('/confirm/confirm-add-new-stock')
            ;
    }

    sentMailStock() {
        fetch("/mail-new-stock")
            .then(res => {

                if (res.status === 200) {
                    alert(`MAIL SENT`)
                } else {
                    alert(`ERROR WITH THE MAIL`);
                }
            });
        this.props.history.push('/confirm/confirm-mail-new-stock')

    }



    render() {
        const stock = this.state.stockManagement.map((elem, index) => {

            return <li key={index} className="infos">
                <ul className="infos-stock">
                    <li className="list-stock-li"><span>Type : </span>
                        {elem.type}
                    </li>
                    <li className="list-stock-li"><span>Name : </span>
                        {elem.name}
                    </li>
                    <li className="list-stock-li"><span>Season id : </span>
                        {elem.seasons_id}
                    </li>
                    <li className="list-stock-li ean"><span>EAN : </span>
                        {elem.EAN}/
                    </li>
                    <li className="list-stock-li"><span>XS </span>
                        <input type="number" name="xs" id={elem.id} className="list-item-li-input" onChange={(ev) => this.handleChange(ev)} placeholder={elem.xs} />
                    </li>
                    <li className="list-stock-li"><span>x : </span>
                        <input type="number" name="s" id={elem.id} className="list-item-li-input" onChange={(ev) => this.handleChange(ev)} placeholder={elem.s} />
                    </li>
                    <li className="list-stock-li"><span>M : </span>
                        <input type="number" name="m" id={elem.id} className="list-item-li-input" onChange={(ev) => this.handleChange(ev)} placeholder={elem.m} />
                    </li>
                    <li className="list-stock-li"><span>L : </span>
                        <input type="number" name="l" id={elem.id} className="list-item-li-input" onChange={(ev) => this.handleChange(ev)} placeholder={elem.l} />
                    </li>
                    <li className="list-stock-li"><span>XL : </span>
                        <input type="number" name="xl" id={elem.id} className="list-item-li-input" onChange={(ev) => this.handleChange(ev)} placeholder={elem.xl} />
                    </li>
                    <li className="list-stock-li"><span>XXL : </span>
                        <input type="number" name="xxl" id={elem.id} className="list-item-li-input" onChange={(ev) => this.handleChange(ev)} placeholder={elem.xxl} />
                    </li>
                </ul>
            </li>
        })

        return (
            <div className="page-stockManagement">
                <Link to="/admin" className="login" type="submit"><img src={home} className="login" alt="order" /></Link>

                <h1 className="first_title">Stock Management</h1>
                <div className="button-stock">
                    <button className=" button"><Link to="/admin/add-product">Add a product</Link></button>
                    <button className=" button" onClick={() => this.sentMailStock()}>Send a mail to clients</button>
                    <button className="button" variant="contained" color="primary" onClick={(ev) => this.handleSubmit(ev)}>Confirm changes </button>
                </div>
                <div className="table-stock">
                    <ul className="table-stock-title" >
                        <li className="table-stock-title-li">Type</li>
                        <li className="table-stock-title-li">Name</li>
                        <li className="table-stock-title-li">Season Id</li>
                        <li className="table-stock-title-li ean">EAN</li>
                        <li className="table-stock-title-li">xs</li>
                        <li className="table-stock-title-li">s</li>
                        <li className="table-stock-title-li">m</li>
                        <li className="table-stock-title-li">l</li>
                        <li className="table-stock-title-li">xl</li>
                        <li className="table-stock-title-li">xxl</li>


                    </ul>
                    <ul className="list-stock">
                        {stock}
                    </ul>
                </div>
                <div className="button-stock">
                    <button className="button" type="submit" value="Soumettre" variant="contained" color="primary" onClick={(ev) => this.handleSubmit(ev)}>Confirm changes </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    state: state.getStockManagement.stockManagement
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ saveStockManagement }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(StockManagement);