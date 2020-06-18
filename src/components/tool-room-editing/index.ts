import { connect } from 'react-redux'
import {
  selectIsSubmitting,
  selectSelectedEditObjectType,
  selectSelectedEditObjectId,
  selectEditablePlaceFields,
} from 'src/ducks/room-editing/selectors'
import {
  editCancel,
  editSubmit,
  setPosition,
  setRotation,
  deletePlace,
  createPlace,
} from 'src/ducks/room-editing/actions'
import { getObjectsAreas } from 'src/ducks/areas/actions'
import { RootStoreType } from 'src/ducks'
import { selectPlaceAreasList } from 'src/ducks/areas/selectors'
import { ToolRoomEditingView } from './view'

const mapStateToProps = (state: RootStoreType) => ({
  isEditSubmitting: selectIsSubmitting(state),
  selectedObjectType: selectSelectedEditObjectType(state),
  selectedObjectId: selectSelectedEditObjectId(state),
  editablePlace: selectEditablePlaceFields(state),
  placesAreas: selectPlaceAreasList(state),
})

export const ToolRoomEditing = connect(mapStateToProps, {
  editSubmit,
  editCancel,
  setPosition,
  setRotation,
  deletePlace,
  createPlace,
  getObjectsAreas,
})(ToolRoomEditingView)
