import {AppThunkType} from "../../app/store";
import {packAPI, PacksResponseType, PackType, UpdatePackType, CreatePackType} from "../../api/cards-api";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../common/Components/ErrorComponents/Error-utils/error-utils";


const PacksInitialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    pageCount: 5,
    page: 1,
    queryParams: {
        pageCount: 5,
        page: 1,
        packName: '',
    } as PacksParamsType
}

export const packsReducer = (state: PacksStateType = PacksInitialState, action: PackActionType): PacksStateType => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
        case "PACKS/SET-PACKS-PAGE":
        case "PACKS/SET-PAGE-COUNT":
        case "PACKS/SET-PACKS-PARAMS":
            return {...state, ...action.payload}
        default:
            return state
    }
};

//actions
export const setPacks = (packs: PacksResponseType) => ({type: 'PACKS/SET-PACKS', payload: packs} as const)
export const setPacksPage = (page: number) => ({type: 'PACKS/SET-PACKS-PAGE', payload: {page}} as const);
export const setPageCount = (pageCount: number) => ({type: 'PACKS/SET-PAGE-COUNT', payload: {pageCount}} as const)
export const setPacksParams = (queryParams: PacksParamsType) => ({
    type: 'PACKS/SET-PACKS-PARAMS',
    payload: queryParams
} as const);

//thunks
export const getPacksTC = (queryParams: PacksParamsType): AppThunkType => async (dispatch) => {
    console.log(queryParams)
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packAPI.getPack(queryParams);
        dispatch(setPacks(res.data))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const createPackCardsTC = (values: CreatePackType): AppThunkType => async (dispatch, getState) => {
    try {
        await packAPI.createPack(values)
        dispatch(getPacksTC(getState().packs.queryParams))
    } catch (e) {
        console.log(e)
    }
}
export const deletePackCardsTC = (packId: string): AppThunkType => async (dispatch, getState) => {
    try {
        await packAPI.deletePack(packId)
        dispatch(getPacksTC(getState().packs.queryParams))
    } catch (e) {
        alert(e)
    } finally {

    }
}
export const updatePackCardsTC = (updatePackData: UpdatePackType): AppThunkType => async (dispatch, getState) => {
    try {
        await packAPI.updatePack(updatePackData)
        dispatch(getPacksTC(getState().packs.queryParams))
    } catch (e) {

    } finally {

    }
}

// types
export type PackActionType = ReturnType<typeof setPacks>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof setPacksParams>
    | ReturnType<typeof setPacksPage>


export type PacksStateType = typeof PacksInitialState;

export type PacksParamsType = {
    packName?: string
    pageCount?: number;
    user_id?: string;
    page?: number
}