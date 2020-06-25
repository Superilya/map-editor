import { InferValueTypes } from 'src/types/common';
import { Room } from 'src/types/api';
import { RoomsActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = Array<Room['id']>;

export const initialState: StateType = [];

export const list = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case RoomsActionType.GET_ROOMS_SUCCESS: {
            return action.rooms.map(({ id }) => id);
        }

        default: {
            return state;
        }
    }
};
