import { InferValueTypes } from 'src/types/common';
import { SelectedEditType } from 'src/types/place-editing';
import { PlacesEditinActionType } from 'src/ducks/places-editing/action-types';
import { ObjectsEditinActionType } from 'src/ducks/objects-editing/action-types';
import { deletePlace } from 'src/ducks/places-editing/actions';
import { deleteObject } from 'src/ducks/objects-editing/actions';
import { RoomEditinActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<
    InferValueTypes<typeof actions> | typeof deletePlace | typeof deleteObject
>;

type StateType = SelectedEditType;

export const initialState: StateType = {
    objectType: null,
    id: null,
};

export const selectedEdit = (
    state: StateType = initialState,
    action: ActionTypes
): StateType => {
    switch (action.type) {
        case RoomEditinActionType.SELECT_EDIT: {
            if (
                state.id === action.target.id &&
                state.objectType === action.target.objectType
            ) {
                return {
                    objectType: null,
                    id: null,
                };
            }

            return action.target;
        }

        case ObjectsEditinActionType.DELETE_OBJECT:
        case PlacesEditinActionType.DELETE_PLACE:
        case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
        case RoomEditinActionType.EDIT_CANCEL: {
            return {
                objectType: null,
                id: null,
            };
        }

        default: {
            return state;
        }
    }
};
