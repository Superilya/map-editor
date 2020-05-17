import { RootStoreType } from 'src/ducks';

export const selectIsSelfLoading = (state: RootStoreType) => state.users.state.isSelfLoading;
export const selectSelfUser = (state: RootStoreType) => state.users.entity[state.users.self];
