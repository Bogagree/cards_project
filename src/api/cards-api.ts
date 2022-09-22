import axios from 'axios'
import {RegistrationDataType} from "../features/auth/auth-reducer";

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<UserType>('auth/login', {email, password, rememberMe})
            .then(res => res.data)
    },
    authMe() {
        return instance.post<UserType>('/auth/me', {})
            // .then(res => res.data)
    },
    updateUser(name: string) {
        return instance.put('/auth/me', {name: name})
    },
    logout() {
        return instance.delete('auth/me')
    },
    registration(data: RegistrationDataType) {
        return instance.post('auth/register', {...data})
    },
    ping() {
        return instance.get('/ping')
    },
    sendPingData() {
        return instance.post('/ping', {frontTime: Date.now()})
    }
}

export type UserType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}
