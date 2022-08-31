type ActionType = {
    type: string
}

const initialState = {}

export const appReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        default:
            return state
    }
};
