const getSellerPage = (state = {}, action) => {
  switch (action.type) {
    case 'GETOLDORDER':
      return {
        ...state,
        oldMonth: action.payload
      }
    case 'GETUNPAIDBILL':
      return {
        ...state,
        unpaid: action.payload
      }
    case 'GETBILL':
      return {
        ...state,
        recent: action.payload
      }
    case 'GETTOTALSOLD':
      return {
        ...state,
        totalSold: action.payload
      }
    case 'GETTOTALUNITSELL':
      return {
        ...state,
        totalUnit: action.payload
      }
      case 'GETALLCUSTOMERS':
      return {
        ...state,
        searchShop: action.payload
      }
     
    default:
      return state;
  }
}

export default getSellerPage;


