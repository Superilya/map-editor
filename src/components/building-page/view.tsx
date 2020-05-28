import React, { Component, createRef, RefObject } from 'react'
import { Building, Place } from 'src/types/api'
import { Map } from 'src/components/map'
import { Tool } from 'src/components/tool'
import { goToPage } from 'src/ducks/app/actions'
import { buildingLink } from 'src/routing/links'
import { KonvaEventObject } from 'konva/types/Node'
import { Box, FloorsBox, FloorItem } from './styles'
// import { Places } from 'src/components/places';

type PropsType = {
  building: Building
  isBuildingsLoading: boolean
  currentFloor: Building['floors'][0] | null
  selectedPlace?: Place['id']
  goToPage: typeof goToPage
}

type StateType = {
  width: number | null
  height: number | null
}

export class BuildingPageView extends Component<PropsType, StateType> {
  private box: RefObject<HTMLDivElement> = createRef()

  state: StateType = {
    width: null,
    height: null,
  }

  componentDidMount() {
    this.updateSize()
  }

  componentDidUpdate() {
    this.updateSize()
  }

  updateSize = () => {
    const { width, height } = this.state

    if (
      width != this.box.current?.clientWidth ||
      height != this.box.current?.clientHeight
    ) {
      this.setState({
        width: this.box.current?.clientWidth || null,
        height: this.box.current?.clientHeight || null,
      })
    }
  }

  handleClickFloor = (e: React.MouseEvent<HTMLDivElement>) => {
    const { floor } = e.currentTarget.dataset
    const { goToPage, building } = this.props

    goToPage(buildingLink.get({ buildingId: String(building.id), floor }))
  }

  handleClickPlace = (evt: KonvaEventObject<MouseEvent>, place: Place) => {
    const { building, currentFloor, goToPage, selectedPlace } = this.props

    if (place.id === selectedPlace) {
      goToPage(
        buildingLink.get({
          buildingId: String(building.id),
          floor: String(currentFloor),
        })
      )
    } else {
      goToPage(
        buildingLink.get(
          { buildingId: String(building.id), floor: String(currentFloor) },
          { place: String(place.id) }
        )
      )
    }
  }

  renderMap() {
    const { building, currentFloor, selectedPlace } = this.props
    const { height, width } = this.state

    if (!height || !width) {
      return null
    }

    return (
      <Map
        onClickPlace={this.handleClickPlace}
        selectedPlace={selectedPlace}
        key={`${building.id}-${currentFloor}`}
        width={width}
        height={height}
        mapWidth={building.width}
        mapHeight={building.height}
      />
    )
  }

  render() {
    const { building, isBuildingsLoading, currentFloor } = this.props

    if (isBuildingsLoading) {
      return null
    }

    return (
      <Box ref={this.box}>
        <Tool />
        <FloorsBox>
          {building.floors.map((floor) => (
            <FloorItem
              key={floor}
              active={floor === currentFloor}
              data-floor={floor}
              onClick={this.handleClickFloor}
            >
              {floor}
            </FloorItem>
          ))}
        </FloorsBox>
        {this.renderMap()}
      </Box>
    )
  }
}
