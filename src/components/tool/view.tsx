import React, { Component } from 'react'
import { Place, Room } from 'src/types/api'
import { ToolUserInfo } from 'src/components/tool-user-info'
import { ToolRoomInfo } from 'src/components/tool-room-info'
import { changeMyPlace as changeMyPlaceAction } from 'src/ducks/places/actions'
import {
  editStart as editStartAction,
  editCancel as editCancelAction,
  editSubmit as editSubmitAction,
} from 'src/ducks/room-editing/actions'
import { Box } from './styles'

type PropsType = {
  place?: Place
  room?: Room
  editableRoomId: Room['id'] | null
  isEditSubmitting: boolean
  changeMyPlace: typeof changeMyPlaceAction
  editStart: typeof editStartAction
  editCancel: typeof editCancelAction
  editSubmit: typeof editSubmitAction
}

export class ToolView extends Component<PropsType> {
  handleClick = (): void => {
    const { place, changeMyPlace } = this.props

    if (!place) {
      return
    }

    changeMyPlace(place.id)
  }

  handleClickEdit = (): void => {
    const { room, editStart } = this.props

    if (!room) {
      return
    }

    editStart(room.id)
  }

  handleClickSubmit = () => {
    const { editSubmit } = this.props

    editSubmit()
  }

  handleClickCancel = () => {
    const { editCancel } = this.props

    editCancel()
  }

  renderContent() {
    const { place, room, editableRoomId, isEditSubmitting } = this.props

    if (place) {
      return (
        <>
          <ToolUserInfo userId={place.userId} />
          <button onClick={this.handleClick} type="button">
            Я теперь сижу тут
          </button>
        </>
      )
    }

    if (room) {
      if (editableRoomId) {
        return (
          <>
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
          </>
        )
      }
      return (
        <>
          <ToolRoomInfo room={room} />
          <button onClick={this.handleClickEdit} type="button">
            Редактировать
          </button>
        </>
      )
    }

    return null
  }

  render() {
    const { place, room } = this.props

    if (!place && !room) {
      return null
    }

    return <Box>{this.renderContent()}</Box>
  }
}
