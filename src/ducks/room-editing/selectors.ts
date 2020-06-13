import { RootStoreType } from 'src/ducks'
import { createSelector } from 'reselect'
import { Room, Place } from 'src/types/api'
import { ObjectTypes } from 'src/types/place-editing'

export const selectTargetRoom = (state: RootStoreType) =>
  state.roomEditing.targetRoom
export const selectUpdatedPlaces = (state: RootStoreType) =>
  state.roomEditing.updatedPlaces
export const selectIsSubmitting = (state: RootStoreType) =>
  state.roomEditing.state.isSubmitting
export const selectDeleted = (state: RootStoreType) =>
  state.roomEditing.deletedPlaces

export const selectEditedPlaces = createSelector(
  (state: RootStoreType) => state.places.entity,
  (state: RootStoreType, props: { roomId: Room['id'] }) =>
    state.places.list[props.roomId],
  selectUpdatedPlaces,
  selectDeleted,
  (entity, list, updated, deleted): Array<Place> => {
    const rest = list.filter((placeId) => deleted.indexOf(placeId) === -1)

    return rest
      .map((placeId) => entity[placeId])
      .filter(Boolean)
      .map((place) => {
        if (!updated[place.id]) {
          return place
        }

        return {
          ...place,
          ...updated[place.id],
        }
      })
  }
)

export const selectSelectedEditObjectType = (state: RootStoreType) =>
  state.roomEditing.selectedEdit.objectType
export const selectSelectedEditObjectId = (state: RootStoreType) =>
  state.roomEditing.selectedEdit.id
export const selectEditablePlaceFields = createSelector(
  selectSelectedEditObjectType,
  selectSelectedEditObjectId,
  (state: RootStoreType) => state.places.entity,
  (state: RootStoreType) => state.roomEditing.updatedPlaces,
  (objectType, objectId, entity, updated): Place | null => {
    if (objectType !== ObjectTypes.PLACE || !objectId) {
      return null
    }

    const place = entity[objectId]

    if (!place) {
      return null
    }

    const qwe = {
      ...place,
      ...updated[place.id],
    }

    return qwe
  }
)
