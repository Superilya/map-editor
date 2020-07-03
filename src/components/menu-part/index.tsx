import React, { ReactNode } from 'react';
import { Text } from 'src/components/ui/text';

import { Box, HeaderBox } from './styles';

type PropsType = {
    children: ReactNode;
    title: ReactNode;
};

export const MenuPart = ({ title, children }: PropsType) => (
    <Box>
        <HeaderBox>
            <Text bold>{title}</Text>
        </HeaderBox>
        {children}
    </Box>
);
