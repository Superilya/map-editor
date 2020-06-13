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
} from 'src/ducks/room-editing/actions'
import { RootStoreType } from 'src/ducks'
import { ToolRoomEditingView } from './view'

const mapStateToProps = (state: RootStoreType) => ({
  isEditSubmitting: selectIsSubmitting(state),
  selectedObjectType: selectSelectedEditObjectType(state),
  selectedObjectId: selectSelectedEditObjectId(state),
  editablePlace: selectEditablePlaceFields(state),
})

export const ToolRoomEditing = connect(mapStateToProps, {
  editSubmit,
  editCancel,
  setPosition,
  setRotation,
  deletePlace,
})(ToolRoomEditingView)
