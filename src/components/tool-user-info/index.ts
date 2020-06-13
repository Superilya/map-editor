import { connect } from 'react-redux'
import { User } from 'src/types/api'
import { RootStoreType } from 'src/ducks'
import { ToolUserInfoView } from './view'

type PropsType = {
  userId: User['id']
}

const mapStateToProps = (state: RootStoreType, props: PropsType) => ({
  user: state.users.entity[props.userId],
})

export const ToolUserInfo = connect(mapStateToProps)(ToolUserInfoView)
