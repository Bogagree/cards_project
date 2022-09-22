import {ActionsType} from "./store";
import {authAPI} from "../api/cards-api";
import {loginAC, setIsLogged} from "../features/auth/auth-reducer";
import {Dispatch} from "redux";
import {handleServerAppError} from "../common/error-utils";
import {AxiosError} from "axios";

const initialState = {
    appStatus: 'idle' as RequestStatusType,
    isInitialized: false,
    error: null as Nullable<string>
}


export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, appStatus: action.status}
        case 'SET-APP-INITIALIZED':
        case 'APP/SET-ERROR':
            return {...state, ...action.payload}
        default:
            return state
    }
};

//actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitialized = (isInitialized: boolean) => ({
    type: 'SET-APP-INITIALIZED',
    payload: {isInitialized}
} as const);
export const setAppError = (error: Nullable<string>) => ({type: 'APP/SET-ERROR', payload: {error}} as const);


//thunk
// export const authMeTC = (): AppThunkType => async dispatch => {
//     try {
//         const res = await authAPI.authMe()
//         dispatch(loginAC(res))
//     } catch (error: any) {
//         alert('AUTH_ME : ' + error.response.data.error)
//     }
// }

export const initializedTC = () => async (dispatch: Dispatch<ActionsType>) => {
    try {
        const res = await authAPI.authMe();
        if (res.data) {
            dispatch(loginAC(res.data))
            dispatch(setIsLogged(true));
            dispatch(setAppInitialized(true));
        }
    } catch (e) {
        handleServerAppError(e as AxiosError, dispatch)
    } finally {
        dispatch(setAppInitialized(true));
    }
};

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppInitialized>
    | ReturnType<typeof setAppError>

export type InitialStateType = typeof initialState;

export type Nullable<T> = T | null;