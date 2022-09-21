const initialState = {
  appStatus: 'idle' as RequestStatusType
}

export const appReducer = (state = initialState, action: AppActionType) => {
    switch (action.type) {
      case "APP/SET-STATUS": return {...state, appStatus: action.status}
      default:
            return state
    }
};

//actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

//thunk



export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionType = ReturnType<typeof setAppStatusAC>