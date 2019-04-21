const saveIdShop = (state = {}, action) =>  {
    switch (action.type) {
        case 'SAVEIDSHOP':
        return  action.payload
          

        default : 
            return state;
    } 

}

export default saveIdShop;