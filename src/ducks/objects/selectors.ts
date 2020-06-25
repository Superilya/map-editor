import { RootStoreType } from 'src/ducks';
import { createSelector } from 'reselect';
import { Room, ObjectType } from 'src/types/api';

export const selectObjects = createSelector(
    (state: RootStoreType) => state.objects.entity,
    (state: RootStoreType, props: { roomId: Room['id'] }) =>
        state.objects.list[props.roomId],
    (state: RootStoreType) => state.objects.areas,
    (state: RootStoreType) => state.areas.entity,
    (entity, list, areasMapping, areas): ObjectType[] | null => {
        if (!Array.isArray(list)) {
            return null;
        }

        return list.reduce((acc: ObjectType[], id) => {
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
