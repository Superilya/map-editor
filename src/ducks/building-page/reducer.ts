
import { InferValueTypes } from 'src/types/common';
import { BuildingPageActionType } from './action-types';
import * as actions from './actions';
import { Building } from 'src/types/api';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = {
    currentFloor: Building['floors'][0] | null
};

export const initialState: StateType = {
    currentFloor: null
}

export const buildingPage = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case BuildingPageActionType.SET_FLOOR: {
            return {
                ...state,
                currentFloor: action.floor
            };
        }

        default: {
            return state;
        }
    }
};