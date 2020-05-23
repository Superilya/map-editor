import { RootStoreType } from 'src/ducks';
import { User } from 'src/types/api';

export const selectUserById = (state, props: { userId: User['id'] }) => state.users.entity[props.userId];
export const selectIsSelfLoading = (state: RootStoreType) => state.users.state.isSelfLoading;
export const selectSelfUser = (state: RootStoreType) => state.users.entity[state.users.self];
