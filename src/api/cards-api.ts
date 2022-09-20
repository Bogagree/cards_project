import axios from 'axios'

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login() {
        return instance.post('auth/login',{
            email: "nya-admin@nya.nya",
            password: "1qazxcvBG",
            rememberMe: false })
    },
    me() {
        return ''
    },
    updateUser(name: string) {
        return instance.put('/auth/me', {name: name})
    },
    logout() {
        return instance.delete('/auth/me', {});
    }
}