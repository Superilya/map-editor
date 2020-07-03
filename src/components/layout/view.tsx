import React, { ReactNode } from 'react';
import { User, Building } from 'src/types/api';
import { goToPage as goToPageAction } from 'src/ducks/app/actions';
import { LeftMenu } from 'src/components/left-menu';

import { Left, Right, Box } from './styles';

export type PropsType = {
    isSelfLoading: boolean;
    isBuildingsLoading: boolean;
    buildings: Array<Building>;
    selfUser: User;
    children: ReactNode;
    isEditing: boolean;
    goToPage: typeof goToPageAction;
};

export const LayoutView = ({ children }: PropsType) => (
    <Box>
        <Left>
            <LeftMenu />
        </Left>
        <Right>{children}</Right>
    </Box>
);
