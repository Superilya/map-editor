import React, { Component, Fragment, createRef } from 'react'
import { Area } from 'src/components/area'
import { MapUser } from 'src/components/map-user'
import { Place } from 'src/types/api'
import { Group, Transformer, Rect } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'
import Konva from 'konva'

type PropsTyps = {
  place: Place
  isSelected?: boolean
  isSelectedEdit?: boolean
  draggable?: boolean
  onClick: (e: KonvaEventObject<MouseEvent>) => void
}

const enabledAnchors = []

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

  render() {
    const { place, isSelected, isSelectedEdit, onClick, draggable } = this.props

    return (
      <Fragment key={place.id}>
        <Group
          x={place.x}
          y={place.y}
          onClick={onClick}
          place={place}
          draggable={draggable}
          onDragEnd={(e) => {
            console.log(
              'drag',
              place.x,
              place.y,
              e.currentTarget.x(),
              e.currentTarget.y()
            )
          }}
        >
          <Group ref={this.shapeRef} rotation={place.rotation}>
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
            enabledAnchors={enabledAnchors}
            onTransformEnd={(e) => {
              console.log(e.currentTarget.rotation())
            }}
          />
        )}
      </Fragment>
    )
  }
}
