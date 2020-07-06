import React from 'react';
import { Area } from 'src/components/area';
import { Stage, Layer } from 'react-konva';
import { Area as AreaType } from 'src/types/api';
import { skyBlue } from 'src/constants/colors';

type PropsType = {
    area: AreaType;
};

export const AreaPreview = ({ area }: PropsType) => (
    <Stage
        offset={{
            x: -1 * Math.floor(73 / 2 / 0.4),
            y: -1 * Math.floor(73 / 2 / 0.4),
        }}
        width={73}
        height={73}
        scale={{ x: 0.4, y: 0.4 }}
    >
        <Layer>
            <Area area={area} name={String(area.id)} fill={skyBlue} />
        </Layer>
    </Stage>
);
