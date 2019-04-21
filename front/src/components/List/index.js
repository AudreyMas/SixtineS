import React, { Component } from 'react';
import "./index.scss"

import ListItem from './ListItem/index'

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        
    }

    render() {
        const items = this.props.data.map((elem) => {
           return <ListItem listType={this.props.listType} data={elem} key={elem.id}/>
        })
        return (
            <ul className="list-style">
                {items}
            </ul>
        )
    }
}
export default List;