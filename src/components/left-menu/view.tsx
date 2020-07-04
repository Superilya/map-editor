import React, { Component, MouseEvent } from 'react';

import { Search } from 'src/components/search';
import { MenuPart } from 'src/components/menu-part';
import { goToPage as goToPageAction } from 'src/ducks/app/actions';
import { Text } from 'src/components/ui/text';
import { Avatar } from 'src/components/ui/avatar';
import { Building, User, Place, Room } from 'src/types/api';
import { buildingLink } from 'src/routing/links';
import { getDefaultFloor } from 'src/utils/building';
import { PlaceInfo } from 'src/components/place-info';
import { RoomInfo } from 'src/components/room-info';
import { Top, Box, Bottom, NameBox, SearchBox, BuildingBox } from './styles';

type PropsType = {
    buildings: Building[];
    selectedBuildingId: Building['id'];
    goToPage: typeof goToPageAction;
    selfUser: User;
    place?: Place;
    room?: Room;
};

export class LeftMenuView extends Component<PropsType> {
    state = {
        isSearchFocus: false,
    };

    handleClickBuilding = (e: MouseEvent<HTMLDivElement>) => {
        const { goToPage } = this.props;

        goToPage(buildingLink.get(e.currentTarget.dataset));
    };

    handleFocusSearch = () => {
        this.setState({
            isSearchFocus: true,
        });
    };

    handleBlurSearch = () => {
        this.setState({
            isSearchFocus: false,
        });
    };

    render() {
        const {
            buildings,
            selectedBuildingId,
            selfUser,
            place,
            room,
        } = this.props;
        const { isSearchFocus } = this.state;

        return (
            <Box>
                <Top>
                    <SearchBox hide={isSearchFocus}>
                        <Search
                            onFocus={this.handleFocusSearch}
                            onBlur={this.handleBlurSearch}
                        />
                    </SearchBox>
                    {!isSearchFocus && (
                        <>
                            {Array.isArray(buildings) &&
                                Boolean(buildings.length) && (
                                    <MenuPart title="Buildings">
                                        {buildings.map((building) => (
                                            <BuildingBox
                                                active={
                                                    building.id ===
                                                    selectedBuildingId
                                                }
                                                onClick={
                                                    this.handleClickBuilding
                                                }
                                                data-building-id={building.id}
                                                data-floor={getDefaultFloor(
                                                    building
                                                )}
                                            >
                                                <Text>{building.name}</Text>
                                            </BuildingBox>
                                        ))}
                                    </MenuPart>
                                )}
                            {place && <PlaceInfo place={place} />}
                            {room && <RoomInfo room={room} />}
                        </>
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
