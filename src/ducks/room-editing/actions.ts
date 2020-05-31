import { RoomEditinActionType } from './action-types';
import { Room } from 'src/types/api';

export const startEdit = (roomId: Room['id']) => ({
    type: RoomEditinActionType.START_EDIT,
    roomId
});

export const endEdit = () => ({
    type: RoomEditinActionType.END_EDIT
});

