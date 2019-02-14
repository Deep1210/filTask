import {
    FETCH_BEGIN,
    FETCH_SUCCESS,
    FETCH_FAILURE
} from "./Actions";

const initialState = {
    jsonData: {},
    loading: true,
    error: null
};

export default function testReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case FETCH_BEGIN:

            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_SUCCESS:

            return {
                ...state,
                loading: false,
                jsonData: action.payload
            };

        case FETCH_FAILURE:

            return {
                ...state,
                loading: false,
                error: action.payload.error,
                jsonData:{}
            };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}
