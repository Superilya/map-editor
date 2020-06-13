import { connect } from 'react-redux'
import { selectRooms, selectIsRoomsLoading } from 'src/ducks/rooms/selectors'
import { RootStoreType } from 'src/ducks'
import { selectTargetRoom } from 'src/ducks/room-editing/selectors'
import { MapView } from './view'

const mapStateToProps = (state: RootStoreType) => ({
  rooms: selectRooms(state),
  isRoomsLoading: selectIsRoomsLoading(state),
  editableRoomId: selectTargetRoom(state),
})

export const Map = connect(mapStateToProps)(MapView)
