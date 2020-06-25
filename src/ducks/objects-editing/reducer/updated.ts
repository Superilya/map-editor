import { InferValueTypes } from 'src/types/common';
import { defaultObjectFields } from 'src/constants/editing';
import { ObjectType } from 'src/types/api';
import { PlaceChange } from 'src/types/place-editing';
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types';
import { editCancel, editSubmitSuccess } from 'src/ducks/room-editing/actions';
import { ObjectsEditinActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<
    | InferValueTypes<typeof actions>
    | typeof editCancel
    | typeof editSubmitSuccess
>;

type StateType = Record<ObjectType['id'] | string, PlaceChange>;

export const initialState: StateType = {};

const setPlaceUpdates = (
    placeChange: PlaceChange,
    targetPlace?: PlaceChange
) => {
    if (!targetPlace) {
        return placeChange;
    }

    return {
        ...targetPlace,
        ...placeChange,
    };
};

export const updated = (
    state: StateType = initialState,
    action: ActionTypes
): StateType => {
    switch (action.type) {
        case ObjectsEditinActionType.SET_OBJECT_POSITION: {
            const targetPlace = state[action.placeId];

            return {
                ...state,
                [action.placeId]: setPlaceUpdates(
                    {
                        x: action.x,
                        y: action.y,
                    },
                    targetPlace
                ),
            };
        }

        case ObjectsEditinActionType.SET_OBJECT_ROTATION: {
            const targetPlace = state[action.objectId];

            return {
                ...state,
                [action.objectId]: setPlaceUpdates(
                    {
                        rotation: action.rotation,
                    },
                    targetPlace
                ),
            };
        }

        case ObjectsEditinActionType.CREATE_OBJECT: {
            return {
                ...state,
                [action.id]: defaultObjectFields,
            };
        }

        case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
        case RoomEditinActionType.EDIT_CANCEL: {
            return {};
        }

        default: {
            return state;
        }
    }
};
