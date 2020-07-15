import { RootStoreType } from 'src/ducks';
import { createSelector } from 'reselect';
import { Room } from 'src/types/api';

export const selectRooms = createSelector(
    (state: RootStoreType) => state.rooms.entity,
    (state: RootStoreType) => state.rooms.list,
    (state: RootStoreType) => state.rooms.areas,
    (state: RootStoreType) => state.areas.entity,
    (state: RootStoreType) => state.areas.editedBorders,
    (entity, list, areasMapping, areas, editedBorders): Room[] => {
        return list.reduce((acc: Room[], id) => {
            const targetArea = areas[areasMapping[id]];

            if (!targetArea) {
                return acc;
            }

            if (editedBorders[targetArea.id]) {
                acc.push({
                    ...entity[id],
                    area: {
                        ...targetArea,
                        borders: editedBorders[targetArea.id],
                    },
                });
            } else {
                acc.push({
                    ...entity[id],
                    area: targetArea,
                });
            }

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
    (state: RootStoreType) => state.areas.editedBorders,
    (roomId, entity, areasMapping, areas, editedBorders): Room | undefined => {
        const targetArea = areas[areasMapping[roomId]];

        if (!targetArea) {
            return undefined;
        }

        if (editedBorders[targetArea.id]) {
            return {
                ...entity[roomId],
                area: {
                    ...targetArea,
                    borders: editedBorders[targetArea.id],
                },
            };
        }

        return {
            ...entity[roomId],
            area: targetArea,
        };
    }
);

export const selectIsRoomsLoading = (state: RootStoreType) =>
    state.rooms.state.isRoomsLoading;
