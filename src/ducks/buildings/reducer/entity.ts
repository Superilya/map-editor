import { InferValueTypes } from 'src/types/common'
import { Building } from 'src/types/api'
import { BuildingsActionType } from '../action-types'
import * as actions from '../actions'

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

type StateType = Record<Building['id'], Building>

export const initialState: StateType = {}

export const entity = (
  state = initialState,
  action: ActionTypes
): StateType => {
  switch (action.type) {
    case BuildingsActionType.GET_BUILDINGS_SUCCESS: {
      return action.buildings.reduce(
        (acc, building) => {
          acc[building.id] = building

          return acc
        },
        { ...state }
      )
    }

    default: {
      return state
    }
  }
}
