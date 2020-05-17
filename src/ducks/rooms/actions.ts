import { RoomsActionType } from './action-types';
import { Room } from 'src/types/api';

export const getRooms = () => ({
    type: RoomsActionType.GET_ROOMS
});

export const getRoomsSuccess = (rooms: Array<Room>) => ({
    type: RoomsActionType.GET_ROOMS_SUCCESS,
    rooms
});

export const getRoomsFailed = () => ({
    type: RoomsActionType.GET_ROOMS_FAILED
});
