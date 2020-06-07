import React, { Component } from 'react'
import { Place as PlaceComponent } from 'src/components/place'
import { Place } from 'src/types/api'
import {
  setPosition as setPositionAction,
  setRotation as setRotationAction,
} from 'src/ducks/room-editing/actions'
import { selectUpdatedPlaces } from 'src/ducks/room-editing/selectors'

type PropsType = {
  selectedPlace?: Place['id']
  places: Array<Place> | null
  isEdit: boolean
  setPosition: typeof setPositionAction
  setRotation: typeof setRotationAction
  onClickPlace?: (place: Place) => void
  updatedPlaces: ReturnType<typeof selectUpdatedPlaces> | null
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

  render() {
    const { places, selectedPlace, isEdit, updatedPlaces } = this.props
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
        isSelected={selectedPlace === place.id}
        place={place}
        placeChange={updatedPlaces ? updatedPlaces[place.id] : undefined}
        isSelectedEdit={isEdit && place.id === selectedEditPlace}
      />
    ))
  }
}
