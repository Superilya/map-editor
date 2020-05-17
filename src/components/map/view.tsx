import React, { Component } from 'react';
import Konva from 'konva';
import { Room, Area } from 'src/types/api';
import { Stage, Layer, Rect, Shape, KonvaNodeEvents, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';
import { BorderKinds } from 'src/constants/kinds';

type PropsType = {
    width: number;
    height: number;
    rooms: Array<Room>;
    isRoomsLoading: boolean;
    mapWidth: number;
    mapHeight: number;
}

const renderArea = (area: Area) => (context, shape) => {
    context.beginPath();

    const [ first, ...borders ] = area.borders;
    context.moveTo(first.x, first.y);

    for (const targetBoder of borders) {
        context.lineTo(targetBoder.x, targetBoder.y);
    }

    context.closePath();
    // (!) Konva specific method, it is very important
    context.fillStrokeShape(shape);
};

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

    console.log(widthScale, heightScale);
    return Math.min(widthScale, heightScale) - 0.04;
}

// const getOffset = (screenSize: number, mapSize: number): number => {
//     return Math.floor((screenSize / 2) - (mapSize / 2));
// };

const renderBorders = (area: Area) => {
    const [firstBorder, ...other] = area.borders;

    if (!firstBorder) {
        return null;
    }

    const result: JSX.Element[] = [];

    other.reduce((prev, next) => {
        if (next.kind !== BorderKinds.TRANSPARENT) {
            result.push(
                <Line points={[prev.x, prev.y, next.x, next.y]} stroke="black" strokeWidth={4} />
            );
        }

        return next;
    }, firstBorder);

    return result;
}

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
            <Stage
                offset={{ x: -200, y: -50 }}
                width={width}
                height={height}
                draggable
                scale={{ x: this.scale, y: this.scale }}
                onWheel={this.handleWheel}>
                <Layer>
                    <Rect
                        x={ 0 }
                        y={ 0 }
                        width={ mapWidth }
                        height={ mapHeight }
                        fill="#00FF00"
                    />
                </Layer>
                {rooms.map((room: Room) => (
                    <Layer
                        x={ room.x }
                        y={ room.y }
                    >
                        <Shape
                            key={room.id}
                            sceneFunc={renderArea(room.area)}
                            fill="#e7cbfc"
                            strokeWidth={4}
                            onClick={this.handleClickRoom}
                            name={String(room.id)}
                        />
                        {renderBorders(room.area)}
                    </Layer>
                ))}
            </Stage>
        )
    }
}