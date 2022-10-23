import axios, {AxiosResponse} from 'axios'
import {LoginDataType, RegistrationDataType} from '../features/auth/auth-reducer';
import {PacksParamsType} from "../features/packs/packs-reducer";

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const instanceForgot = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(loginData: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<UserType>>('auth/login', loginData)
            .then(res => res.data)
    },
    authMe() {
        return instance.post<UserType>('auth/me', {})
    },
    updateUser(data: UpdateUserType) {
        return instance.put<UpdateUserType, AxiosResponse<{ updatedUser: UserType }>>('auth/me', data)
    },
    logout() {
        return instance.delete<{ info: string }>('auth/me')
    },
    registration(data: RegistrationDataType) {
        return instance.post<RegistrationDataType, AxiosResponse<RegistrationResponseType>>('auth/register', data)
    },
    sendPingData() {
        return instance.post<PingResponseType>('/ping', {frontTime: Date.now()})
    },
    forgot(forgotData: ForgotDataType) {
        return instanceForgot.post<ForgotDataType, AxiosResponse<ForgotDataResponseType>>('auth/forgot', forgotData)
    },
    newPassword(passwordData: PasswordDataType) {
        return instanceForgot.post<PasswordDataType, AxiosResponse<PasswordDataResponseType>>('auth/set-new-password', passwordData)
    }
}

export const packAPI = {
    getPack(params: PacksParamsType) {
        return instance.get<PacksResponseType>(`cards/pack`, {params})
    },
    createPack(cardsPack: CreatePackType) {
        return instance.post<CreatePackType, AxiosResponse<NewCardsPackType>>('cards/pack', {cardsPack})
    },
    updatePack(updatePackData: UpdatePackType) {
        return instance.put<UpdatePackType, AxiosResponse<UpdateCardsPackType>>('cards/pack', {cardsPack: updatePackData})
    },
    deletePack(packID: string) {
        return instance.delete<AxiosResponse<DeletePackType>>(`cards/pack?id=${packID}`)
    }
}

export const cardAPI = {
    getCard(params: CardsParamsType) {
        return instance.get<CardsResponseType>(`cards/card`, {params})
    },
    createCard(createCardData: CreateCardsType) {
        return instance.post('cards/card', {card: createCardData})
    },
    updateCard(updateCardData: UpdateCardsType) {
        return instance.put('cards/card', {card: updateCardData})
    },
    deleteCards(cardID: string) {
        return instance.delete(`cards/card?id=${cardID}`)
    },
    updateGrade(updatedGradeData: UpdatedGradeRequestType){
      return instance.put<UpdatedGradeType>('cards/grade', updatedGradeData)
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

export type ForgotDataType = {
    email: string
    message: string
}

export type ForgotDataResponseType = {
    info: string
    error: string
}

export type PasswordDataType = {
    password: string
    resetPasswordToken?: string
}

export type PasswordDataResponseType = {
    info: string
    error: string
}

export type UpdateUserType = {
    name?: string
    avatar?: string
}

//type packsAPI
export type PacksRequestType = {
    min?: string
    max?: string
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}
export type PacksResponseType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    page: number
    pageCount: number
    token?: string
    tokenDeathTime?: number
}

export type PackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    private: boolean
    name: string
    path: string
    rating: number
    shots: number
    deckCover?: string
    type: string
    updated: string
    user_id: string,
    __v: number
    _id: string
    user_name: string
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
    name: string
    private?: boolean
}

export type UpdateCardsPackType = {
    updateCardsPack: PackType
    token: string
    tokenDeathTime: number
}

//type cardsAPI
export type CardsResponseType = {
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
    user_id: string;
    cardsPack_id: string;
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

export type CardsParamsType = {
    cardsPack_id: string,
    pageCount?: number
    cardQuestion?: string
    page?: number
    cardAnswer?: string
    min?: number
    max?: number
    sortCards?: string
}


export type UpdateCardsType = {
    _id: string
    question?: string
    comments?: string
    answer?: string
}

export type UpdatedGradeRequestType = {
  grade: number
  card_id: string
}

export type UpdatedGradeType = {
  updatedGrade: {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}}