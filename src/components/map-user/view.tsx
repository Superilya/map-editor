import React from 'react'
import { MapUrlImage } from 'src/components/map-url-image'
import { User } from 'src/types/api'

type PropsType = {
  user?: User
  x?: number
  y?: number
}

export const MapUserView = ({ user, x, y }: PropsType) => {
  if (!user) {
    return null
  }

  return (
    <MapUrlImage
      width={60}
      height={60}
      offsetX={30}
      offsetY={30}
      src={user.avatarUrl}
      x={x}
      y={y}
    />
  )
}
