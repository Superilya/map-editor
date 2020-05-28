import React, { Component } from 'react'
import { Place, Room } from 'src/types/api'
import { ToolUserInfo } from 'src/components/tool-user-info'
import { ToolRoomInfo } from 'src/components/tool-room-info'
import { changeMyPlace as changeMyPlaceAction } from 'src/ducks/places/actions'
import { Box } from './styles'

type PropsType = {
  place?: Place
  room?: Room
  changeMyPlace: typeof changeMyPlaceAction
}

export class ToolView extends Component<PropsType> {
  handleClick = (): void => {
    const { place, changeMyPlace } = this.props

    if (!place) {
      return
    }

    changeMyPlace(place.id)
  }

  renderContent() {
    const { place, room } = this.props

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
      return (
        <>
          <ToolRoomInfo room={room} />
          <button onClick={this.handleClick} type="button">
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
