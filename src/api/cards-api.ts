import axios, {AxiosResponse} from 'axios'
import {LoginDataType, RegistrationDataType} from "../features/auth/auth-reducer";

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(loginData: LoginDataType) {
    return instance.post<LoginDataType, AxiosResponse<UserType>>('auth/login', loginData)
      .then(res => res.data)
  },
  authMe() {
    return instance.post<UserType>('/auth/me', {})
    // .then(res => res.data)
  },
  updateUser(name: string) {
    return instance.put<{ name: string }, AxiosResponse<{ updatedUser: UserType }>>('/auth/me', {name: name})
  },
  logout() {
    return instance.delete<{ info: string }>('auth/me')
  },
  registration(data: RegistrationDataType) {
    return instance.post<RegistrationDataType, AxiosResponse<RegistrationResponseType>>('auth/register', {...data})
  },
  sendPingData() {
    return instance.post<PingResponseType>('/ping', {frontTime: Date.now()})
  }
}

export const packAPI = {}

export const cardAPI = {}

export type PingResponseType = {
  ping: number
  backTime: number
  frontTime: number
  info: string
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
export type RegistrationResponseType = {
  addedUser: {
    created: string
    email: string
    isAdmin: boolean
    name:string
    publicCardPacksCount: number
    rememberMe:boolean
    updated: string
    verified: boolean
    __v: number
    _id: string
  }
}
