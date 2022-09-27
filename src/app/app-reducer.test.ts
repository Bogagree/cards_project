import {
    appReducer,
    InitialStateType,
    Nullable,
    RequestStatusType, setAppError,
    setAppInitialized,
    setAppStatusAC
} from './app-reducer';

let state: InitialStateType

beforeEach(() => {
    state = {
        appStatus: 'idle' as RequestStatusType,
        isInitialized: false,
        error: null as Nullable<string>
    }
})

test('set status', () => {
    const appReducer1 = appReducer(state, setAppStatusAC("loading"))
    expect(appReducer1.appStatus).toBe("loading")
})

test('set in initialized', () => {
    const appReducer1 = appReducer(state, setAppInitialized(true))
    expect(appReducer1.isInitialized).toBe(true)
})

test('set error', () => {
    const appReducer1 = appReducer(state, setAppError('Error messages'))
    expect(appReducer1.error).toBe('Error messages')
})