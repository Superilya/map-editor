import { InferValueTypes } from 'src/types/common';
import { Building } from 'src/types/api';
import { BuildingsActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = Array<Building['id']>;

export const initialState: StateType = [];

export const list = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case BuildingsActionType.GET_BUILDINGS_SUCCESS: {
            return action.buildings.map(({ id }) => id);
        }

        default: {
            return state;
        }
    }
};
