const AgentPage = (state = {}, action) => {
  switch (action.type) {
      case 'SETOLDERORDER':
          return {...state,
              setOlder : action.payload};
      case 'SETUNPAIDBILL':
          return {...state,
              setUnpaid : action.payload};
      case 'SETBILL':
              return {...state,
                  setBill : action.payload};
      case 'SETTOTALSOLD':
              return {...state,
                  setTotal: action.payload};
      case 'SETTOTALUNITSELL':
              return {...state,
                  setTotalUnit : action.payload};
      default:
          return state;
  }
}

export default AgentPage;