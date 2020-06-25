import { RootStoreType } from 'src/ducks';

export const selectIsSearchLoading = (state: RootStoreType) =>
    state.search.isLoading;
