import {authAPI, ForgotDataType, PasswordDataType, UpdateUserType, UserType} from '../../api/cards-api';
import {AppThunkType} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {handleServerNetworkError} from '../../common/Components/ErrorComponents/Error-utils/error-utils';

const initialState: initialStateType = {
    isLogged: false,
    isRegistered: false,
    forgotPasswordSuccess: false,
    newPasswordSuccess: false,
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
        case 'AUTH/LOGIN':
            return {...state, user: {...action.payload.userData}, isLogged: true}
        case 'AUTH/SET-IS-LOGGED-IN':
        case 'AUTH/SET-IS-REGISTERED':
        case 'AUTH/SET-FORGOT-PASSWORD-SUCCESS':
        case 'AUTH/SET-NEW-PASSWORD-SUCCESS':
            return {...state, ...action.payload};
        case 'AUTH/CHANGE-USER':
            return {...state, user: {...state.user, ...action.payload}}
        default:
            return state
    }
};

//Actions
export const loginAC = (userData: UserType) => ({type: 'AUTH/LOGIN', payload: {userData}} as const)
export const setIsLogged = (isLogged: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', payload: {isLogged}} as const);
export const changeUserAC = (data: UserType) => ({type: 'AUTH/CHANGE-USER', payload: data} as const)
export const setIsRegistered = (isRegistered: boolean) => ({
    type: 'AUTH/SET-IS-REGISTERED',
    payload: {isRegistered}
} as const);
export const setForgotPasswordSuccessAC = (forgotPasswordSuccess: boolean) => ({
    type: 'AUTH/SET-FORGOT-PASSWORD-SUCCESS',
    payload: {forgotPasswordSuccess}
} as const);
export const setNewPasswordSuccessAC = (newPasswordSuccess: boolean) => ({
    type: 'AUTH/SET-NEW-PASSWORD-SUCCESS',
    payload: {newPasswordSuccess}
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
        await authAPI.registration(data)
        dispatch(setIsRegistered(true))
        dispatch(loginTC({...data, rememberMe: false}))
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const sendPingDataTC = (): AppThunkType => async () => {
    try {
        const res2 = await authAPI.sendPingData()
        console.log(res2.data)
    } catch (e) {

    }
}

export const logoutTC = (): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
        await authAPI.logout()
        dispatch(setIsLogged(false));
        dispatch(setIsRegistered(false))
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppStatusAC('succeeded'));
    }
}

export const changeUserTC = (data: UpdateUserType): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.updateUser(data)
        dispatch(changeUserAC(res.data.updatedUser))
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const forgotTC = (forgotData: ForgotDataType): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.forgot(forgotData)
        dispatch(setForgotPasswordSuccessAC(true))
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const newPasswordTC = (passwordData: PasswordDataType): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.newPassword(passwordData)
        dispatch(setNewPasswordSuccessAC(true))
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
    | ReturnType<typeof setForgotPasswordSuccessAC>
    | ReturnType<typeof setNewPasswordSuccessAC>

export type initialStateType = {
    isLogged: boolean
    isRegistered: boolean
    forgotPasswordSuccess: boolean
    newPasswordSuccess: boolean
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