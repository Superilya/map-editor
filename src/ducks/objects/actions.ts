import { ObjectType, Room } from 'src/types/api';
import { ObjectsActionType } from './action-types';

export const getObjects = (roomId: Room['id']) => ({
    type: ObjectsActionType.GET_OBJECTS,
    roomId,
});

export const getObjectsSuccess = (
    roomId: Room['id'],
    objects: Array<ObjectType>
) => ({
    type: ObjectsActionType.GET_OBJECTS_SUCCESS,
    roomId,
    objects,
});

export const getObjectsFailed = () => ({
    type: ObjectsActionType.GET_OBJECTS_FAILED,
});
