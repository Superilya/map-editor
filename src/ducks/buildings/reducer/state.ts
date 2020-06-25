import { InferValueTypes } from 'src/types/common';
import { BuildingsActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = {
    isBuildingsLoading: boolean;
};

export const initialState: StateType = {
    isBuildingsLoading: false,
};

export const state = (
    reducerState = initialState,
    action: ActionTypes
): StateType => {
    switch (action.type) {
        case BuildingsActionType.GET_BUILDINGS: {
            return {
                ...reducerState,
                isBuildingsLoading: true,
            };
        }

        case BuildingsActionType.GET_BUILDINGS_FAILED:
        case BuildingsActionType.GET_BUILDINGS_SUCCESS: {
            return {
                ...reducerState,
                isBuildingsLoading: false,
            };
        }

        default: {
            return reducerState;
        }
    }
};
