import { InferValueTypes } from 'src/types/common';
import { UsersActionType } from '../action-types';
import * as actions from '../actions';
import { User } from 'src/types/api';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = User['id'] | null;

export const initialState: StateType = null;

export const self = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case UsersActionType.GET_SELF_SUCCESS: {
            return action.user.id;
        }

        default: {
            return state;
        }
    }
};