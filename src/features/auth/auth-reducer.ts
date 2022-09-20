import {Dispatch} from "redux";
import {authAPI} from "../../api/cards-api";

type ActionType = {
    name: string;
    type: string
}

const initialState = {

}

export const authReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'CHANGE-USER':
            return {
                ...state, user:{...state.user, name: action.name}
            }
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




export const changeUserAC = (name: string) => ({
    type: 'CHANGE-USER', name} as const)

export const changeUserTC = (name: string) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        const res = await authAPI.updateUser(name)
        dispatch(changeUserAC(res.data.updatedUser.name))
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    }
}

export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    try {
        const res = await authAPI.logout()
        console.log(res)
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    }
}

type ActionsType =
    | ReturnType<typeof changeUserAC>