import { InferValueTypes } from 'src/types/common';
import { ObjectType, Area } from 'src/types/api';
import { editSubmitSuccess } from 'src/ducks/room-editing/actions';
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types';
import { ObjectsActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<
    InferValueTypes<typeof actions> | typeof editSubmitSuccess
>;

type StateType = Record<ObjectType['id'], Area['id']>;

export const initialState: StateType = {};

export const areas = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
        case ObjectsActionType.GET_OBJECTS_SUCCESS: {
            if (!Array.isArray(action.objects)) {
                return state;
            }

            return action.objects.reduce(
                (acc, object) => {
                    acc[object.id] = object.area.id;

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
