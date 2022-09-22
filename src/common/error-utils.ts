
import {Dispatch} from 'redux'
import {LogoutResponseType} from "../features/auth/auth-reducer";
import {AppActionType, setAppError, setAppStatusAC} from "../app/app-reducer";

export const handleServerAppError = (data: LogoutResponseType, dispatch: Dispatch<AppActionType>) => {
    if (data) {
        dispatch(setAppError(data.error))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: string , dispatch: Dispatch<AppActionType>) => {
    dispatch(setAppError(error ? error : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}
