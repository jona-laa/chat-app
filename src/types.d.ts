interface ChatMessage {
    message: string,
    name: string
}

const SET_LOGIN = 'SET_LOGIN'

// Redux State Types
interface LoginAction {
    type: typeof SET_LOGIN
    login: string | null
}