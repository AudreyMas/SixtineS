import React, { Component } from 'react';
import './index.scss';
import Recall from '../../assets/icone-recall.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Old4MonthOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 4,
            oldOrderList: [],
        }
    }


    componentDidUpdate(prevProps){
        if(prevProps.state !== this.props.state){
            this.setState({oldOrderList:this.props.state})
        }
    }
    render() {
        const list = this.state.oldOrderList.slice(0, this.state.counter).map((el, index) =>
            <ul key={index}>
                <li> {el.name_shop}<span>-</span></li>
                <li key={index}> {el.date.slice(0, 10)}</li>
            </ul>
        )

        return (
            <div className='bloc four_shop_list'>
                <div className="title-icon">
                    <img src={Recall} className="icon" alt='recall'/>
                    <p className="title_homepage">Shop to recall</p>
                </div>
                        {list}
                    <Link to="/old-orders-list" className="buttons view-more">View more</Link>
            </div>
            )
        }
    
    }
    const mapStateToProps = (state) => ({
        state: state.getSellerPage.oldMonth
    })

    
export default connect(mapStateToProps)(Old4MonthOrder);

