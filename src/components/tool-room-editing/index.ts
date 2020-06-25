import { connect } from 'react-redux';
import {
    selectIsSubmitting,
    selectSelectedEditObjectType,
    selectSelectedEditObjectId,
} from 'src/ducks/room-editing/selectors';
import { selectEditablePlaceFields } from 'src/ducks/places-editing/selectors';
import { selectEditableObjectFields } from 'src/ducks/objects-editing/selectors';
import { editCancel, editSubmit } from 'src/ducks/room-editing/actions';
import {
    setPlacePosition,
    setPlaceRotation,
    deletePlace,
    createPlace,
} from 'src/ducks/places-editing/actions';
import {
    setObjectPosition,
    setObjectRotation,
    deleteObject,
    createObject,
} from 'src/ducks/objects-editing/actions';
import { getObjectsAreas } from 'src/ducks/areas/actions';
import { RootStoreType } from 'src/ducks';
import {
    selectPlaceAreasList,
    selectObjectsAreasList,
} from 'src/ducks/areas/selectors';
import { ToolRoomEditingView } from './view';

const mapStateToProps = (state: RootStoreType) => ({
    isEditSubmitting: selectIsSubmitting(state),
    selectedObjectType: selectSelectedEditObjectType(state),
    selectedObjectId: selectSelectedEditObjectId(state),
    editablePlace: selectEditablePlaceFields(state),
    editableObject: selectEditableObjectFields(state),
    placesAreas: selectPlaceAreasList(state),
    objectsAreas: selectObjectsAreasList(state),
});

export const ToolRoomEditing = connect(mapStateToProps, {
    editSubmit,
    editCancel,
    setPlacePosition,
    setPlaceRotation,
    deletePlace,
    createPlace,
    setObjectPosition,
    setObjectRotation,
    deleteObject,
    createObject,
    getObjectsAreas,
})(ToolRoomEditingView);
