import {
  cardAPI,
  CardsParamsType, CardsResponseType,
  CardsType,
  CreateCardsType,
  UpdateCardsType, UpdatedGradeRequestType, UpdatedGradeType,
} from "../../api/cards-api";
import {AppThunkType} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../common/Components/ErrorComponents/Error-utils/error-utils";

const cardsInitialState = {
  cards: [] as CardsType[],
  packUserId: '',
  packName: '',
  packId: '',
  learnCard: {} as CardsType,
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
      return {...state, ...action.payload}
    case "CARDS/SET-CARDS-PARAMS":
      return {...state, queryParams: {...state.queryParams, ...action.payload}}
    case "CARDS/SET-PACK-ID":
      return {...state, packId: action.packId}
    case "CARDS/SET-PACK-USER-ID":
      return {...state, packUserId: action.packUserId}
    case "CARDS/UPDATE-GRADE":
      return {...state, cards: state.cards.map(
        c => c._id === action.updatedGrade.updatedGrade.card_id ?
          {...c , grade: action.updatedGrade.updatedGrade.grade, shots: action.updatedGrade.updatedGrade.shots } : c
        )}
    case "CARDS/GET-RANDOM-CARD":
      return {...state, learnCard: action.payload}
    default:
      return state
  }
}

export const setCardsAC = (cards: CardsResponseType) => ({type: 'CARDS/SET-CARDS', payload: cards} as const)
export const setPackIdAC = (packId: string) => ({type: 'CARDS/SET-PACK-ID', packId} as const)
export const setPackUserIdAC = (packUserId: string) => ({type: 'CARDS/SET-PACK-USER-ID', packUserId} as const)
export const setCardsParams = (queryParams: CardsParamsType) => ({
  type: 'CARDS/SET-CARDS-PARAMS',
  payload: queryParams
} as const)

const updateGradeAC = (updatedGrade: UpdatedGradeType) => ({
  type: 'CARDS/UPDATE-GRADE', updatedGrade
}as const)

export const getRandomCardAC = (cards: CardsType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
      return {sum: newSum, id: newSum < rand ? i : acc.id}
    }
    , {sum: 0, id: -1});
  return {type: 'CARDS/GET-RANDOM-CARD', payload: cards[res.id + 1]}as const
}

export const getCardsTC = (): AppThunkType => async (dispatch, getState) => {

  dispatch(setAppStatusAC('loading'))
  const params = getState().cards.queryParams

  try {
    const cards = await cardAPI.getCard(params)
    dispatch(setCardsAC(cards.data))
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
export const updateGradeTC = (updatedGradeDataRequest: UpdatedGradeRequestType): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await cardAPI.updateGrade(updatedGradeDataRequest)
    dispatch(updateGradeAC({updatedGrade: res.data.updatedGrade}))
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  } finally {
    dispatch(setAppStatusAC('succeeded'))
  }
}

export type CardsStateType = typeof cardsInitialState
export type CardsActionType = ReturnType<typeof setCardsAC>
  | ReturnType<typeof setPackIdAC>
  | ReturnType<typeof setCardsParams>
  | ReturnType<typeof setPackUserIdAC>
  | ReturnType<typeof updateGradeAC>
  | ReturnType<typeof getRandomCardAC>