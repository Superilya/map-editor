import { Room, Place, ObjectType } from 'src/types/api';
import { SelectedEditType } from 'src/types/place-editing';
import { RoomEditinActionType } from './action-types';

export const editStart = (roomId: Room['id']) => ({
    type: RoomEditinActionType.EDIT_START,
    roomId,
});

type EditableFields = {
    label?: string;
}

export const editSubmit = (fields: EditableFields) => ({
    type: RoomEditinActionType.EDIT_SUBMIT,
    fields
});

export const editSubmitSuccess = (
    roomId: Room['id'],
    deletedPlaces: Array<Place['id']>,
    deletedObjects: Array<ObjectType['id']>,
    places?: Array<Place>,
    objects?: Array<ObjectType>,
    rooms?: Array<Room>
) => ({
    type: RoomEditinActionType.EDIT_SUBMIT_SUCCESS,
    deletedPlaces,
    deletedObjects,
    roomId,
    places,
    objects,
    rooms,
});

export const editSubmitFailed = () => ({
    type: RoomEditinActionType.EDIT_SUBMIT_FAILED,
});

export const editCancel = () => ({
    type: RoomEditinActionType.EDIT_CANCEL,
});

export const selectEdit = (target: SelectedEditType) => ({
    type: RoomEditinActionType.SELECT_EDIT,
    target,
});
