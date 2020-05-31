import { InferValueTypes } from 'src/types/common';
import { RoomEditinActionType } from '../action-types';
import * as actions from '../actions';
import { Room } from 'src/types/api';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = Room['id'] | null

export const initialState: StateType = null

export const targetRoom = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case RoomEditinActionType.START_EDIT: {
            return action.roomId
        }

        case RoomEditinActionType.END_EDIT: {
            return null
        }

        default: {
            return state;
        }
    }
};