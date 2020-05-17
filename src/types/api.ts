import { ServerStatuses } from 'src/constants/server-statuses';
import { AreaKinds, BorderKinds } from 'src/constants/kinds';

export type User = {
    id: number;
    name: string;
    avatarUrl: string;
    extId: string;
    extType: string;
    createdAt: string;
    updatedAt: string;
}

export type UserResponse = {
    users: Array<User>
};

export type Building = {
    id: number;
    name: string;
    floors: Array<number>;
    width: number;
    height: number
    createdAt: string
    updatedAt: string
}

export type BuildingResponse = {
    buildings: Array<Building>;
}

export type Border = {
    x: number;
    y: number;
    cp1x: number | null;
    cp1y: number | null;
    cp2x: number | null;
    cp2y: number | null;
    kind: BorderKinds;
}

export type Area = {
    kind: AreaKinds;
    borders: Array<Border>;
}

export type Room = {
    id: string;
    x: number;
    y: number;
    parentId: Room['id'];
    floor: number;
    label: string;
    area: Area;
}

export type RoomsResponse = {
    rooms: Array<Room>
}

type CommonResponses = UserResponse | BuildingResponse | RoomsResponse;

export type Response<T extends CommonResponses> = T & {
    status: ServerStatuses;
    errors?: Array<string>;
}