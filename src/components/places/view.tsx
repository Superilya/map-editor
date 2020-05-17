import React, { Component } from 'react';
import { Area } from 'src/components/area';
import { Place } from 'src/types/api';
import { Layer } from 'react-konva';

type PropsType = {
    places: Array<Place> | null
}

export class PlacesView extends Component<PropsType> {
    render() {
        const { places } = this.props;
        
        if (!Array.isArray(places)) {
            return null;
        }

        return places.map((place) => (
            <Area
                x={place.x}
                y={place.y}
                name={ place.id }
                area={ place.area }
            />
        ));
    }
}