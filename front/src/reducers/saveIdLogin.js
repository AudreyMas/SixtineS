const saveIdLogin = (state = {}, action) => {
    switch (action.type) {
        case 'SAVEIDLOGIN':
            return action.payload;
        default:
            return state;
    }
}

export default saveIdLogin;