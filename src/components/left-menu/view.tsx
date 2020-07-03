import React, { Component, MouseEvent } from 'react';

import { Search } from 'src/components/search';
import { MenuPart } from 'src/components/menu-part';
import { goToPage as goToPageAction } from 'src/ducks/app/actions';
import { Text } from 'src/components/ui/text';
import { Building, User } from 'src/types/api';
import { buildingLink } from 'src/routing/links';
import { getDefaultFloor } from 'src/utils/building';
import {
    Top,
    Box,
    Avatar,
    Bottom,
    NameBox,
    SearchBox,
    BuildingBox,
    SearchInner,
} from './styles';

type PropsType = {
    buildings: Building[];
    selectedBuildingId: Building['id'];
    goToPage: typeof goToPageAction;
    selfUser: User;
};

export class LeftMenuView extends Component<PropsType> {
    handleClickBuilding = (e: MouseEvent<HTMLDivElement>) => {
        const { goToPage } = this.props;

        goToPage(buildingLink.get(e.currentTarget.dataset));
    };

    render() {
        const { buildings, selectedBuildingId, selfUser } = this.props;

        return (
            <Box>
                <Top>
                    <SearchBox>
                        <SearchInner>
                            <Search />
                        </SearchInner>
                    </SearchBox>
                    {Array.isArray(buildings) && Boolean(buildings.length) && (
                        <MenuPart title="Buildings">
                            {buildings.map((building) => (
                                <BuildingBox
                                    active={building.id === selectedBuildingId}
                                    onClick={this.handleClickBuilding}
                                    data-building-id={building.id}
                                    data-floor={getDefaultFloor(building)}
                                >
                                    <Text>{building.name}</Text>
                                </BuildingBox>
                            ))}
                        </MenuPart>
                    )}
                </Top>
                <Bottom>
                    <Avatar url={selfUser ? selfUser.avatarUrl : null} />
                    <NameBox>
                        <Text>{selfUser && selfUser.name}</Text>
                    </NameBox>
                </Bottom>
            </Box>
        );
    }
}
