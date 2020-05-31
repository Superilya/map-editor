import React, { Component } from 'react'
import { Place as PlaceComponent } from 'src/components/place'
import { Place } from 'src/types/api'
import { KonvaEventObject } from 'konva/types/Node'

type PropsType = {
  selectedPlace?: Place['id']
  places: Array<Place> | null
  isEdit: boolean
  onClickPlace?: (evt: KonvaEventObject<MouseEvent>, place: Place) => void
}

type StateType = {
  selectedEditPlace: Place['id'] | null
}

export class PlacesView extends Component<PropsType, StateType> {
  state = {
    selectedEditPlace: null,
  }

  handleClick = (e: KonvaEventObject<MouseEvent>) => {
    const { onClickPlace, isEdit } = this.props
    const place = e.currentTarget.attrs.place as Place

    if (isEdit) {
      this.setState({
        selectedEditPlace: place.id,
      })

      return
    }

    if (typeof onClickPlace === 'function') {
      onClickPlace(e, place)
    }
  }

  render() {
    const { places, selectedPlace, isEdit } = this.props
    const { selectedEditPlace } = this.state

    if (!Array.isArray(places)) {
      return null
    }

    return places.map((place) => (
      <PlaceComponent
        draggable={isEdit}
        key={place.id}
        onClick={this.handleClick}
        isSelected={selectedPlace === place.id}
        place={place}
        isSelectedEdit={isEdit && place.id === selectedEditPlace}
      />
    ))
  }
}
