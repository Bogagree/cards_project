import {AppThunkType} from "../../app/store";
import {packAPI, PackType} from "../../api/cards-api";
import {setAppStatusAC} from "../../app/app-reducer";


const PacksinitialState = {
    cardPacks: [] as PackType[]
}


export const packsReducer = (state: PacksStateType = PacksinitialState, action: PackActionType): PacksStateType => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
        return {...state,  cardPacks: [...action.payload.cardPacks]}
        default:
            return state
    }
};


//actions
export const setPacks = (cardPacks: PackType[]) => ({type: 'PACKS/SET-PACKS', payload: {cardPacks}} as const)

//thunks
export const getPacksTC = (userId: string): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packAPI.getPack(userId);
        console.log(res)
        dispatch(setPacks(res.data.cardPacks))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

// types
export type PackActionType = ReturnType<typeof setPacks>
export type PacksStateType = typeof PacksinitialState;