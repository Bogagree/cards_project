import {cardAPI, CardsType, CreateCardsType, UpdateCardsType} from "../../api/cards-api";
import {AppThunkType} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";

const cardsInitialState = {
  cards: [] as Array<CardsType>,
  packUserId: '',
  packName: '',
  packId: ''
}

export const cardsReducer = (state: CardsStateType = cardsInitialState, action: CardsActionType):CardsStateType => {
  switch (action.type) {
    case "CARDS/SET-CARDS": return {...state, ...action.payload.cards}

    default: return state
  }
}

export const setCardsAC = (cards: CardsStateType) => ({type: 'CARDS/SET-CARDS', payload: {cards}}as const)
export const setPackIdAC = (packId: string) => ({type: 'CARDS/SET-PACK-ID', payload: {packId}}as const)

export const getCardsTC = (packId: string): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const cards = await cardAPI.getCard(packId)
    dispatch(setCardsAC({...cards.data, packId}))
  }catch (e) {
    alert(e)
  }finally {
    dispatch(setAppStatusAC('succeeded'))
  }
}

export const createCardTC = (createCardData: CreateCardsType): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res =  await cardAPI.createCard(createCardData)
    dispatch(getCardsTC(createCardData.cardsPack_id))
  }catch (e) {
    alert(e)
  }finally {
    dispatch(setAppStatusAC('succeeded'))
  }
}
export const updateCardTC = (updateCardData: UpdateCardsType, packId: string): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    await cardAPI.updateCard(updateCardData)
    dispatch(getCardsTC(packId))
  }catch (e) {
    alert(e)
  }finally {
    dispatch(setAppStatusAC('succeeded'))
  }
}
export const deleteCardTC = (cardID: string, packId: string): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    await cardAPI.deleteCards(cardID)
    dispatch(getCardsTC(packId))
  }catch (e) {
    alert(e)
  }finally {
    dispatch(setAppStatusAC('succeeded'))
  }
}

export type CardsStateType = typeof cardsInitialState
export type CardsActionType = ReturnType<typeof setCardsAC> | ReturnType<typeof setPackIdAC>