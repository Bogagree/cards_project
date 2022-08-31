import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'

import {appReducer} from './app-reducer'
import {authReducer} from "../features/auth/auth-reducer";
import {forgotReducer} from "../features/forgot/forgot-reducer";

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    forgot: forgotReducer,
})

export const store = createStore(reducers, applyMiddleware(thunk))