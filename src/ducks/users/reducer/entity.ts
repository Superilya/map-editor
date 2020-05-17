import { InferValueTypes } from 'src/types/common';
import { UsersActionType } from '../action-types';
import * as actions from '../actions';
import { User } from 'src/types/api';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = Record<User['id'], User>;

export const initialState: StateType = {};

export const entity = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case UsersActionType.GET_SELF_SUCCESS: {
            return {
                ...state,
                [action.user.id]: action.user
            };
        }

        default: {
            return state;
        }
    }
};