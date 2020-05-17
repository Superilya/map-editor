import { RootStoreType } from 'src/ducks';
import { createSelector } from 'reselect';

export const selectRooms = createSelector(
    (state: RootStoreType) => state.rooms.entity,
    (state: RootStoreType) => state.rooms.list,
    (entity, list) => list.map(id => entity[id])
);

export const selectIsRoomsLoading = (state: RootStoreType) => state.rooms.state.isRoomsLoading;
