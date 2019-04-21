import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import saveIdShop from '../reducers/saveIdShop';
import saveIdLogin from '../reducers/saveIdLogin';
import saveOrder from '../reducers/saveOrder';
import saveDBContent from '../reducers/saveDBContent';
import getStockManagement from '../reducers/getStockManagement';
import AgentPage from '../reducers/setOldOrder';
import getSellerPage from '../reducers/getSellerPage';
import getResumeSell from '../reducers/getResumeSell';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    saveIdShop,
    saveIdLogin, 
    saveOrder,
    saveDBContent,
    getStockManagement,
    AgentPage,
    getSellerPage,
    getResumeSell
})

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

export const store = createStore(rootReducer, enhancer)