import React, { Component, createRef, RefObject } from 'react';
import { Group as GroupAction, Shape, Circle } from 'react-konva';
import { cloneDeep } from 'lodash';
import { Border, Room } from 'src/types/api';

import Konva from 'konva';
import { Group } from 'konva/types/Group';
import {
    updateBorder as updateBorderAction,
    deleteBorder as deleteBorderAction,
    selectBorder as selectBorderAcrtion,
} from 'src/ducks/areas/actions';

type Props = {
    room?: Room;
    updateBorder: typeof updateBorderAction;
    deleteBorder: typeof deleteBorderAction;
    selectBorder: typeof selectBorderAcrtion;
};

const renderPath = (prev, next) => (context, shape) => {
    context.beginPath();
    context.moveTo(prev.x, prev.y);

    context.bezierCurveTo(
        next.cp1x || prev.x,
        next.cp1y || prev.y,
        next.cp2x || next.x,
        next.cp2y || next.y,
        next.x,
        next.y
    );

    // context.closePath();
    // (!) Konva specific method, it is very important
    context.fillStrokeShape(shape);
};

export class AreaEditView extends Component<Props> {
    group: RefObject<Group> = createRef();

    borders: Array<Border> = [];

    handleSelect = (e: Konva.KonvaEventObject<MouseEvent | DragEvent>) => {
        const { selectBorder, room } = this.props;
        const borderId = e.currentTarget.attrs.borderId as Border['id'];

        if (!room) {
            return;
        }

        selectBorder(room.area, borderId);
    };

    handleDragPoint = (e: Konva.KonvaEventObject<DragEvent>) => {
        if (!this.group.current) {
            return;
        }

        const targetBorder = this.borders.find(
            (border) => String(border.id) === String(e.currentTarget.id())
        );

        if (!targetBorder) {
            return;
        }

        if (targetBorder === this.borders[this.borders.length - 1]) {
            this.borders[0].x = e.currentTarget.x();
            this.borders[0].y = e.currentTarget.y();
        }

        targetBorder.x = e.currentTarget.x();
        targetBorder.y = e.currentTarget.y();

        this.group.current.draw();
    };

    handleDrugEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
        const { room, updateBorder } = this.props;

        if (!room) {
            return;
        }

        const borderId = e.currentTarget.attrs.borderId as Border['id'];

        updateBorder(
            room.area,
            borderId,
            Math.floor(e.currentTarget.x()),
            Math.floor(e.currentTarget.y())
        );
    };

    handleDblClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const { deleteBorder, room } = this.props;
        const borderId = e.currentTarget.attrs.borderId as Border['id'];

        if (!room) {
            return;
        }

        deleteBorder(room.area, borderId);
    };

    renderBorders = () => {
        const [firstBorder, ...other] = this.borders;

        if (!firstBorder) {
            return null;
        }

        const result: JSX.Element[] = [];

        other.reduce((prev, next) => {
            result.push(
                <Shape
                    key={next.id}
                    id={String(next.id)}
                    width={20}
                    height={20}
                    sceneFunc={renderPath(prev, next)}
                    dashEnabled
                    dash={[20, 40]}
                    stroke="black"
                    strokeWidth={7}
                    fillEnabled={false}
                />
                // <Line points={[prev.x, prev.y, next.x, next.y]} stroke="black" strokeWidth={4} />
            );

            return next;
        }, firstBorder);

        return result;
    };

    renderCircles = () => {
        const [firstBorder, ...other] = this.borders;

        if (!firstBorder) {
            return null;
        }

        return other.map((border) => {
            return (
                <Circle
                    key={border.id}
                    onDragMove={this.handleDragPoint}
                    onDragEnd={this.handleDrugEnd}
                    onDblClick={this.handleDblClick}
                    onDragStart={this.handleSelect}
                    onClick={this.handleSelect}
                    draggable
                    x={border.x}
                    y={border.y}
                    width={20}
                    height={20}
                    fill="red"
                    radius={10}
                    id={String(border.id)}
                    borderId={border.id}
                />
                // <Line points={[prev.x, prev.y, next.x, next.y]} stroke="black" strokeWidth={4} />
            );
        });
    };

    render() {
        const { room } = this.props;

        if (!room) {
            return null;
        }

        this.borders = cloneDeep(room.area.borders);

        return (
            <GroupAction ref={this.group} x={room.x} y={room.y} key={room.id}>
                {this.renderBorders()}
                {this.renderCircles()}
            </GroupAction>
        );
    }
}
