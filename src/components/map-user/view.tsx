import React from 'react';
import { MapUrlImage } from 'src/components/map-url-image';
import { User } from 'src/types/api';

type PropsType = {
    user?: User
}

export const MapUserView = ({ user }: PropsType) => {
    if (!user) {
        return null;
    }

    return (
        <MapUrlImage width={60} height={60} src={user.avatarUrl} />
    );
}
