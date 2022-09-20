import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionType, appReducer} from './app-reducer'
import {AuthActionType, authReducer} from "../features/auth/auth-reducer";
import {forgotReducer} from "../features/forgot/forgot-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    forgot: forgotReducer,
})

export type AppStateType = ReturnType<typeof reducers>

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateType,unknown,AnyAction> & AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

export type AppDispatch = typeof store.dispatch


export type ActionsType = AppActionType | AuthActionType

export type AppThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

// @ts-ignore
window.store = store;