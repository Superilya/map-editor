import { RootStoreType } from 'src/ducks'
import { createSelector } from 'reselect'
import { Room, Place } from 'src/types/api'
import { ObjectTypes } from 'src/constants/objects'
import { defaultPlaceFields } from 'src/constants/editing'

export const selectTargetRoom = (state: RootStoreType) =>
  state.roomEditing.targetRoom
export const selectUpdatedPlaces = (state: RootStoreType) =>
  state.roomEditing.updatedPlaces
export const selectIsSubmitting = (state: RootStoreType) =>
  state.roomEditing.state.isSubmitting
export const selectDeleted = (state: RootStoreType) =>
  state.roomEditing.deletedPlaces
export const selectCreated = (state: RootStoreType) => state.roomEditing.created

export const selectEditedPlaces = createSelector(
  (state: RootStoreType) => state.places.entity,
  (state: RootStoreType, props: { roomId: Room['id'] }) =>
    state.places.list[props.roomId],
  (state: RootStoreType) => state.places.areas,
  selectUpdatedPlaces,
  selectDeleted,
  selectCreated,
  (state: RootStoreType) => state.areas.entity,
  (
    entity,
    list,
    areasMapping,
    updated,
    deleted,
    created,
    areasEntity
  ): Array<Place> => {
    const rest = !Array.isArray(list)
      ? []
      : list
          .filter((placeId) => deleted.indexOf(placeId) === -1)
          .map((placeId) => entity[placeId])
          .filter(Boolean)
    const assempledCreated = Object.keys(created)
      .reduce((acc: Array<Place>, placeId) => {
        const targetArea = areasEntity[created[placeId]]

        if (!targetArea) {
          return acc
        }

        if (!updated[placeId]) {
          return acc
        }

        acc.push({
          id: placeId,
          x: 50,
          y: 50,
          area: targetArea,
          ...updated[placeId],
        })

        return acc
      }, [])
      .filter(Boolean)

    const existPlaces: Place[] = rest.reduce((acc: Place[], halfPlace) => {
      const targetArea = areasEntity[areasMapping[halfPlace.id]]
      const targetUpdate = updated[halfPlace.id]
      if (!targetArea) {
        return acc
      }

      if (!targetUpdate) {
        acc.push({
          ...halfPlace,
          area: targetArea,
        })
      } else {
        acc.push({
          ...halfPlace,
          area: targetArea,
          ...targetUpdate,
        })
      }

      return acc
    }, [])

    return existPlaces.concat(assempledCreated)
  }
)

export const selectSelectedEditObjectType = (state: RootStoreType) =>
  state.roomEditing.selectedEdit.objectType
export const selectSelectedEditObjectId = (state: RootStoreType) =>
  state.roomEditing.selectedEdit.id
export const selectEditablePlaceFields = createSelector(
  selectSelectedEditObjectType,
  selectSelectedEditObjectId,
  (state: RootStoreType) => state.places.areas,
  (state: RootStoreType) => state.places.entity,
  selectUpdatedPlaces,
  selectCreated,
  (state: RootStoreType) => state.areas.entity,
  (
    objectType,
    objectId,
    areasMapping,
    entity,
    updated,
    created,
    areasEntity
  ): Place | null => {
    if (objectType !== ObjectTypes.PLACE || !objectId) {
      return null
    }

    const targetArea = areasEntity[created[objectId]]

    if (targetArea) {
      return {
        id: objectId,
        ...defaultPlaceFields,
        ...updated[objectId],
        area: targetArea,
      }
    }

    const place = entity[objectId]
    const targetPlaceArea = areasEntity[areasMapping[place.id]]

    if (!place || !targetPlaceArea) {
      return null
    }

    return {
      ...place,
      area: targetPlaceArea,
      ...updated[place.id],
    }
  }
)
