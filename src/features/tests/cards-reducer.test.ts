import {cardsReducer, CardsStateType, setCardsAC} from "../cards/cards-reducer";

let initialState: CardsStateType

beforeEach(() => {
  // initialState = {
  //   cards: [
  //     {
  //     _id: '11001',
  //     cardsPack_id: '22001',
  //     user_id: '33001',
  //     answer: 'answer 001',
  //     question: 'question 001',
  //     grade: 0,
  //     shots: 0,
  //     comments: 'comments 001',
  //     type: 'string',
  //     rating: 1,
  //     more_id: '11001',
  //     created: '01.01.01',
  //     updated: '02.01.01',
  //     __v: 0,
  //   },
  //   {
  //     _id: '11002',
  //     cardsPack_id: '22001',
  //     user_id: '33001',
  //     answer: 'answer 002',
  //     question: 'question 002',
  //     grade: 0,
  //     shots: 0,
  //     comments: 'comments 002',
  //     type: 'string',
  //     rating: 1,
  //     more_id: '11002',
  //     created: '01.02.01',
  //     updated: '02.02.01',
  //     __v: 0,
  //   },
  //   {
  //     _id: '11003',
  //     cardsPack_id: '22001',
  //     user_id: '33001',
  //     answer: 'answer 003',
  //     question: 'question 003',
  //     grade: 0,
  //     shots: 0,
  //     comments: 'comments 003',
  //     type: 'string',
  //     rating: 1,
  //     more_id: '11003',
  //     created: '01.03.01',
  //     updated: '02.03.01',
  //     __v: 0,
  //   },
  //   ],
  //   packUserId: '',
  //   packName: ''
  // }
})
//
// test('set cards', () => {
//   const state = {cards: [], packUserId: '', packName: ''}
//   const newState = cardsReducer(state, setCardsAC(initialState))
//   expect(newState.cards.length).toBe(3)
// })
// test('update cards data', () => {
//   const newCardsData = {
//     cards: [initialState.cards[0], initialState.cards[1]],
//     packUserId: '',
//     packName: ''
//   }
//   const newState = cardsReducer(initialState, setCardsAC(newCardsData))
//   expect(newState.cards.length).toBe(2)
// })