export const saveIdLogin = (login) => ({
    type: 'SAVEIDLOGIN',
    payload: login,
})

export const saveIdShop = (search) => ({
    type: 'SAVEIDSHOP',
    payload: search,
})

export const saveOrder = (id) => ({
    type: 'SAVEORDERS',
    payload: id,
})

export const getCalecons = () => {
    return dispatch => {
        fetch('/api/calecons')
            .then(response => response.json())
            .then(data => { dispatch(saveDBContentCalecons(data)) }
            )
    }
}

export const saveDBContentCalecons = (data) => ({
    type: 'SAVEDBCONTENTCALECONS',
    payload: data,
})

export const getBoxers = () => {
    return dispatch => {
        fetch('/api/boxers')
            .then(response => response.json())
            .then(data => { dispatch(saveDBContentBoxers(data)) }
            )
    }
}
export const saveDBContentBoxers = (data) => ({
    type: 'SAVEDBCONTENTBOXERS',
    payload: data,
})

export const getWoman = () => {
    return dispatch => {
        fetch('/api/woman')
            .then(response => response.json())
            .then(data => { dispatch(saveDBContentWoman(data)) }
            )
    }
}
export const saveDBContentWoman = (data) => ({
    type: 'SAVEDBCONTENTWOMAN',
    payload: data,
})


export const saveStockManagement = () => {
    return dispatch => {
        fetch('/api/admin/stock-management')
            .then(response => response.json())
            .then(data => { dispatch(getStockManagement(data))}
            )
        }
}

export const getStockManagement = (select) => ({
    type: 'GETSTOCK',
    payload: select,
})



export const oldOrder = () => {
    return dispatch => {
        fetch('/api/orders/fourmonths')
            .then(response => response.json())
            .then(data => { dispatch(getOldOrder(data)) }
            )
    }
}

export const billUnpaid = () => {
    return dispatch => {
        fetch('api/orders/unpaid')
            .then(response => response.json())
            .then(data => { dispatch(getUnpaidBill(data)) }
            )
    }
}

export const recentOrders = () => {
    return dispatch => {
        fetch('/api/orders/recent-orders')
            .then(response => response.json())
            .then(data => { dispatch(getBill(data)) }
            )
    }
}


export const totalUnitSell = () => {
    return dispatch => {
        fetch('/api/orders/total-unit-sell')
            .then(response => response.json())
            .then(data => { dispatch(getTotalUnitSell(data)) }
            )
    }
}

export const totalSold = () => {
    return dispatch => {
        fetch('/api/orders/total-price')
            .then(response => response.json())
            .then(data => { dispatch(getTotalSold(data)) }
            )
    }
}

export const saveResumeSell = () => {
    return dispatch => {
        fetch('/api/admin/resume-sell')
            .then(response => response.json())
            .then(data => { dispatch(getResumeSell(data))}
            )
        }
}

export const searchShops = () => {
    return dispatch => {
        fetch('/api/customers')
            .then(response => response.json())
            .then(data => { dispatch(getAllCustomers(data)) }
            )
    }
}

export const getOldOrder = (select) => ({
    type: 'GETOLDORDER',
    payload: select,
})
export const getUnpaidBill = (select) => ({
    type: 'GETUNPAIDBILL',
    payload: select,
})
export const getBill = (select) => ({
    type: 'GETBILL',
    payload: select,
})
export const getTotalSold = (select) => ({
    type: 'GETTOTALSOLD',
    payload: select,
})
export const getTotalUnitSell = (select) => ({
    type: 'GETTOTALUNITSELL',
    payload: select,
})


export const getResumeSell = (select) => ({
    type: 'GETRESUMESELL',
    payload: select,
})

export const getAllCustomers = (select) => ({
    type: 'GETALLCUSTOMERS',
    payload: select,
})

