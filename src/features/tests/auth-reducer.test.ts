import {
    authReducer,
    initialStateType,
    loginAC,
    setForgotPasswordSuccessAC,
    setIsLogged,
    setIsRegistered,
    setNewPasswordSuccessAC,
} from '../auth/auth-reducer';
import {UserType} from '../../api/cards-api';

let state: initialStateType
let userInfo: UserType

beforeEach(() => {
    state = {
        isLogged: false,
        isRegistered: false,
        forgotPasswordSuccess: false,
        newPasswordSuccess: false,
        user: {
            avatar: '',
            created: '',
            email: '',
            isAdmin: false,
            name: '',
            publicCardPacksCount: 0,
            rememberMe: false,
            token: '',
            tokenDeathTime: 0,
            updated: '',
            verified: false,
            __v: 0,
            _id: '',
        }
    }
    userInfo = {
        avatar: '',
        created: '',
        email: 'ivan@mail.ru',
        isAdmin: false,
        name: 'Ivan',
        publicCardPacksCount: 7,
        rememberMe: false,
        token: '',
        tokenDeathTime: 0,
        updated: '',
        verified: false,
        __v: 0,
        _id: '',
    }
})

test('set is logged in', () => {
    const authReducer1 = authReducer(state, setIsLogged(true))
    expect(authReducer1.isLogged).toBe(true)
})

test('set is registred', () => {
    const authReducer1 = authReducer(state, setIsRegistered(false))
    expect(authReducer1.isRegistered).toBe(false)
})

test('set user info', () => {
    const authReducer1 = authReducer(state, loginAC(userInfo))
    if (authReducer1.user) {
        expect(authReducer1.user.name).toBe('Ivan')
        expect(authReducer1.user.email).toBe('ivan@mail.ru')
        expect(authReducer1.user.publicCardPacksCount).toBe(7)
    }
})

test('forgot password success', () => {
    const forgotPass = authReducer(state, setForgotPasswordSuccessAC(true))
    expect(forgotPass.forgotPasswordSuccess).toBe(true)
})

test('set new password', () => {
    const newPass = authReducer(state, setNewPasswordSuccessAC(true))
    expect(newPass.newPasswordSuccess).toBe(true)
})