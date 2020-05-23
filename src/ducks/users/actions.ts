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

export const getUsers = () => ({
    type: UsersActionType.GET_USERS,
});

export const getUsersSuccess = (users: Array<User>) => ({
    type: UsersActionType.GET_USERS_SUCCESS,
    users
});

export const getUsersFailed = () => ({
    type: UsersActionType.GET_USERS_FAILED
});
