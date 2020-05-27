import { InferValueTypes } from 'src/types/common';
import { PlacesActionType } from '../action-types';
import * as actions from '../actions';
import { Place } from 'src/types/api';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = Record<Place['id'], Place>;

export const initialState: StateType = {};

export const entity = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case PlacesActionType.CHANGE_MY_PLACE_SUCCESS:
        case PlacesActionType.GET_PLACES_SUCCESS: {
            return action.places.reduce((acc, place) => {
                acc[place.id] = place;

                return acc;
            }, { ...state });
        }

        default: {
            return state;
        }
    }
};