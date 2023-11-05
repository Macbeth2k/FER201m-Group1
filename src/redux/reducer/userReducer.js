
const INITIAL_STATE = {
    account: {

    },
    isLogin: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_USER_LOGIN_SUCCESS':
            return {
                ...state, account: {
                    ...action.payload
                }, isLogin: true
            }
        case 'LOGOUT_ACCOUNT':
            return {
                ...INITIAL_STATE
            }
        default: return state;
    }
};

export default userReducer;