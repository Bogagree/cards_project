import {AppThunkType} from "../../app/store";
import {packAPI, PacksResponseType, PackType, UpdatePackType} from "../../api/cards-api";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../common/Components/ErrorComponents/Error-utils/error-utils";


const PacksInitialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    pageCount: 5,
    queryParams: {
      pageCount: 5,
      page: 1,
      user_id: ''
    } as PacksParamsType
}


export const packsReducer = (state: PacksStateType = PacksInitialState, action: PackActionType): PacksStateType => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
            return { ...state, ...action.payload.packs}
        case "PACKS/SET-PAGE-COUNT":
            return {...state, pageCount: action.payload.pageCount}
        case "PACKS/SET-PACKS-PARAMS":
            return {...state, queryParams: {...state.queryParams ,...action.payload.queryParams}}
        default:
            return state
    }
};


//actions
export const setPacks = (packs: PacksResponseType) => ({type: 'PACKS/SET-PACKS', payload: {packs}} as const)
export const setPageCount = (pageCount: number) => ({
    type: 'PACKS/SET-PAGE-COUNT',
    payload: {pageCount: pageCount}
} as const)
export const setPacksParams = (queryParams: PacksParamsType) =>
    ({type: 'PACKS/SET-PACKS-PARAMS', payload: {queryParams}} as const);

//thunks
export const getPacksTC = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packAPI.getPack(getState().packs.queryParams);
        dispatch(setPacks(res.data))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const createPackCardsTC = (): AppThunkType => async dispatch => {
    try {
        await packAPI.createPack({name: 'new Pack'})
      dispatch(getPacksTC())
    } catch (e) {
        console.log(e)
    }
}
export const deletePackCardsTC = (packId: string): AppThunkType => async dispatch => {
  try {
    await packAPI.deletePack(packId)
    dispatch(getPacksTC())
  }catch (e) {

  }finally {

  }
}
export const updatePackCardsTC = (updatePackData: UpdatePackType): AppThunkType => async dispatch => {
  try {
    await packAPI.updatePack(updatePackData)
    dispatch(getPacksTC())
  }catch (e) {

  }finally {

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