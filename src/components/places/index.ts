import { connect } from 'react-redux'
import { selectPlaces } from 'src/ducks/places/selectors'
import { RootStoreType } from 'src/ducks'
import { Room } from 'src/types/api'
import {
  selectTargetRoom,
  selectEditedPlaces,
  selectSelectedEditObjectType,
  selectSelectedEditObjectId,
} from 'src/ducks/room-editing/selectors'
import {
  setPosition,
  setRotation,
  deletePlace,
  selectEdit,
} from 'src/ducks/room-editing/actions'
import { ObjectTypes } from 'src/constants/objects'
import { PlacesView } from './view'

type PropsType = {
  roomId: Room['id']
}

const mapStateToProps = (state: RootStoreType, props: PropsType) => {
  const isEdit = selectTargetRoom(state) === props.roomId
  const selectedObjectType = selectSelectedEditObjectType(state)

  return {
    selectedEditPlaceId:
      selectedObjectType === ObjectTypes.PLACE
        ? selectSelectedEditObjectId(state)
        : null,
    places: isEdit
      ? selectEditedPlaces(state, props)
      : selectPlaces(state, props),
    isEdit,
  }
}

export const Places = connect(mapStateToProps, {
  setPosition,
  setRotation,
  deletePlace,
  selectEdit,
})(PlacesView)
