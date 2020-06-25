import { InferValueTypes } from 'src/types/common';
import { defaultObjectFields } from 'src/constants/editing';
import { Place } from 'src/types/api';
import { PlaceChange } from 'src/types/place-editing';
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types';
import { editCancel, editSubmitSuccess } from 'src/ducks/room-editing/actions';
import { PlacesEditinActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<
    | InferValueTypes<typeof actions>
    | typeof editCancel
    | typeof editSubmitSuccess
>;

type StateType = Record<Place['id'] | string, PlaceChange>;

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
        case PlacesEditinActionType.SET_PLACE_POSITION: {
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

        case PlacesEditinActionType.SET_PLACE_ROTATION: {
            const targetPlace = state[action.placeId];

            return {
                ...state,
                [action.placeId]: setPlaceUpdates(
                    {
                        rotation: action.rotation,
                    },
                    targetPlace
                ),
            };
        }

        case PlacesEditinActionType.CREATE_PLACE: {
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
