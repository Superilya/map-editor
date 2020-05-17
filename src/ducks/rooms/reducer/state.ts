import { InferValueTypes } from 'src/types/common';
import { RoomsActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = {
    isRoomsLoading: boolean;
};

export const initialState: StateType = {
    isRoomsLoading: false
};

export const state = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case RoomsActionType.GET_ROOMS: {
            return {
                ...state,
                isRoomsLoading: true
            }
        }

        case RoomsActionType.GET_ROOMS_FAILED:
        case RoomsActionType.GET_ROOMS_SUCCESS: {
            return {
                ...state,
                isRoomsLoading: false
            };
        }

        default: {
            return state;
        }
    }
};