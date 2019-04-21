import React, { Component } from 'react';
import './index.scss'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveOrder } from '../../actions/index';

class ButtonAddRemove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: '',
      stock: parseInt(this.props.stock),
    }
  }
  componentDidMount(){
    if(this.props.inputValue !== ''){
      this.setState({
        total: this.props.inputValue
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    
    if (prevState.total !== this.state.total) {
      this.props.saveOrder({ size: this.props.size, id: this.props.caleconsList.id, total: this.state.total, typeProduct : this.props.typeProduct,sizes:this.props.sizes, stock: this.state.stock });}
  }
  handleClick(ev) {
    let value = ev.target.value !== '' ? parseInt(ev.target.value) : 0;
    let total = this.state.total === '' ? 0 : parseInt(this.state.total);
    if (value > this.props.stock) {
      return
    }
    if (ev.target.name === 'input-change-quantity' && value >= 0) {
      if (ev.target.value === '') {
        return this.setState({ total: '', stock: this.props.stock - value })
      } else {
        this.setState({ total: value, stock: this.props.stock - value })
      }
      return
    } else {
      if (ev.target.name === 'button-add-quantity' && this.state.stock - 1 >= 0) {
        return this.setState({ total: total + 1, stock: this.state.stock - 1 })
      }

      if (ev.target.name === 'button-remove-quantity') {
        if (this.state.total > 0) {
          this.setState({ total: total - 1, stock: this.state.stock + 1 })
        }
      }
    }

  }


  render() {
    return (
      <ul className="quantity" >
        <li className="quantity-legend">{this.props.sizes}</li>
        <li className="quantity-selected">
          <button className="quantity-selected-button remove" name='button-remove-quantity' onClick={(ev) => this.handleClick(ev)} >-</button>
          <input className="quantity-selected-input" type='number' placeholder="0" name='input-change-quantity' onChange={(ev) => this.handleClick(ev)} value={this.state.total}></input>
          <button className="quantity-selected-button add" name='button-add-quantity' onClick={(ev) => this.handleClick(ev)}>+</button>
        </li>
        <li className="quantity-stock">
          <span className="quantity-stock-value">{this.state.stock}</span>
        </li>
      </ul>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ saveOrder }, dispatch)
}

export default connect(null, mapDispatchToProps)(ButtonAddRemove);