import { InferValueTypes } from 'src/types/common';
import { PlacesActionType } from '../action-types';
import * as actions from '../actions';
import { Place, Room } from 'src/types/api';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = Record<Room['id'], Array<Place['id']>>;

export const initialState: StateType = {};

export const list = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case PlacesActionType.GET_PLACES_SUCCESS: {
            return {
                ...state,
                [action.roomId]: action.places.map(({ id }) => id)
            };
        }

        default: {
            return state;
        }
    }
};