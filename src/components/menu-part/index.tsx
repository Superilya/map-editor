import React, { ReactNode } from 'react';
import { Text } from 'src/components/ui/text';

import { Box, HeaderBox } from './styles';

type PropsType = {
    children?: ReactNode;
    title: ReactNode;
    action?: ReactNode;
};

export const MenuPart = ({ title, children, action }: PropsType) => (
    <Box>
        <HeaderBox>
            <Text bold>{title}</Text>
            {action}
        </HeaderBox>
        {children}
    </Box>
);
