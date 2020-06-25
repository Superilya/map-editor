import { RootStoreType } from 'src/ducks';
import { createSelector } from 'reselect';
import { Room } from 'src/types/api';

export const selectRooms = createSelector(
    (state: RootStoreType) => state.rooms.entity,
    (state: RootStoreType) => state.rooms.list,
    (state: RootStoreType) => state.rooms.areas,
    (state: RootStoreType) => state.areas.entity,
    (entity, list, areasMapping, areas): Room[] => {
        return list.reduce((acc: Room[], id) => {
            const targetArea = areas[areasMapping[id]];

            if (!targetArea) {
                return acc;
            }

            acc.push({
                ...entity[id],
                area: targetArea,
            });

            return acc;
        }, []);
    }
);

type Props = {
    roomId: Room['id'];
};

export const selectRoomById = createSelector(
    (state: RootStoreType, props: Props) => props.roomId,
    (state: RootStoreType) => state.rooms.entity,
    (state: RootStoreType) => state.rooms.areas,
    (state: RootStoreType) => state.areas.entity,
    (roomId, entity, areasMapping, areas): Room | undefined => {
        const targetArea = areas[areasMapping[roomId]];

        if (!targetArea) {
            return undefined;
        }

        return {
            ...entity[roomId],
            area: targetArea,
        };
    }
);

export const selectIsRoomsLoading = (state: RootStoreType) =>
    state.rooms.state.isRoomsLoading;
