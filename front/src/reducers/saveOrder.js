const saveOrder = (state = {}, action) => {
  switch (action.type) {
    case 'SAVEORDERS':
      return { ...state, [action.payload.id]: { ...state[action.payload.id], [action.payload.size]: action.payload.total, type: action.payload.typeProduct, id: action.payload.id, [action.payload.sizes] : action.payload.stock } }

    default:
      return state;
  }
}

export default saveOrder;