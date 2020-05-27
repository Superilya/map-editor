import { Place } from "src/types/api";

export enum Users {
    SELF = '/api/users/self',
    LIST = '/api/users/list'
}

export const Map = {
    BUILDINGS: '/api/map/buildings',
    ROOMS: '/api/map/rooms',
    PLACES: '/api/map/places',
    CHANGE_MY_PLACE: (placeId: Place['id']) => `/api/map/places/${placeId}/sit`
}

export enum Auth {
    UI = '/auth'
}
