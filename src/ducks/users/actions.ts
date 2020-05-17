import { UsersActionType } from './action-types';
import { User } from 'src/types/api';

export const getSelf = () => ({
    type: UsersActionType.GET_SELF
});

export const getSelfSuccess = (user: User) => ({
    type: UsersActionType.GET_SELF_SUCCESS,
    user
});

export const getSelfFailed = () => ({
    type: UsersActionType.GET_SELF_FAILED
});
