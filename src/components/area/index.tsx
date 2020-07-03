import React from 'react';
import { Area as AreaType } from 'src/types/api';
import { Shape, KonvaNodeEvents, Group, StageProps } from 'react-konva';
import { AreaKinds, BorderKinds } from 'src/constants/kinds';
import { lightGrey, darkGrey } from 'src/constants/colors';

const renderArea = (area: AreaType) => (context, shape) => {
    const [first, ...borders] = area.borders;

    context.beginPath();
    context.moveTo(first.x, first.y);

    borders.reduce((prev, next) => {
        context.bezierCurveTo(
            typeof next.cp1x === 'number' ? next.cp1x : prev.x,
            typeof next.cp1y === 'number' ? next.cp1y : prev.y,
            typeof next.cp2x === 'number' ? next.cp2x : prev.x,
            typeof next.cp2y === 'number' ? next.cp2y : prev.y,
            next.x,
            next.y
        );

        return next;
    }, first);

    context.closePath();
    // (!) Konva specific method, it is very important
    context.fillStrokeShape(shape);
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

const getStroke = (kind: BorderKinds) => {
    switch (kind) {
        case BorderKinds.WALL: {
            return darkGrey;
        }

        default: {
            return undefined;
        }
    }
};

const renderBorders = (area: AreaType) => {
    const [firstBorder, ...other] = area.borders;

    if (!firstBorder) {
        return null;
    }

    const result: JSX.Element[] = [];

    other.reduce((prev, next) => {
        if (next.kind !== BorderKinds.TRANSPARENT) {
            result.push(
                <Shape
                    key={next.id}
                    width={20}
                    height={20}
                    sceneFunc={renderPath(prev, next)}
                    stroke={getStroke(next.kind)}
                    strokeWidth={5}
                    fillEnabled={false}
                />
                // <Line points={[prev.x, prev.y, next.x, next.y]} stroke="black" strokeWidth={4} />
            );
        }

        return next;
    }, firstBorder);

    return result;
};

const getFill = (kind: AreaKinds) => {
    switch (kind) {
        case AreaKinds.DEFAULT: {
            return lightGrey;
        }

        case AreaKinds.PLACE: {
            return lightGrey;
        }

        default: {
            return undefined;
        }
    }
};

type PropsType = StageProps & {
    area: AreaType;
    name: string | number;
    onClick?: KonvaNodeEvents['onClick'];
    x?: number;
    y?: number;
    fill?: string;
};

export const Area = ({ area, name, fill, ...other }: PropsType) => {
    return (
        <Group {...other}>
            <Shape
                width={20}
                height={20}
                sceneFunc={renderArea(area)}
                lineJoin="round"
                fill={fill || getFill(area.kind)}
                name={String(name)}
            />
            {renderBorders(area)}
        </Group>
    );
};
