import { InferValueTypes } from 'src/types/common';
import { Area } from 'src/types/api';
import { ObjectTypes } from 'src/constants/objects';
import { AreasActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = Array<Area['id']>;

export const initialState: StateType = [];

export const objects = (
    state = initialState,
    action: ActionTypes
): StateType => {
    switch (action.type) {
        case AreasActionType.GET_MAP_OBJECTS_SUCCESS: {
            return action.areas
                .filter(({ objectType }) => objectType === ObjectTypes.OBJECT)
                .map(({ id }) => id);
        }

        default: {
            return state;
        }
    }
};
