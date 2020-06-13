import React, { Component, ChangeEvent } from 'react'
import {
  editCancel as editCancelAction,
  editSubmit as editSubmitAction,
  setPosition as setPositionAction,
  setRotation as setRotationAction,
  deletePlace as deletePlaceAction,
} from 'src/ducks/room-editing/actions'

import { ObjectTypes } from 'src/types/place-editing'
import { Place } from 'src/types/api'

type Props = {
  selectedObjectType: ObjectTypes | null
  selectedObjectId: Place['id'] | null
  editablePlace: Place | null
  editSubmit: typeof editSubmitAction
  editCancel: typeof editCancelAction
  setPosition: typeof setPositionAction
  setRotation: typeof setRotationAction
  deletePlace: typeof deletePlaceAction
  isEditSubmitting: boolean
}

export class ToolRoomEditingView extends Component<Props> {
  handleClickSubmit = () => {
    const { editSubmit } = this.props

    editSubmit()
  }

  handleClickCancel = () => {
    const { editCancel } = this.props

    editCancel()
  }

  handleChangePlaceX = (e: ChangeEvent<HTMLInputElement>) => {
    const { setPosition, selectedObjectId, editablePlace } = this.props
    const x = Number(typeof e.currentTarget.value)

    if (!selectedObjectId || !editablePlace) {
      return
    }

    setPosition(selectedObjectId, x, editablePlace.y)
  }

  handleChangePlaceY = (e: ChangeEvent<HTMLInputElement>) => {
    const { setPosition, selectedObjectId, editablePlace } = this.props
    const y = Number(e.currentTarget.value)

    if (!selectedObjectId || !editablePlace) {
      return
    }

    setPosition(selectedObjectId, editablePlace.x, y)
  }

  handleChangePlaceRotation = (e: ChangeEvent<HTMLInputElement>) => {
    const { setRotation, selectedObjectId } = this.props
    const rotation = Number(e.currentTarget.value)

    if (!selectedObjectId) {
      return
    }

    setRotation(selectedObjectId, rotation)
  }

  renderFields() {
    const { selectedObjectType, editablePlace } = this.props

    switch (selectedObjectType) {
      case ObjectTypes.PLACE: {
        if (!editablePlace) {
          return null
        }

        return (
          <>
            <div>x:</div>
            <div>
              <input
                value={editablePlace.x}
                type="number"
                onChange={this.handleChangePlaceX}
              />
            </div>
            <div>y:</div>
            <div>
              <input
                value={editablePlace.y}
                type="number"
                onChange={this.handleChangePlaceY}
              />
            </div>
            <div>rotation:</div>
            <div>
              <input
                value={editablePlace.rotation}
                type="number"
                onChange={this.handleChangePlaceRotation}
              />
            </div>
          </>
        )
      }

      default: {
        return null
      }
    }
  }

  render() {
    const { isEditSubmitting } = this.props

    return (
      <>
        <div>
          <button
            onClick={this.handleClickSubmit}
            type="button"
            disabled={isEditSubmitting}
          >
            Сохранить
          </button>
          <button
            onClick={this.handleClickCancel}
            type="button"
            disabled={isEditSubmitting}
          >
            Отмена
          </button>
        </div>
        <div>{this.renderFields()}</div>
      </>
    )
  }
}
