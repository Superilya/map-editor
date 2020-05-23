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

        case UsersActionType.GET_USERS_SUCCESS: {
            return action.users.reduce((acc, user) => {
                acc[user.id] = user;

                return acc;
            }, { ...state });
        }

        default: {
            return state;
        }
    }
};