const initialState={
  0: {
    id:0,
  }
}
const saveDBContent = (state = initialState, action) => {
  switch(action.type){
    case 'SAVEDBCONTENTCALECONS':
      return {...state,
              calecons: action.payload,
      }
      case 'SAVEDBCONTENTBOXERS':
      return {...state,
              boxers: action.payload,
      }
      case 'SAVEDBCONTENTWOMAN':
      return {...state,
              woman: action.payload,
      }
      default : 
        return state;
  }
}

export default saveDBContent;