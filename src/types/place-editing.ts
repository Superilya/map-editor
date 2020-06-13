import { Place } from 'src/types/api'

export type PlaceChange = {
  x?: Place['x']
  y?: Place['y']
  rotation?: Place['rotation']
}

export enum ObjectTypes {
  PLACE,
}

export type SelectedEditType =
  | {
      objectType: typeof ObjectTypes.PLACE
      id: Place['id']
    }
  | {
      objectType: null
      id: null
    }
