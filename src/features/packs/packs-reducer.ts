import {AppThunkType} from "../../app/store";
import {packAPI, PackType} from "../../api/cards-api";
import {setAppStatusAC} from "../../app/app-reducer";


const PacksInitialState = {
    cardPacks: [] as PackType[],
    pageCount: 10
}


export const packsReducer = (state: PacksStateType = PacksInitialState, action: PackActionType): PacksStateType => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
        return {...state, cardPacks: [...action.payload.cardPacks]}
        default:
            return state
    }
};


//actions
export const setPacks = (cardPacks: PackType[]) => ({type: 'PACKS/SET-PACKS', payload: {cardPacks}} as const)
export const setPageCount = (selectedPageCount: number) => ({type: 'PACKS/SET-PAGE-COUNT', payload: {selectedPageCount}} as const)

//thunks
export const getPacksTC = (userId: string, currentPage: number): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packAPI.getPack(userId, currentPage);
        console.log(res)
        dispatch(setPacks(res.data.cardPacks))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

// types
export type PackActionType = ReturnType<typeof setPacks>
    | ReturnType<typeof setPageCount>

export type PacksStateType = typeof PacksInitialState;