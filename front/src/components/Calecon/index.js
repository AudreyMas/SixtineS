import React, { Component } from "react";
import "./index.scss"
import ButtonAddRemove from '../ButtonAddRemove/index.js'
import { bindActionCreators } from 'redux';
import { getCalecons } from '../../actions/index'
import { connect } from 'react-redux';


class Calecon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caleconsList: [],
        }
    }
    componentDidMount() {
        if (this.props.dbContent === undefined) {
            this.props.getCalecons()
        } else {
            this.setState({ caleconsList: this.props.dbContent })
        }


    }

    componentDidUpdate(prevProps){
        if (prevProps.dbContent !== this.props.dbContent) {
            this.setState({ caleconsList: this.props.dbContent })
        }
    }
   


    render() {
        const listcalecon = this.state.caleconsList.map((el) => {
            return (
                <li className="product" key={el.id} >
                    <span className="image-container" style={{ backgroundImage: `url(${el.image_1})` }}>
                    </span>
                    <h3 className="product-name"><span>{el.name}</span></h3>

                    <div className="product-stock">
                        <span className="stock-title">stock</span>
                        <ul className="stock-list">
                            <li className="stock-list-item">

                                <ButtonAddRemove caleconsList={el} stock={el.xs} confirm={this.state.confirm} inputValue={this.props.order[el.id] !== undefined ? this.props.order[el.id].quantity_xs : ''} size='quantity_xs' sizes="xs" typeProduct='Calçon' />
                            </li>
                            <li className="stock-list-item">
                                <ButtonAddRemove caleconsList={el} stock={el.s} confirm={this.state.confirm} inputValue={this.props.order[el.id] !== undefined ? this.props.order[el.id].quantity_s : ''} size='quantity_s' sizes="s" typeProduct='Calçon' />
                            </li>
                            <li className="stock-list-item">
                                <ButtonAddRemove caleconsList={el} stock={el.m} confirm={this.state.confirm} inputValue={this.props.order[el.id] !== undefined ? this.props.order[el.id].quantity_m : ''} size='quantity_m' sizes="m" typeProduct='Calçon' />
                            </li>
                        </ul>
                    </div>
                    <div className="product-stock">
                        <span className="stock-title">stock</span>
                        <ul className="stock-list">
                            <li className="stock-list-item">
                                <ButtonAddRemove caleconsList={el} stock={el.l} confirm={this.state.confirm} inputValue={this.props.order[el.id] !== undefined ? this.props.order[el.id].quantity_l : ''} size='quantity_l' sizes="l" typeProduct='Calçon' /></li>

                            <li className="stock-list-item">
                                <ButtonAddRemove caleconsList={el} stock={el.xl} confirm={this.state.confirm} inputValue={this.props.order[el.id] !== undefined ? this.props.order[el.id].quantity_xl : ''} size='quantity_xl' sizes="xl" typeProduct='Calçon' /></li>
                            <li className="stock-list-item">
                                <ButtonAddRemove caleconsList={el} stock={el.xxl} confirm={this.state.confirm} inputValue={this.props.order[el.id] !== undefined ? this.props.order[el.id].quantity_xxl : ''} size='quantity_xxl' sizes="xxl" typeProduct='Calçon' /></li>
                        </ul>
                    </div>
                </li>
            )
        })
        return (
            <div className="composant-list-calecons">
                <ul className="liste-calecons">
                    {listcalecon}
                </ul>

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        order: state.saveOrder,
        dbContent: state.saveDBContent.calecons
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getCalecons }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Calecon);

