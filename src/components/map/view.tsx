import React, { Component } from 'react';
import Konva from 'konva';
import { ReactReduxContext, Provider } from "react-redux";
import { Room } from 'src/types/api';
import { Stage, Layer, Rect, KonvaNodeEvents } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';

import { Area } from 'src/components/area';
import { Places } from 'src/components/places';

type PropsType = {
    width: number;
    height: number;
    rooms: Array<Room>;
    isRoomsLoading: boolean;
    mapWidth: number;
    mapHeight: number;
}

const getInitialScale = (
    screenWidth: number,
    screenHeight: number,
    mapWidth: number,
    mapHeight: number
): number => {
    if (screenWidth > mapWidth && screenHeight > mapHeight) {
        return 1;
    }

    const widthScale = screenWidth / mapWidth;
    const heightScale = screenHeight / mapHeight;

    return Math.min(widthScale, heightScale) - 0.04;
}

// const getOffset = (screenSize: number, mapSize: number): number => {
//     return Math.floor((screenSize / 2) - (mapSize / 2));
// };

export class MapView extends Component<PropsType> {
    private scaleBy = 1.03;
    private scale: number;

    constructor(props: PropsType) {
        super(props);

        this.scale = getInitialScale(
            props.width,
            props.height,
            props.mapWidth,
            props.mapHeight
        );
    }

    // componentDidMount() {
    //     setInterval(() => {
    //         this.forceUpdate();
    //     }, 2000);
    // }

    handleWheel = (e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        const stage = e.currentTarget as Konva.Stage;
        var oldScale = stage.scaleX();

        const pointer = stage.getPointerPosition();

        if (!pointer) {
            return;
        }

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        const newScale = e.evt.deltaY > 0
            ? oldScale * this.scaleBy
            : oldScale / this.scaleBy;

        this.scale = newScale;
        stage.scale({ x: newScale, y: newScale });

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };

        stage.position(newPos);
        stage.batchDraw();
    }

    handleClickRoom: KonvaNodeEvents['onClick'] = (e) => {
        // console.log(e.currentTarget.name());
        const qwe = e.currentTarget.getStage()?.getPointerPosition();

        console.log('qwer', qwe);
    }

    render() {
        const { rooms, isRoomsLoading, width, height, mapWidth, mapHeight } = this.props;

        if (isRoomsLoading || !width || !height) {
            return null;
        }

        return (
            <ReactReduxContext.Consumer>
                {({ store }) => (
                    <Stage
                        offset={{ x: -200, y: -50 }}
                        width={width}
                        height={height}
                        draggable
                        scale={{ x: this.scale, y: this.scale }}
                        onWheel={this.handleWheel}>
                        <Provider store={store}>
                            {rooms.map((room: Room) => (
                                <Layer
                                    x={ room.x }
                                    y={ room.y }
                                    key={room.id}
                                >
                                    <Area
                                        area={room.area}
                                        onClick={this.handleClickRoom}
                                        name={room.id}
                                    />
                                    <Places roomId={ room.id } />
                                </Layer>
                            ))}
                        </Provider>
                    </Stage>
                )}
            </ReactReduxContext.Consumer>
        )
    }
}