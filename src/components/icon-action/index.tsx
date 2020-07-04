import React, { HTMLAttributes } from 'react';
import { Icon } from 'src/components/ui/icon';
import { Box, InnerBox } from './styles';

type PropsType = HTMLAttributes<HTMLDivElement> & {
    icon: string;
};

export const IconAction = ({ icon, ...props }: PropsType) => (
    <Box {...props}>
        <InnerBox>
            <Icon name={icon} />
        </InnerBox>
    </Box>
);
