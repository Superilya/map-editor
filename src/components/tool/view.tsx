import React, { Component } from 'react'
import { Place } from 'src/types/api'
import { ToolUserInfo } from 'src/components/tool-user-info'
import { changeMyPlace } from 'src/ducks/places/actions'
import { Box } from './styles'

type PropsType = {
  place?: Place
  changeMyPlace: typeof changeMyPlace
}

export class ToolView extends Component<PropsType> {
  handleClick = (): void => {
    const { place, changeMyPlace } = this.props

    if (!place) {
      return
    }

    changeMyPlace(place.id)
  }

  render() {
    const { place } = this.props

    if (!place) {
      return null
    }

    return (
      <Box>
        <ToolUserInfo userId={place.userId} />
        <button onClick={this.handleClick}>Я теперь сижу тут</button>
      </Box>
    )
  }
}
