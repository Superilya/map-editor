import React, { Component, Fragment, createRef } from 'react'
import { Area } from 'src/components/area'
import { MapUser } from 'src/components/map-user'
import { Place } from 'src/types/api'
import { Group, Transformer, Rect } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'
import Konva from 'konva'
import { PlaceChange } from 'src/types/place-editing'

type PropsTyps = {
  place: Place
  isSelected?: boolean
  isSelectedEdit?: boolean
  draggable?: boolean
  onClick?: (place: Place) => void
  onChangePosition?: (place: Place, newX: Place['x'], newY: Place['y']) => void
  onChangeRotation?: (place: Place, newRotation: Place['rotation']) => void
  placeChange?: PlaceChange
}

const enabledAnchors = []
const getField = (
  place: Place,
  field: keyof PlaceChange,
  placeChange?: PlaceChange
) => {
  if (!placeChange) {
    return place[field]
  }

  return placeChange[field] ? placeChange[field] : place[field]
}

export class PlaceView extends Component<PropsTyps> {
  private shapeRef = createRef<Konva.Group>()

  private trRef = createRef<Konva.Transformer>()

  componentDidUpdate() {
    const { isSelectedEdit } = this.props

    // console.log(this.trRef.current, this.shapeRef.current);

    if (isSelectedEdit && this.trRef.current && this.shapeRef.current) {
      // we need to attach transformer manually
      this.trRef.current.nodes([this.shapeRef.current])

      const layer = this.trRef.current.getLayer()

      if (layer) {
        layer.batchDraw()
      }
    }
  }

  handleClick = (e: KonvaEventObject<MouseEvent>) => {
    const { onClick } = this.props
    const place = e.currentTarget.attrs.place as Place

    if (typeof onClick === 'function') {
      onClick(place)
    }
  }

  handleChangePosition = (e: KonvaEventObject<DragEvent>) => {
    const { onChangePosition } = this.props
    const place = e.currentTarget.attrs.place as Place
    const newX = Math.round(e.currentTarget.x())
    const newY = Math.round(e.currentTarget.y())

    if (typeof onChangePosition === 'function') {
      onChangePosition(place, newX, newY)
    }
  }

  handleTransform = (e: KonvaEventObject<Event>) => {
    const { onChangeRotation } = this.props
    const place = e.currentTarget.attrs.place as Place
    const rotation = Math.round(e.currentTarget.rotation())

    if (typeof onChangeRotation === 'function') {
      onChangeRotation(place, rotation)
    }
  }

  render() {
    const {
      place,
      isSelected,
      isSelectedEdit,
      draggable,
      placeChange,
    } = this.props

    return (
      <Fragment key={place.id}>
        <Group
          x={getField(place, 'x', placeChange)}
          y={getField(place, 'y', placeChange)}
          onClick={this.handleClick}
          place={place}
          draggable={draggable}
          onDragEnd={this.handleChangePosition}
        >
          <Group
            ref={this.shapeRef}
            rotation={getField(place, 'rotation', placeChange)}
          >
            <Area
              fill={isSelected ? '#0000FF' : undefined}
              name={String(place.id)}
              area={place.area}
            />
            <Rect
              width={place.area.width}
              height={place.area.height}
              offsetX={place.area.offsetX || 0}
              offsetY={place.area.offsetY || 0}
            />
          </Group>
          {place.userId && <MapUser userId={place.userId} />}
        </Group>
        {isSelectedEdit && (
          <Transformer
            ref={this.trRef}
            place={place}
            enabledAnchors={enabledAnchors}
            onTransformEnd={this.handleTransform}
          />
        )}
      </Fragment>
    )
  }
}
