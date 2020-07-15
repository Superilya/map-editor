import { InferValueTypes } from 'src/types/common';
import { Room } from 'src/types/api';
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types';
import { editSubmitSuccess } from 'src/ducks/room-editing/actions';
import { RoomsActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<
    InferValueTypes<typeof actions> | typeof editSubmitSuccess
>;

type StateType = Record<Room['id'], Omit<Room, 'area'>>;

export const initialState: StateType = {};

export const entity = (
    state = initialState,
    action: ActionTypes
): StateType => {
    switch (action.type) {
        case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
        case RoomsActionType.GET_ROOMS_SUCCESS: {
            if (!Array.isArray(action.rooms)) {
                return state;
            }

            return action.rooms.reduce(
                (acc, room) => {
                    acc[room.id] = room;

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
