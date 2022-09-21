import {ActionsType, AppThunkType} from "./store";
import {authAPI} from "../api/cards-api";
import {loginAC, setIsLogged} from "../features/auth/auth-reducer";
import {Dispatch} from "redux";

const initialState = {
    appStatus: 'idle' as RequestStatusType,
    isInitialized: false,
}

export const appReducer = (state = initialState, action: AppActionType) => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, appStatus: action.status}
        case 'SET-APP-INITIALIZED':
            return {...state, ...action.payload}
        default:
            return state
    }
};

//actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitialized = (isInitialized: boolean) => ({type: 'SET-APP-INITIALIZED', payload: {isInitialized}} as const);


//thunk
export const authMeTC = (): AppThunkType => async dispatch => {
    try {
        const res = await authAPI.authMe()
        dispatch(loginAC(res))
    } catch (error: any) {
        alert('AUTH_ME : ' + error.response.data.error)
    }
}

export const initializedTC = () => async (dispatch: Dispatch<ActionsType>) => {
    try {
        const res = await authAPI.authMe();
        console.log(res)
        dispatch(loginAC(res))
        dispatch(setIsLogged(true));
        dispatch(setAppInitialized(true));
    }
    finally {
        dispatch(setAppInitialized(true));
    }
};

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppInitialized>
