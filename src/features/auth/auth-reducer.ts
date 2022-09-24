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
            return {...state, user: {...action.userData}, isLogged: true}
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, ...action.payload};
        case 'AUTH/CHANGE-USER':
            return {...state, user: {...state.user, name: action.name}}
        case 'AUTH/SET-IS-REGISTERED':
            return {...state, ...action.payload};
        default:
            return state
    }
};

//Actions
export const loginAC = (userData: UserType) => ({type: 'AUTH/LOGIN', userData} as const)
export const setIsLogged = (isLogged: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', payload: {isLogged}} as const);
export const changeUserAC = (name: string) => ({type: 'AUTH/CHANGE-USER', name} as const)
export const setIsRegistered = (isRegistered: boolean) => ({
    type: 'AUTH/SET-IS-REGISTERED',
    payload: {isRegistered}
} as const);


// Thunks
export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(email, password, rememberMe)
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
        dispatch(loginTC(data.email, data.password, false))
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

export type LogoutResponseType = {
    info: string
    error: string;
}