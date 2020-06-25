import { Area, ObjectType } from 'src/types/api';
import { ObjectsEditinActionType } from './action-types';

export const setObjectPosition = (
    placeId: ObjectType['id'],
    x: ObjectType['x'],
    y: ObjectType['y']
) => ({
    type: ObjectsEditinActionType.SET_OBJECT_POSITION,
    placeId,
    x,
    y,
});

export const setObjectRotation = (
    objectId: ObjectType['id'],
    rotation: ObjectType['rotation']
) => ({
    type: ObjectsEditinActionType.SET_OBJECT_ROTATION,
    rotation,
    objectId,
});

export const deleteObject = (objectId: ObjectType['id']) => ({
    type: ObjectsEditinActionType.DELETE_OBJECT,
    objectId,
});

export const createObject = (areaId: Area['id'], id: string) => ({
    type: ObjectsEditinActionType.CREATE_OBJECT,
    areaId,
    id,
});
