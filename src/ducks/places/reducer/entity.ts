import { InferValueTypes } from 'src/types/common';
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types';
import { editSubmitSuccess } from 'src/ducks/room-editing/actions';
import { Place } from 'src/types/api';
import * as actions from '../actions';
import { PlacesActionType } from '../action-types';

export type ActionTypes = ReturnType<
    InferValueTypes<typeof actions> | typeof editSubmitSuccess
>;

type StateType = Record<Place['id'], Omit<Place, 'area'>>;

export const initialState: StateType = {};

export const entity = (
    state = initialState,
    action: ActionTypes
): StateType => {
    switch (action.type) {
        case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
        case PlacesActionType.CHANGE_MY_PLACE_SUCCESS:
        case PlacesActionType.GET_PLACES_SUCCESS: {
            if (!Array.isArray(action.places)) {
                return state;
            }

            return action.places.reduce(
                (acc, place) => {
                    acc[place.id] = place;

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
