interface ChatMessage {
    message: string,
    name: string
}

interface ChatFormProps {
    preventReload: (e: React.FormEvent<HTMLFormElement>) =>  void
    sendMessage: () => void
}



// Redux
const SET_LOGIN = 'SET_LOGIN'
interface LoginAction {
    type: typeof SET_LOGIN
    login: string | null
}
