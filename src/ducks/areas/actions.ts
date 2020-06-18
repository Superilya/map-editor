import { Area } from 'src/types/api'
import { AreasActionType } from './action-types'

export const getObjectsAreas = () => ({
  type: AreasActionType.GET_MAP_OBJECTS,
})

export const getObjectsAreasSuccess = (areas: Array<Area>) => ({
  type: AreasActionType.GET_MAP_OBJECTS_SUCCESS,
  areas,
})
