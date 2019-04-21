import React, { Component } from 'react';
import './index.scss';
import Calecon from '../Calecon/index';
import Boxer from '../Boxers/index';
import Woman from '../Woman/index';
import Kart from '../../assets/kart.svg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Link } from 'react-router-dom';

import Header from '../header/index'


class DirectOrder extends Component {
    render() {
        return (
            <div className="container-direct-order">
             <Header location={this.props.location.pathname} />
                <Tabs className="page-direct-order">
                    <h1 className="first_title"> Shop Name </h1>
                    <div className="nav">
                        <TabList className="nav-list" >
                            <Tab className="nav-list-el">Caleçons</Tab>
                            <Tab className="nav-list-el ">Boxers</Tab>
                            <Tab className="nav-list-el">Shorties</Tab>
                        </TabList>
                    </div>
                    <div className="list-items">
                        <div className="kart">
                        <Link to="/resume-order"><img src={Kart} alt="kart" /></Link>
                        </div>
                        <div >
                            <TabPanel>
                                <Calecon />
                            </TabPanel>
                            <TabPanel>
                                <Boxer />
                            </TabPanel>
                            <TabPanel>
                                <Woman />
                            </TabPanel>
                            <div className="direct-order">
                               <Link to="/resume-order" className="button">Confirm</Link>
                            </div>
                        </div>
                    </div>
                </Tabs>
            </div>
        )
    }
}

export default DirectOrder; 