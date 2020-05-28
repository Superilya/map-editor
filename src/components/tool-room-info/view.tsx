import React from 'react'
import { Room } from 'src/types/api'

type PropsType = {
  room: Room
}

export const ToolRoomInfoView = ({ room }: PropsType) => <div>{room.label}</div>
