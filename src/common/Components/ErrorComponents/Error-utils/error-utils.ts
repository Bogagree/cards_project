import {Dispatch} from 'redux'
import {AppActionType, setAppError, setAppStatusAC} from "../../../../app/app-reducer";
import axios from "axios";

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch<AppActionType>) => {
    if (axios.isAxiosError(error)) {
        dispatch(setAppError(
            error.response?.data
                ? (error.response.data as { error: string }).error
                : error.message
        ))
    }
    dispatch(setAppStatusAC('failed'))
}


export const handleAppError = (error: string, dispatch: Dispatch<AppActionType>) => {
    dispatch(setAppError(error ? error : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}

