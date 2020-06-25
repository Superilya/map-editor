import { InferValueTypes } from 'src/types/common';
import { Place } from 'src/types/api';
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types';
import { editCancel, editSubmitSuccess } from 'src/ducks/room-editing/actions';
import { PlacesEditinActionType } from '../action-types';
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
        case PlacesEditinActionType.DELETE_PLACE: {
            if (state.indexOf(action.placeId) !== -1) {
                return state;
            }

            return [...state, action.placeId];
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
