import { InferValueTypes } from 'src/types/common';
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types';
import { editSubmitSuccess } from 'src/ducks/room-editing/actions';
import { ObjectType } from 'src/types/api';
import * as actions from '../actions';
import { ObjectsActionType } from '../action-types';

export type ActionTypes = ReturnType<
    InferValueTypes<typeof actions> | typeof editSubmitSuccess
>;

type StateType = Record<ObjectType['id'], Omit<ObjectType, 'area'>>;

export const initialState: StateType = {};

export const entity = (
    state = initialState,
    action: ActionTypes
): StateType => {
    switch (action.type) {
        case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
        case ObjectsActionType.GET_OBJECTS_SUCCESS: {
            return action.objects.reduce(
                (acc, object) => {
                    acc[object.id] = object;

                    return acc;
                },
                { ...state }
            );
        }

        default: {
            return state;
        }
    }
};
