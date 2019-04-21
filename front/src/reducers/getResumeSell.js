const initialState = {
  listOrders: null,
};

const getResumeSell = (state = initialState, action) => {
  switch (action.type){
    case 'GETRESUMESELL':
      return {
        ...state,
        listOrders: action.payload
      }
      default:
      return state;
  }
}

export default getResumeSell;