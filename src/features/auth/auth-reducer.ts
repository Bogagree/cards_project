type ActionType = {
    type: string
}

const initialState = {}

export const authReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        default:
            return state
    }
};