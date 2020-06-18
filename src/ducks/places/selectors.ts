import { RootStoreType } from 'src/ducks'
import { createSelector } from 'reselect'
import { Place, Room } from 'src/types/api'

export const selectPlaces = createSelector(
  (state: RootStoreType) => state.places.entity,
  (state: RootStoreType, props: { roomId: Room['id'] }) =>
    state.places.list[props.roomId],
  (state: RootStoreType) => state.places.areas,
  (state: RootStoreType) => state.areas.entity,
  (entity, list, areasMapping, areas): Place[] | null => {
    if (!Array.isArray(list)) {
      return null
    }

    return list.reduce((acc: Place[], id) => {
      const targetArea = areas[areasMapping[id]]

      if (!targetArea) {
        return acc
      }

      acc.push({
        ...entity[id],
        area: targetArea,
      })

      return acc
    }, [])
  }
)

type Props = {
  placeId: Place['id']
}

export const selectPlaceById = createSelector(
  (state: RootStoreType, props: Props) => props.placeId,
  (state: RootStoreType) => state.places.entity,
  (state: RootStoreType) => state.places.areas,
  (state: RootStoreType) => state.areas.entity,
  (placeId, entity, areasMapping, areas): Place | undefined => {
    const targetArea = areas[areasMapping[placeId]]

    if (!targetArea) {
      return undefined
    }

    return {
      ...entity[placeId],
      area: targetArea,
    }
  }
)
