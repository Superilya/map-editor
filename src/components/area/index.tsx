import React from 'react';
import { Area as AreaType } from 'src/types/api';
import { Shape, KonvaNodeEvents, Path, Group } from 'react-konva';
import { AreaKinds, BorderKinds } from 'src/constants/kinds';

const renderArea = (area: AreaType) => (context, shape) => {
    const [ first, ...borders ] = area.borders;
    
    context.beginPath();
    context.moveTo(first.x, first.y);

    borders.reduce((prev, next) => {
        context.bezierCurveTo(
            next.cp1x || prev.x,
            next.cp1y || prev.y,
            next.cp2x || next.x,
            next.cp2y || next.y,
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
}

const renderBorders = (area: AreaType, x?: number, y?: number, rotation?: number) => {
    const [firstBorder, ...other] = area.borders;

    if (!firstBorder) {
        return null;
    }

    const result: JSX.Element[] = [];

    other.reduce((prev, next) => {
        if (next.kind !== BorderKinds.TRANSPARENT) {
            result.push(
                <Path
                    x={x}
                    y={y}
                    data='qwer'
                    sceneFunc={renderPath(prev, next)}
                    stroke="black"
                    strokeWidth={4}
                    rotation={rotation}
                />
                // <Line x={x} y={y} points={[prev.x, prev.y, next.x, next.y]} stroke="black" strokeWidth={4} />
            );
        }

        return next;
    }, firstBorder);

    return result;
};

const getFill = (kind: AreaKinds) => {
    switch (kind) {
        case AreaKinds.DEFAULT: {
            return '#e7cbfc';
        }

        case AreaKinds.PLACE: {
            return '#FF0000';
        }
    }
}

type PropsType = {
    area: AreaType;
    name: string | number;
    onClick?: KonvaNodeEvents['onClick'];
    x?: number;
    y?: number;
    rotation?: number;
    fill?: string;
}

export const Area = ({ area, onClick, name, x, y, rotation, fill }: PropsType) => {
    return (
        <Group rotation={rotation}>
            <Shape
                x={x}
                y={y}
                sceneFunc={renderArea(area)}
                fill={fill || getFill(area.kind)}
                onClick={onClick}
                name={String(name)}
            />
            {renderBorders(area, x, y)}
        </Group>
    )
}