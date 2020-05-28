import React, { Component } from 'react'
import { Area } from 'src/components/area'
import { MapUser } from 'src/components/map-user'
import { Place } from 'src/types/api'
import { Group } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'

type PropsType = {
  selectedPlace?: Place['id']
  places: Array<Place> | null
  onClickPlace?: (evt: KonvaEventObject<MouseEvent>, place: Place) => void
}

export class PlacesView extends Component<PropsType> {
  handleClick = (e: KonvaEventObject<MouseEvent>) => {
    const { onClickPlace } = this.props
    const place = e.currentTarget.attrs.place as Place

    if (typeof onClickPlace === 'function') {
      onClickPlace(e, place)
    }
  }

  render() {
    const { places, selectedPlace } = this.props

    if (!Array.isArray(places)) {
      return null
    }

    return places.map((place) => (
      <Group
        key={place.id}
        place={place}
        onClick={this.handleClick}
        x={place.x}
        y={place.y}
      >
        <Area
          fill={selectedPlace === place.id ? '#0000FF' : undefined}
          name={place.id}
          area={place.area}
          rotation={place.rotation}
        />
        {place.userId && <MapUser userId={place.userId} />}
      </Group>
    ))
  }
}
