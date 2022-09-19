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
        console.log(res.data)
    } catch (e) {

        }
    }
