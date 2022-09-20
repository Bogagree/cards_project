const initialState = {}

export const appReducer = (state = initialState, action: AppActionType) => {
    switch (action.type) {
        default:
            return state
    }
};

//actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

//thunk



export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionType = {
    type: string
}