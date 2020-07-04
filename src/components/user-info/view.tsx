import React from 'react';
import { User } from 'src/types/api';
import { Avatar } from 'src/components/ui/avatar';
import { Text } from 'src/components/ui/text';
import { Box, Right } from './styles';

type PropsType = {
    user?: User;
};

export const ToolUserInfoView = ({ user }: PropsType) => {
    if (!user) {
        return null;
    }

    return (
        <Box>
            <Avatar url={user.avatarUrl} />
            <Right>
                <Text>{user.name}</Text>
            </Right>
        </Box>
    );
};
