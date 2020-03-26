export const setLogin = (login: string | null):LoginAction => {
    return {
        type: 'SET_LOGIN',
        login: login
    }
};