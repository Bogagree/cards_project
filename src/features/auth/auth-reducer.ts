import {Dispatch} from "redux";
import {authAPI} from "../../api/cards-api";

type ActionType = {
    type: string
}

const initialState = {}

export const authReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        default:
            return state
    }
};

export const loginTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.login()
    } catch (e) {

    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.logout()
        console.log(res)
    } catch (e) {

    }
}

export const registrationTC = (data: RegistrationDataType) => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.registration(data)
        console.log(res)
    } catch (e) {

    }
}

export const pingTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.ping()
        authAPI.sendPingData()
    } catch (e) {

    }
}

    export const sendPingDataTC = () => async (dispatch: Dispatch) => {
        try {
            const res2 = await authAPI.sendPingData()
            console.log(res2.data)
        } catch (e) {

        }
    }

    export type RegistrationDataType = {
        email: string
        password: string
    }