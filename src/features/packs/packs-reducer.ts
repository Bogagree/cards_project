import {AppThunkType} from "../../app/store";
import {packAPI, PackType} from "../../api/cards-api";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../common/Error-utils/error-utils";


const PacksInitialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 0,
    queryParams: {pageCount: 5} as PacksParamsType
}


export const packsReducer = (state: PacksStateType = PacksInitialState, action: PackActionType): PacksStateType => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
            return {...state, cardPacks: [...action.payload.cardPacks]}
        case "PACKS/SET-PAGE-COUNT":
            return {...state, ...action.payload}
        case "PACKS/SET-PACKS-PARAMS":
            return {...state, queryParams: {...action.payload.queryParams}}
        default:
            return state
    }
};


//actions
export const setPacks = (cardPacks: PackType[]) => ({type: 'PACKS/SET-PACKS', payload: {cardPacks}} as const)
export const setPageCount = (selectedPageCount: number) => ({
    type: 'PACKS/SET-PAGE-COUNT',
    payload: {selectedPageCount}
} as const)
export const setPacksParams = (queryParams: PacksParamsType) =>
    ({type: 'PACKS/SET-PACKS-PARAMS', payload: {queryParams}} as const);

//thunks
export const getPacksTC = (queryParams: PacksParamsType): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packAPI.getPack(queryParams);
        console.log(res)
        dispatch(setPacks(res.data.cardPacks))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const createPackCardsTC = (): AppThunkType => async dispatch => {
    try {
        await packAPI.createPack({name: 'new Pack'})
        // dispatch(getPacksTC('', 1, 10))
    } catch (e) {
        console.log(e)
    }
}

// types
export type PackActionType = ReturnType<typeof setPacks>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof setPacksParams>


export type PacksStateType = typeof PacksInitialState;

export type PacksParamsType = {
    pageCount?: number;
    user_id?: string;
    page?: number
}