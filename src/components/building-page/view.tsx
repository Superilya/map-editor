import React, { Component, createRef, RefObject, MouseEvent } from 'react';
import { Building } from 'src/types/api';
import { Map } from 'src/components/map';
import { updateRooms } from 'src/ducks/building-page/actions';
import { Box, FloorsBox, FloorItem } from './styles';
import { type } from 'os';

type PropsType = {
    building: Building;
    isBuildingsLoading: boolean;
    currentFloor: Building['floors'][0] | null;
    updateRooms: typeof updateRooms
}

type StateType = {
    width: number | null,
    height: number | null
}

export class BuildingPageView extends Component<PropsType, StateType> {
    private box: RefObject<HTMLDivElement> = createRef();

    state: StateType = {
        width: null,
        height: null
    }

    componentDidMount() {
        this.updateSize()
    }

    componentDidUpdate() {
        this.updateSize()
    }

    updateSize = () => {
        const { width, height } = this.state;

        if (width != this.box.current?.clientWidth || height != this.box.current?.clientHeight) {
            this.setState({
                width: this.box.current?.clientWidth || null,
                height: this.box.current?.clientHeight || null
            });
        }
    }

    handleClickFloor = (e: MouseEvent<HTMLDivElement>) => {
        const floor = Number(e.currentTarget.dataset.floor);
        const { updateRooms, building } = this.props;

        if (Number.isNaN(floor)) {
            return null;
        }

        updateRooms(building.id, floor);
    }

    renderMap() {
        const { building, currentFloor } = this.props;
        const { height, width } = this.state;
        console.log('qwer', height, width);

        if (!height || !width) {
            return null;
        }

        return (
            <Map
                key={`${building.id}-${currentFloor}`}
                width={width}
                height={height}
                mapWidth={building.width}
                mapHeight={building.height}
            />
        );
    }

    render() {
        const { building, isBuildingsLoading, currentFloor } = this.props;

        if (isBuildingsLoading) {
            return null;
        }

        return (
            <Box ref={ this.box }>
                <FloorsBox>
                    {building.floors.map((floor) => (
                        <FloorItem
                            key={floor}
                            active={floor === currentFloor}
                            data-floor={floor}
                            onClick={ this.handleClickFloor }
                        >
                            {floor}
                        </FloorItem>
                    ))}
                </FloorsBox>
                {this.renderMap()}
            </Box>
        );
    }
};
