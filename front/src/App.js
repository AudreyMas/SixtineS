import React, { Component } from 'react';
import AddProduct from './components/admin_add_product/index';
import './App.scss';
import { Route, BrowserRouter, Switch} from 'react-router-dom';
import DirectOrder from './components/Page-DirectOrder/index';
import AgentHomePage from './components/AgentHomePage/index';
import Login from './components/LoginPage/index';
import OldOrdersList from './components/PageOld4MOrder/index';
import BillNotPayDisplay from './components/PageBillNotPayDisplay/index';
import AdminBills from './components/AdminBills/index';
import AdminMenu from './components/admin_menu/index';
import ResumeSell from './components/ResumeSell/index'
import SearchShop from './components/SearchShop/index';
import NewCommandPage from './components/NewCommandPage/index';
import ResumeOrder from './components/ResumeOrder/index';
import AddSales from './components/Admin_add_sales/index';
import StockManagement from './components/StockManagement/index';
import Confirm from './components/confirm_pages/index';
import CreateProfilePage from './components/CreateProfilePage/index';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            {/*LOGIN PAGES*/}
            <Route exact path="/" component={Login} />
            <Route path="/sales" component={Login} />
            
            {/*HOME PAGES*/}
            <Route path="/shop-homepage" component={NewCommandPage} />
            <Route path="/agent-homepage" component={AgentHomePage} />
            <Route exact path="/admin" component={AdminMenu} />

            {/*CLASSIC PAGES*/}
            <Route path="/create-profile" component={CreateProfilePage} />
            <Route path="/bill-not-paid" component={BillNotPayDisplay} />
            <Route path="/old-orders-list" component={OldOrdersList} />
            <Route path="/direct-order" component={DirectOrder} />
            <Route path="/resume-order" component={ResumeOrder} />
            <Route path="/search-shop" component={SearchShop} /> 

            {/*CONFIRM PAGES*/}
            <Route path="/confirm" component={Confirm} />
            
            {/*ADMIN PAGES*/}
            <Route path="/admin/add-product" component={AddProduct} />
            <Route path="/admin/all-orders" component={ResumeSell } />
            <Route path="/admin/all-invoices" component={AdminBills} />
            <Route path="/admin/add-sales" component={AddSales} />
            <Route path="/admin/manage-stock" component={StockManagement} />
          </Switch>

        </div>
      </BrowserRouter>
    
  
    )
  }
}

export default App;
