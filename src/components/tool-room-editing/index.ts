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
    selectTargetBorder,
    selectTargetArea,
} from 'src/ducks/areas/selectors';
import { selectRoomById } from 'src/ducks/rooms/selectors';

import { Room } from 'src/types/api';
import { ToolRoomEditingView } from './view';

type PropsType = {
    roomId: Room['id'];
};

const mapStateToProps = (state: RootStoreType, props: PropsType) => ({
    isEditSubmitting: selectIsSubmitting(state),
    selectedObjectType: selectSelectedEditObjectType(state),
    selectedObjectId: selectSelectedEditObjectId(state),
    editablePlace: selectEditablePlaceFields(state),
    editableObject: selectEditableObjectFields(state),
    placesAreas: selectPlaceAreasList(state),
    objectsAreas: selectObjectsAreasList(state),
    editingRoom: selectRoomById(state, props),
    targetBorder: selectTargetBorder(state),
    targetArea: selectTargetArea(state),
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
