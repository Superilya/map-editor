import React from 'react'
import { User } from 'src/types/api'

type PropsType = {
  user: User
}

export const ToolUserInfoView = ({ user }: PropsType) => {
  if (!user) {
    return null
  }

  return <div>{user.name}</div>
}
