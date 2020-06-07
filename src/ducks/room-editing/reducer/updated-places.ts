import { InferValueTypes } from 'src/types/common';
import { RoomEditinActionType } from '../action-types';
import * as actions from '../actions';
import { Place } from 'src/types/api';
import { PlaceChange } from 'src/types/place-editing';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = Record<Place['id'], PlaceChange>;

export const initialState: StateType = {}

const setPlaceUpdates = (placeChange: PlaceChange, targetPlace?: PlaceChange) => {
    if (!targetPlace) {
        return placeChange
    }

    return {
        ...targetPlace,
        ...placeChange
    }
};

export const updatedPlaces = (state: StateType = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case RoomEditinActionType.SET_POSITION: {
            const targetPlace = state[action.placeId];

            return {
                ...state,
                [action.placeId]: setPlaceUpdates({
                    x: action.x,
                    y: action.y
                }, targetPlace)
            };
        }

        case RoomEditinActionType.SET_ROTATION: {
            const targetPlace = state[action.placeId];

            return {
                ...state,
                [action.placeId]: setPlaceUpdates({
                    rotation: action.rotation
                }, targetPlace)
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