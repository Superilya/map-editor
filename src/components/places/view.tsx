import React, { Component } from 'react'
import { Place as PlaceComponent } from 'src/components/place'
import { Place } from 'src/types/api'
import {
  setPosition as setPositionAction,
  setRotation as setRotationAction,
  deletePlace as deletePlaceAction,
} from 'src/ducks/room-editing/actions'

type PropsType = {
  selectedPlace?: Place['id']
  places: Array<Place> | null
  isEdit: boolean
  setPosition: typeof setPositionAction
  setRotation: typeof setRotationAction
  deletePlace: typeof deletePlaceAction
  onClickPlace?: (place: Place) => void
}

type StateType = {
  selectedEditPlace: Place['id'] | null
}

export class PlacesView extends Component<PropsType, StateType> {
  state = {
    selectedEditPlace: null,
  }

  handleClick = (place: Place) => {
    const { onClickPlace, isEdit } = this.props

    if (isEdit) {
      this.setState({
        selectedEditPlace: place.id,
      })

      return
    }

    if (typeof onClickPlace === 'function') {
      onClickPlace(place)
    }
  }

  handleChangePosition = (place: Place, newX: Place['x'], newY: Place['y']) => {
    const { setPosition } = this.props

    setPosition(place.id, newX, newY)
  }

  handleChangeRotation = (place: Place, newRotation: Place['rotation']) => {
    const { setRotation } = this.props

    setRotation(place.id, newRotation)
  }

  handleDelete = (place: Place) => {
    const { deletePlace } = this.props

    deletePlace(place.id)
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
        onChangePosition={this.handleChangePosition}
        onChangeRotation={this.handleChangeRotation}
        onDelete={this.handleDelete}
        isSelected={selectedPlace === place.id}
        place={place}
        isSelectedEdit={isEdit && place.id === selectedEditPlace}
      />
    ))
  }
}
