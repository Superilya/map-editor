import { User } from 'src/types/api'
import { SearchActionType } from './action-types'

export const search = (userId: User['id']) => ({
  type: SearchActionType.SEARCH,
  userId,
})

export const searchSuccess = () => ({
  type: SearchActionType.SEARCH_SUCCESS,
})

export const searchFailed = () => ({
  type: SearchActionType.SEARCH_FAILED,
})
