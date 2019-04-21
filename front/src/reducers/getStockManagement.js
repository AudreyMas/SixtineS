

const getStockManagement = (state = {}, action) => {
  switch (action.type){
    case 'GETSTOCK':
      return {
        ...state,
        stockManagement: action.payload
      }
      default:
      return state;
  }
}

export default getStockManagement;