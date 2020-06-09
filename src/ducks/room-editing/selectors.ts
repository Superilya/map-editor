import { RootStoreType } from 'src/ducks';
import { createSelector } from 'reselect';
import { Room, Place } from 'src/types/api';

export const selectTargetRoom = (state: RootStoreType) => state.roomEditing.targetRoom
export const selectUpdatedPlaces = (state: RootStoreType) => state.roomEditing.updatedPlaces
export const selectIsSubmitting = (state: RootStoreType) => state.roomEditing.state.isSubmitting
export const selectDeleted = (state: RootStoreType) => state.roomEditing.deletedPlaces

export const selectEditedPlaces = createSelector(
    (state: RootStoreType) => state.places.entity,
    (state: RootStoreType, props: { roomId: Room['id'] }) => state.places.list[props.roomId],
    selectUpdatedPlaces,
    selectDeleted,
    (entity, list, updated, deleted): Array<Place> => {
        const rest = list.filter(placeId => deleted.indexOf(placeId) === -1);

        return rest
            .map(placeId => entity[placeId])
            .filter(Boolean)
            .map(place => {
                if (!updated[place.id]) {
                    return place;
                }

                return {
                    ...place,
                    ...updated[place.id]
                };
            })
    }
)