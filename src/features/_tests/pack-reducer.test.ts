import {testPacksListData} from "../packs/PacksListContainer";
import {packsReducer, PacksStateType, setPacks} from "../packs/packs-reducer";
import {PackType} from "../../api/cards-api";

let state: PacksStateType
let pack: PackType


beforeEach(() => {
    state = {
        cardPacks: testPacksListData,
        pageCount: 10,
        queryParams: {},
        page: 1,
        cardPacksTotalCount: 10,
        maxCardsCount: 0,
        minCardsCount: 0,
    }
    pack = {
        cardsCount: 100500,
        created: "2022-09-26T09:26:35.044Z",
        deckCover: "url or base64",
        grade: 0,
        more_id: "63254ef1a16ae23408f00693",
        name: "1",
        path: "/def",
        private: false,
        rating: 0,
        shots: 0,
        type: "pack",
        updated: "2022-09-26T16:46:59.706Z",
        user_id: "63254ef1a16ae23408f00693",
        user_name: "Bogagree",
        __v: 0,
        _id: "6331704b3c22f21db471fa5a",
    }

})

test('set cards packs', () => {
    let newState = packsReducer(state, setPacks([pack]))

    expect(newState.cardPacks.length).toBe(5)
    expect(newState.cardPacks[4].user_name).toBe('Bogagree')
});