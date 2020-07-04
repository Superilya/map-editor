import React, { Component, createRef, RefObject } from 'react';
import { Building, Place, Room } from 'src/types/api';
import { Map } from 'src/components/map';
// import { Tool } from 'src/components/tool';
import { goToPage as goToPageAction } from 'src/ducks/app/actions';
import { buildingLink } from 'src/routing/links';
import { Text } from 'src/components/ui/text';
import { Box, FloorsBox, FloorItem, FloorInner } from './styles';
// import { Places } from 'src/components/places';

type PropsType = {
    building: Building;
    isBuildingsLoading: boolean;
    currentFloor: Building['floors'][0] | null;
    selectedPlace?: Place['id'];
    selectedRoom?: Room['id'];
    isEditing: boolean;
    goToPage: typeof goToPageAction;
};

type StateType = {
    width: number | null;
    height: number | null;
};

export class BuildingPageView extends Component<PropsType, StateType> {
    private box: RefObject<HTMLDivElement> = createRef();

    state: StateType = {
        width: null,
        height: null,
    };

    componentDidMount() {
        this.updateSize();
    }

    componentDidUpdate() {
        this.updateSize();
    }

    updateSize = () => {
        const { width, height } = this.state;

        if (
            !this.box.current ||
            !this.box.current.clientWidth ||
            !this.box.current.clientHeight
        ) {
            return;
        }

        if (
            width !== this.box.current.clientWidth ||
            height !== this.box.current.clientHeight
        ) {
            this.setState({
                width: this.box.current.clientWidth || null,
                height: this.box.current.clientHeight || null,
            });
        }
    };

    handleClickFloor = (e: React.MouseEvent<HTMLDivElement>) => {
        const { floor } = e.currentTarget.dataset;
        const { goToPage, building, isEditing } = this.props;

        if (isEditing) {
            return;
        }

        goToPage(buildingLink.get({ buildingId: String(building.id), floor }));
    };

    handleClickPlace = (place: Place) => {
        const {
            building,
            currentFloor,
            goToPage,
            selectedPlace,
            isEditing,
        } = this.props;

        if (isEditing) {
            return;
        }

        if (place.id === selectedPlace) {
            goToPage(
                buildingLink.get({
                    buildingId: String(building.id),
                    floor: String(currentFloor),
                })
            );
        } else {
            goToPage(
                buildingLink.get(
                    {
                        buildingId: String(building.id),
                        floor: String(currentFloor),
                    },
                    { place: String(place.id) }
                )
            );
        }
    };

    handleClickRoom = (room: Room) => {
        const { building, currentFloor, goToPage, selectedRoom } = this.props;

        if (room.id === selectedRoom) {
            goToPage(
                buildingLink.get({
                    buildingId: String(building.id),
                    floor: String(currentFloor),
                })
            );
        } else {
            goToPage(
                buildingLink.get(
                    {
                        buildingId: String(building.id),
                        floor: String(currentFloor),
                    },
                    { room: String(room.id) }
                )
            );
        }
    };

    renderMap() {
        const {
            building,
            currentFloor,
            selectedPlace,
            selectedRoom,
        } = this.props;
        const { height, width } = this.state;

        if (!height || !width) {
            return null;
        }

        return (
            <Map
                onClickPlace={this.handleClickPlace}
                onClickRoom={this.handleClickRoom}
                selectedPlace={selectedPlace}
                selectedRoom={selectedRoom}
                key={`${building.id}-${currentFloor}`}
                width={width}
                height={height}
                mapWidth={building.width}
                mapHeight={building.height}
            />
        );
    }

    render() {
        const {
            building,
            isBuildingsLoading,
            currentFloor,
            isEditing,
        } = this.props;

        if (isBuildingsLoading) {
            return null;
        }

        return (
            <Box ref={this.box}>
                {/* <Tool /> */}
                <FloorsBox>
                    {building.floors.map((floor) => (
                        <FloorItem
                            key={floor}
                            active={floor === currentFloor}
                            data-floor={floor}
                            onClick={this.handleClickFloor}
                            disabled={isEditing}
                        >
                            <FloorInner>
                                <Text>{floor}</Text>
                            </FloorInner>
                        </FloorItem>
                    ))}
                </FloorsBox>
                {this.renderMap()}
            </Box>
        );
    }
}
