import { InferValueTypes } from 'src/types/common';
import { RoomEditinActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = {
    isSubmitting: boolean;
};

export const initialState: StateType = {
    isSubmitting: false,
};

export const state = (
    reducerState = initialState,
    action: ActionTypes
): StateType => {
    switch (action.type) {
        case RoomEditinActionType.EDIT_SUBMIT: {
            return {
                ...reducerState,
                isSubmitting: true,
            };
        }

        case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
        case RoomEditinActionType.EDIT_SUBMIT_FAILED: {
            return {
                ...reducerState,
                isSubmitting: false,
            };
        }

        default: {
            return reducerState;
        }
    }
};
