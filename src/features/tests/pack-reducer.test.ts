import {PacksStateType} from "../packs/packs-reducer";
import {PackType} from "../../api/cards-api";


export const testPacksListData = [
    {
        cardsCount: 0,
        created: "2022-09-26T19:39:37.156Z",
        grade: 0,
        more_id: "632ed6ddd2aeef10c8908d8b",
        name: "1",
        path: "/def",
        private: false,
        rating: 0,
        shots: 0,
        type: "pack",
        updated: "2022-09-26T19:39:37.156Z",
        user_id: "632ed6ddd2aeef10c8908d8b",
        user_name: "a",
        __v: 0,
        _id: "6331fff9174cfb0118ea9d4b"
    },
    {
        cardsCount: 0,
        created: "2022-09-26T19:14:57.809Z",
        grade: 0,
        more_id: "6328a8602e93f416e0e31d82",
        name: "12345 title test 12345",
        path: "/def",
        private: false,
        rating: 0,
        shots: 0,
        type: "pack",
        updated: "2022-09-26T19:15:28.783Z",
        user_id: "6328a8602e93f416e0e31d82",
        user_name: "aweaw",
        __v: 0,
        _id: "6331fa313d46fd2cd4d253eb"
    },
    {
        cardsCount: 3,
        created: "2022-09-26T15:15:41.072Z",
        grade: 0,
        more_id: "6328a8602e93f416e0e31d82",
        name: "test test test",
        path: "/def",
        private: false,
        rating: 0,
        shots: 0,
        type: "pack",
        updated: "2022-09-26T18:33:31.378Z",
        user_id: "6328a8602e93f416e0e31d82",
        user_name: "aweaw",
        __v: 0,
        _id: "6331c21d3d46fd2cd4d253e5",
    },
    {
        cardsCount: 17,
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
        user_name: "engy",
        __v: 0,
        _id: "6331704b3c22f21db471fa5a",
    }
]

let state: PacksStateType
let pack: PackType


beforeEach(() => {
    // state = {
    //     cardPacks: testPacksListData,
    //     pageCount: 10,
    //     queryParams: {},
    //     page: 1,
    //     cardPacksTotalCount: 10,
    //     maxCardsCount: 0,
    //     minCardsCount: 0,
    // }
    //
    // pack = {
    //     cardsCount: 100500,
    //     created: "2022-09-26T09:26:35.044Z",
    //     deckCover: "url or base64",
    //     grade: 0,
    //     more_id: "63254ef1a16ae23408f00693",
    //     name: "1",
    //     path: "/def",
    //     private: false,
    //     rating: 0,
    //     shots: 0,
    //     type: "pack",
    //     updated: "2022-09-26T16:46:59.706Z",
    //     user_id: "63254ef1a16ae23408f00693",
    //     user_name: "Bogagree",
    //     __v: 0,
    //     _id: "6331704b3c22f21db471fa5a",
    // }

})

test('set cards packs', () => {
    // let newState = packsReducer(state, setPacks([pack]))
    //
    // expect(newState.cardPacks.length).toBe(5)
    // expect(newState.cardPacks[4].user_name).toBe('Bogagree')
});