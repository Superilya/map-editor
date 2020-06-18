import { RootStoreType } from 'src/ducks'
import { createSelector } from 'reselect'

export const selectPlaceAreasList = createSelector(
  (state: RootStoreType) => state.areas.entity,
  (state: RootStoreType) => state.areas.places,
  (entity, placesList) => {
    return placesList.map((areaId) => entity[areaId]).filter(Boolean)
  }
)
