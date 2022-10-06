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
        // user_id: '',
        pageCount: 5,
        // page: 1,
        // packName: '',
        // min: 0,
        // max: 0,
        // sortPacks: ''
    } as PacksParamsType
}

export const packsReducer = (state: PacksStateType = PacksInitialState, action: PackActionType): PacksStateType => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
        case "PACKS/SET-PACKS-PAGE":
        case "PACKS/SET-PAGE-COUNT":
            return {...state, ...action.payload}
        case "PACKS/SET-PACKS-PARAMS":
            return {...state, queryParams: {...action.payload}}
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
export const getPacksTC = (): AppThunkType => async (dispatch,getState) => {

    dispatch(setAppStatusAC('loading'))

    const params = getState().packs.queryParams

    try {
        const res = await packAPI.getPack(params);
        dispatch(setPacks(res.data))

    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const createPackCardsTC = (values: CreatePackType): AppThunkType => async (dispatch,) => {
    try {
        await packAPI.createPack(values)
        dispatch(getPacksTC())
    } catch (e) {
        console.log(e)
    }
}
export const deletePackCardsTC = (packId: string): AppThunkType => async (dispatch) => {
    try {
        await packAPI.deletePack(packId)
        dispatch(getPacksTC())
    } catch (e) {
        alert(e)
    } finally {

    }
}
export const updatePackCardsTC = (updatePackData: UpdatePackType): AppThunkType => async (dispatch) => {
    try {
        await packAPI.updatePack(updatePackData)
        dispatch(getPacksTC())
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
    min?: number;
    max?: number;
    sortPacks?: string;
}