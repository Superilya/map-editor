import { Place, Room } from 'src/types/api'

export enum Users {
  SELF = '/api/users/self',
  LIST = '/api/users/list',
}

export const Map = {
  BUILDINGS: '/api/map/buildings',
  ROOMS: '/api/map/rooms',
  AREAS: '/api/map/areas',
  SEARCH: '/api/map/search',
  ROOM_EDIT: (roomId: Room['id']) => `/api/map/rooms/${roomId}/edit`, // TODO поправить нахуй
  PLACES: '/api/map/places',
  CHANGE_MY_PLACE: (placeId: Place['id']) => `/api/map/places/${placeId}/sit`, // TODO поправить нахуй
}

export enum Auth {
  UI = '/auth',
}
