import { InferValueTypes } from 'src/types/common';
import { Area, ObjectType, Place } from 'src/types/api';
import { RoomsActionType } from 'src/ducks/rooms/action-types';
import { PlacesActionType } from 'src/ducks/places/action-types';
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types';
import { ObjectsActionType } from 'src/ducks/objects/action-types';
import { getRoomsSuccess } from 'src/ducks/rooms/actions';
import { getPlacesSuccess } from 'src/ducks/places/actions';
import { editSubmitSuccess } from 'src/ducks/room-editing/actions';
import { getObjectsSuccess } from 'src/ducks/objects/actions';
import * as actions from '../actions';
import { AreasActionType } from '../action-types';

export type ActionTypes = ReturnType<
    | InferValueTypes<typeof actions>
    | typeof getRoomsSuccess
    | typeof getPlacesSuccess
    | typeof editSubmitSuccess
    | typeof getObjectsSuccess
>;

type StateType = Record<Area['id'], Area>;

export const initialState: StateType = {};

export const entity = (
    state = initialState,
    action: ActionTypes
): StateType => {
    switch (action.type) {
        case AreasActionType.GET_MAP_OBJECTS_SUCCESS: {
            return action.areas.reduce(
                (acc, area) => {
                    acc[area.id] = area;

                    return acc;
                },
                { ...state }
            );
        }

        case RoomsActionType.GET_ROOMS_SUCCESS: {
            return action.rooms.reduce(
                (acc, room) => {
                    acc[room.area.id] = room.area;

                    return acc;
                },
                { ...state }
            );
        }

        case RoomEditinActionType.EDIT_SUBMIT_SUCCESS: {
            const targetObjects: Array<
                ObjectType | Place
            > = action.objects.concat(action.places);

            return targetObjects.reduce(
                (acc, place) => {
                    acc[place.area.id] = place.area;

                    return acc;
                },
                { ...state }
            );
        }

        case PlacesActionType.GET_PLACES_SUCCESS: {
            return action.places.reduce(
                (acc, place) => {
                    acc[place.area.id] = place.area;

                    return acc;
                },
                { ...state }
            );
        }

        case ObjectsActionType.GET_OBJECTS_SUCCESS: {
            return action.objects.reduce(
                (acc, object) => {
                    acc[object.area.id] = object.area;

                    return acc;
                },
                { ...state }
            );
        }

        default: {
            return state;
        }
    }
};
