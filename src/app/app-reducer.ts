export type AppActionType = {
    type: string
}

const initialState = {}

export const appReducer = (state = initialState, action: AppActionType) => {
    switch (action.type) {
        default:
            return state
    }
};