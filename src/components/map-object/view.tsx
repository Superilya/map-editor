import React, { Component, Fragment, createRef } from 'react';
import { Area } from 'src/components/area';
import { MapUser } from 'src/components/map-user';
import { Place, ObjectType } from 'src/types/api';
import { Group, Transformer, Rect, Circle } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';
import Konva from 'konva';

type AvailableObjects = Place & ObjectType;

type PropsTyps<T extends AvailableObjects> = {
    object: T;
    isSelected?: boolean;
    isSelectedEdit?: boolean;
    draggable?: boolean;
    onClick?: (object: T) => void;
    onChangePosition?: (place: T, newX: T['x'], newY: T['y']) => void;
    onChangeRotation?: (place: T, newRotation: T['rotation']) => void;
    onDelete?: (object: T) => void;
};

const enabledAnchors = [];

export class MapObjectView<T extends AvailableObjects> extends Component<
    PropsTyps<T>
> {
    private shapeRef = createRef<Konva.Group>();

    private trRef = createRef<Konva.Transformer>();

    componentDidUpdate() {
        const { isSelectedEdit } = this.props;

        if (isSelectedEdit && this.trRef.current && this.shapeRef.current) {
            // we need to attach transformer manually
            this.trRef.current.nodes([this.shapeRef.current]);

            const layer = this.trRef.current.getLayer();

            if (layer) {
                layer.batchDraw();
            }
        }
    }

    handleClick = (e: KonvaEventObject<MouseEvent>) => {
        const { onClick } = this.props;
        const object = e.currentTarget.attrs.object as T;

        if (typeof onClick === 'function') {
            onClick(object);
        }
    };

    handleChangePosition = (e: KonvaEventObject<DragEvent>) => {
        const { onChangePosition } = this.props;
        const object = e.currentTarget.attrs.object as T;
        const newX = Math.round(e.currentTarget.x());
        const newY = Math.round(e.currentTarget.y());

        if (typeof onChangePosition === 'function') {
            onChangePosition(object, newX, newY);
        }
    };

    handleDradStart = (e: KonvaEventObject<DragEvent>) => {
        const { onClick, isSelectedEdit } = this.props;
        const object = e.currentTarget.attrs.object as T;

        if (typeof onClick === 'function' && !isSelectedEdit) {
            onClick(object);
        }
    };

    handleTransform = (e: KonvaEventObject<Event>) => {
        const { onChangeRotation } = this.props;
        const object = e.currentTarget.attrs.object as T;
        const rotation = Math.round(e.currentTarget.rotation());

        if (typeof onChangeRotation === 'function') {
            onChangeRotation(object, rotation);
        }
    };

    handleDelete = (e: KonvaEventObject<MouseEvent>) => {
        const { onDelete } = this.props;
        const object = e.currentTarget.attrs.object as T;

        if (typeof onDelete === 'function') {
            onDelete(object);
        }
    };

    render() {
        const { object, isSelected, isSelectedEdit, draggable } = this.props;

        return (
            <Fragment key={object.id}>
                <Group
                    x={object.x}
                    y={object.y}
                    onClick={this.handleClick}
                    object={object}
                    draggable={draggable}
                    onDragStart={this.handleDradStart}
                    onDragEnd={this.handleChangePosition}
                >
                    <Group ref={this.shapeRef} rotation={object.rotation}>
                        <Area
                            fill={isSelected ? '#0000FF' : undefined}
                            name={String(object.id)}
                            area={object.area}
                        />
                        <Rect
                            width={object.area.width}
                            height={object.area.height}
                            offsetX={object.area.offsetX || 0}
                            offsetY={object.area.offsetY || 0}
                        />
                    </Group>
                    {isSelectedEdit && (
                        <Circle
                            onClick={this.handleDelete}
                            radius={20}
                            object={object}
                            fill="yellow"
                            offsetX={(object.area.offsetX || 0) + 20}
                            offsetY={(object.area.offsetY || 0) + 20}
                        />
                    )}
                    {object.userId && <MapUser userId={object.userId} />}
                </Group>
                {isSelectedEdit && (
                    <Transformer
                        ref={this.trRef}
                        object={object}
                        enabledAnchors={enabledAnchors}
                        onTransformEnd={this.handleTransform}
                    />
                )}
            </Fragment>
        );
    }
}
