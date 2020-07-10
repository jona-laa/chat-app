const initState: null = null;

export const loginReducer = (state = initState, action: LoginAction) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return action.login
        default:
            return state
    }
};