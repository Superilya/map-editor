import { RootStoreType } from 'src/ducks';
import { createSelector } from 'reselect';
import { Room } from 'src/types/api';

export const selectPlaces = createSelector(
    (state: RootStoreType) => state.places.entity,
    (state: RootStoreType, props: { roomId: Room['id'] }) => state.places.list[props.roomId],
    (entity, list) => {
        if (!Array.isArray(list)) {
            return null;
        }

        return list.map(id => entity[id])
    }
);