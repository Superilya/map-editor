import { InferValueTypes } from 'src/types/common';
import { Place } from 'src/types/api';
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types';
import { editCancel, editSubmitSuccess } from 'src/ducks/room-editing/actions';
import { ObjectsEditinActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<
    | InferValueTypes<typeof actions>
    | typeof editSubmitSuccess
    | typeof editCancel
>;

type StateType = Array<Place['id']>;

export const initialState: StateType = [];

export const deleted = (
    state: StateType = initialState,
    action: ActionTypes
): StateType => {
    switch (action.type) {
        case ObjectsEditinActionType.DELETE_OBJECT: {
            if (state.indexOf(action.objectId) !== -1) {
                return state;
            }

            return [...state, action.objectId];
        }

        case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
        case RoomEditinActionType.EDIT_CANCEL: {
            return [];
        }

        default: {
            return state;
        }
    }
};
