import {cardAPI, CardsParamsType, CardsType, CreateCardsType, UpdateCardsType} from "../../api/cards-api";
import {AppThunkType} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";

const cardsInitialState = {
    cards: [] as CardsType[],
    packUserId: '',
    packName: '',
    packId: '',
    queryParams: {
        cardsPack_id: '',
        pageCount: 10,
        cardQuestion: '',
        page: 1
    } as CardsParamsType
}

export const cardsReducer = (state: CardsStateType = cardsInitialState, action: CardsActionType): CardsStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {...state,  cards: [...action.payload]}
        case "CARDS/SET-CARDS-PARAMS":
            return {...state, queryParams: { ...state.queryParams, ...action.payload}}
        case "CARDS/SET-PACK-ID":
            return {...state, packId: action.packId}
        case "CARDS/SET-PACK-USER-ID":
            return {...state, packUserId: action.packUserId}
        default:
            return state
    }
}

export const setCardsAC = (cards: CardsType[]) => ({type: 'CARDS/SET-CARDS', payload: cards} as const)
export const setPackIdAC = (packId: string) => ({type: 'CARDS/SET-PACK-ID', packId} as const)
export const setPackUserIdAC = (packUserId: string) => ({type: 'CARDS/SET-PACK-USER-ID', packUserId} as const)
export const setCardsParams = (queryParams: CardsParamsType) => ({
    type: 'CARDS/SET-CARDS-PARAMS',
    payload: queryParams
} as const)

export const getCardsTC = (): AppThunkType => async (dispatch, getState) => {

    dispatch(setAppStatusAC('loading'))
    const params = getState().cards.queryParams

    try {
        const cards = await cardAPI.getCard(params)
        dispatch(setCardsAC(cards.data.cards))
        dispatch(setPackUserIdAC(cards.data.packUserId))
    } catch (e) {
        // alert(e)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const createCardTC = (createCardData: CreateCardsType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        await cardAPI.createCard(createCardData)
        dispatch(getCardsTC())
    } catch (e) {
        alert(e)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
export const updateCardTC = (updateCardData: UpdateCardsType, packId: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardAPI.updateCard(updateCardData)
        dispatch(getCardsTC())
    } catch (e) {
        alert(e)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
export const deleteCardTC = (cardID: string, packId: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardAPI.deleteCards(cardID)
        dispatch(getCardsTC())
    } catch (e) {
        alert(e)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export type CardsStateType = typeof cardsInitialState
export type CardsActionType = ReturnType<typeof setCardsAC>
    | ReturnType<typeof setPackIdAC>
    | ReturnType<typeof setCardsParams>
    | ReturnType<typeof setPackUserIdAC>