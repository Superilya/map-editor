import { InferValueTypes } from 'src/types/common';
import { ObjectType, Room } from 'src/types/api';
import { editSubmitSuccess } from 'src/ducks/room-editing/actions';
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types';
import * as actions from '../actions';
import { ObjectsActionType } from '../action-types';

export type ActionTypes = ReturnType<
    InferValueTypes<typeof actions> | typeof editSubmitSuccess
>;

type StateType = Record<Room['id'], Array<ObjectType['id']>>;

export const initialState: StateType = {};

export const list = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case ObjectsActionType.GET_OBJECTS_SUCCESS: {
            return {
                ...state,
                [action.roomId]: action.objects.map(({ id }) => id),
            };
        }

        case RoomEditinActionType.EDIT_SUBMIT_SUCCESS: {
            const targetList = action.objects.reduce(
                (acc, object) => {
                    if (acc.indexOf(object.id) === -1) {
                        acc.push(object.id);
                    }

                    return acc;
                },
                Array.isArray(state[action.roomId]) ? state[action.roomId] : []
            );

            return {
                ...state,
                [action.roomId]: targetList.filter(
                    (objectId) => action.deletedObjects.indexOf(objectId) === -1
                ),
            };
        }

        default: {
            return state;
        }
    }
};
