import {AppThunkType} from "./store";
import {authAPI} from "../api/cards-api";
import {loginAC, setIsLogged} from "../features/auth/auth-reducer";
import {setPacksParams} from '../features/packs/packs-reducer';

const initialState = {
    appStatus: 'idle' as RequestStatusType,
    isInitialized: false,
    error: null as Nullable<string>
}


export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, appStatus: action.status}
        case 'APP/SET-APP-INITIALIZED':
        case 'APP/SET-ERROR':
            return {...state, ...action.payload}
        default:
            return state
    }
};

//actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitialized = (isInitialized: boolean) => ({
    type: 'APP/SET-APP-INITIALIZED',
    payload: {isInitialized}
} as const);
export const setAppError = (error: Nullable<string>) => ({type: 'APP/SET-ERROR', payload: {error}} as const);


//thunk

export const initializedTC = (): AppThunkType => async dispatch => {
    try {
        const res = await authAPI.authMe();
        if (res.data) {
            dispatch(loginAC(res.data))
            dispatch(setIsLogged(true));
            dispatch(setAppInitialized(true));
        } else {
            // handleAppError()
        }
    } finally {
        dispatch(setAppInitialized(true));
    }
};


//types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppInitialized>
    | ReturnType<typeof setAppError>

export type InitialStateType = typeof initialState;

export type Nullable<T> = T | null;