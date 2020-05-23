import React, { Component, ReactNode, MouseEvent } from 'react';
import { User, Building } from 'src/types/api';
import { goToPage } from 'src/ducks/app/actions';
import { buildingLink, rootLink } from 'src/routing/links';
import { getDefaultFloor } from 'src/utils/building';

import {
    MenuBox,
    Menu,
    Avatar,
    MenuItem,
    MenuItemList,
    SubItem,
    Box
} from './styles';

export type PropsType = {
    isSelfLoading: boolean;
    isBuildingsLoading: boolean;
    buildings: Array<Building>;
    selfUser: User;
    children: ReactNode;
    goToPage: typeof goToPage;
}

export class LayoutView extends Component<PropsType> {
    state = {
        isBuildingsListOpen: false
    }

    handleToggleList = () => {
        const { isBuildingsListOpen } = this.state;

        this.setState({
            isBuildingsListOpen: !isBuildingsListOpen
        });
    }

    handleClickMain = () => {
        this.props.goToPage(rootLink.get());
    }

    handleClickBuilding = (e: MouseEvent<HTMLDivElement>) => {
        this.props.goToPage(buildingLink.get(e.currentTarget.dataset));
    }

    render() {
        const {
            selfUser,
            isBuildingsLoading,
            buildings,
            children
        } = this.props;
        const { isBuildingsListOpen } = this.state;

        return (
            <Box>
                <MenuBox>
                    <Menu>
                        <MenuItem onClick={this.handleClickMain}>
                            Главная
                        </MenuItem>
                        <MenuItem isDisabled={isBuildingsLoading} onClick={this.handleToggleList}>
                            <span>
                                Список зданий
                            </span>
                            {!isBuildingsLoading && isBuildingsListOpen && (
                                <MenuItemList>
                                    {buildings.map(building => (
                                        <SubItem 
                                            onClick={this.handleClickBuilding}
                                            data-building-id={building.id}
                                            data-floor={getDefaultFloor(building)}
                                            key={building.id}
                                        >
                                            {building.name}
                                        </SubItem>
                                    ))}
                                </MenuItemList>
                            )}
                        </MenuItem>
                    </Menu>
                    <Avatar url={selfUser ? selfUser.avatarUrl : null} />
                </MenuBox>
                {children}
            </Box>
        );
    }
}