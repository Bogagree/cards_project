import axios, {AxiosResponse} from 'axios'
import {LoginDataType, RegistrationDataType} from '../features/auth/auth-reducer';

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(loginData: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<UserType>>('auth/login', loginData)
            .then(res => res.data)
    },
    authMe() {
        return instance.post<UserType>('/auth/me', {})
        // .then(res => res.data)
    },
    updateUser(name: string) {
        return instance.put<{ name: string }, AxiosResponse<{ updatedUser: UserType }>>('/auth/me', {name: name})
    },
    logout() {
        return instance.delete<{ info: string }>('auth/me')
    },
    registration(data: RegistrationDataType) {
        return instance.post<RegistrationDataType, AxiosResponse<RegistrationResponseType>>('auth/register', {...data})
    },
    sendPingData() {
        return instance.post<PingResponseType>('/ping', {frontTime: Date.now()})
    }
}

export const packAPI = {
    getPack() {
        return instance.get<PacksResponseType>('cards/pack?pageCount=10')
    },
    createPack(createPackData: CreatePackType) {
        return instance.post<CreatePackType, AxiosResponse<NewCardsPackType>>('cards/pack', {createPackData})
    },
    updatePack(updatePackData: UpdatePackType) {
        return instance.put<UpdatePackType, AxiosResponse<UpdateCardsPackType>>('cards/pack', {updatePackData})
    },
    deletePack(packID: string) {
        return instance.delete<AxiosResponse<DeletePackType>>(`cards/pack?id=${packID}`)
    }
}

export const cardAPI = {
    getCard(packID: string) {
        return instance.get<ResponseCardsType>(`cards/card?cardsPack_id=${packID}`)
    },
    createCard(createCardData: CreateCardsType) {
        return instance.post('cards/card', {createCardData})
    },
    updateCard(updateCardData: UpdateCardsType) {
        return instance.put('cards/card', {updateCardData})
    },
    deleteCards(cardID: string) {
        return instance.delete(`cards/card?id=${cardID}`)
    }
}

//type authAPI
export type PingResponseType = {
    ping: number
    backTime: number
    frontTime: number
    info: string
}

export type UserType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}

export type RegistrationResponseType = {
    addedUser: {
        created: string
        email: string
        isAdmin: boolean
        name: string
        publicCardPacksCount: number
        rememberMe: boolean
        updated: string
        verified: boolean
        __v: number
        _id: string
    }
}

//type packsAPI
export type PacksResponseType = {
    cardPacks: PackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

export type PackType = {
    created: string
    grade: number
    user_name: string
    private: boolean
    more_id: string
    name: string
    path: string
    rating: number
    shots: number
    deckCover?: string
    cardsCount: number
    type: string
    updated: string
    user_id: string,
    __v: number
    _id: string
}

export type CreatePackType = {
    name: string
    deckCover?: string
    private?: boolean
}

export type NewCardsPackType = {
    newCardsPack: PackType
    token: string
    tokenDeathTime: number
}

export type DeletePackType = {
    deletedCardsPack: PackType
    token: string
    tokenDeathTime: number
}

export type UpdatePackType = {
    _id: string
    name?: string
}

export type UpdateCardsPackType = {
    updateCardsPack: PackType
    token: string
    tokenDeathTime: number
}

//type cardsAPI
export type ResponseCardsType = {
    cards: CardsType[];
    packUserId: string;
    packName: string;
    packPrivate: boolean;
    packDeckCover: string;
    packCreated: string;
    packUpdated: string;
    page: number;
    pageCount: number;
    cardsTotalCount: number;
    minGrade: number;
    maxGrade: number;
    token: string;
    tokenDeathTime: number;
}

export type CardsType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number;
    comments: string;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
}

export type CreateCardsType = {
    cardsPack_id: string
    question: string
    answer: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type UpdateCardsType = {
    _id: string
    question?: string
    comments?: string
}
