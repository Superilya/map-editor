import { InferValueTypes } from 'src/types/common';
import { Room, Area } from 'src/types/api';
import { RoomsActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = Record<Room['id'], Area['id']>;

export const initialState: StateType = {};

export const areas = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case RoomsActionType.GET_ROOMS_SUCCESS: {
            return action.rooms.reduce(
                (acc, room) => {
                    acc[room.id] = room.area.id;

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
