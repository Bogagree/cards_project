import {authAPI, UserType} from "../../api/cards-api";
import {AppThunkType} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../common/Error-utils/error-utils";

const initialState: initialStateType = {
    isLogged: false,
    isRegistered: false,
    user: {
        avatar: '',
        created: '',
        email: '',
        isAdmin: false,
        name: '',
        publicCardPacksCount: 0,
        rememberMe: false,
        token: '',
        tokenDeathTime: 0,
        updated: '',
        verified: false,
        __v: 0,
        _id: '',
    }
}

export const authReducer = (state = initialState, action: AuthActionType): initialStateType => {
    switch (action.type) {
        case "AUTH/LOGIN":
            return {...state, user: {...action.payload.userData}, isLogged: true}
        case 'AUTH/SET-IS-LOGGED-IN':
        case 'AUTH/SET-IS-REGISTERED':
            return {...state, ...action.payload};
        case 'AUTH/CHANGE-USER':
            return {...state, user: {...state.user, name: action.payload.name}}
        default:
            return state
    }
};

//Actions
export const loginAC = (userData: UserType) => ({type: 'AUTH/LOGIN', payload: {userData}} as const)
export const setIsLogged = (isLogged: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', payload: {isLogged}} as const);
export const changeUserAC = (name: string) => ({type: 'AUTH/CHANGE-USER', payload: {name}} as const)
export const setIsRegistered = (isRegistered: boolean) => ({
    type: 'AUTH/SET-IS-REGISTERED',
    payload: {isRegistered}
} as const);


// Thunks
export const loginTC = (loginData: LoginDataType): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(loginData)
        dispatch(loginAC(res))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}


export const registrationTC = (data: RegistrationDataType): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.registration(data)
        console.log('server response', res)
        dispatch(setIsRegistered(true))
        dispatch(loginTC({...data, rememberMe: false}))
    } catch (e) {
        console.log(e)
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const sendPingDataTC = (): AppThunkType => async dispatch => {
    try {
        const res2 = await authAPI.sendPingData()
        console.log(res2.data)
    } catch (e) {

    }
}

export const logoutTC = (): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await authAPI.logout()
        console.log(res)
        dispatch(setIsLogged(false));
        dispatch(setIsRegistered(false))
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppStatusAC('succeeded'));
    }
}

export const changeUserTC = (name: string): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.updateUser(name)
        dispatch(changeUserAC(res.data.updatedUser.name))
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

// Types

export type AuthActionType = ReturnType<typeof loginAC>
    | ReturnType<typeof changeUserAC>
    | ReturnType<typeof setIsLogged>
    | ReturnType<typeof setIsRegistered>

type initialStateType = {
    isLogged: boolean
    isRegistered: boolean
    user: UserType
}

export type RegistrationDataType = {
    email: string
    password: string
}

export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}