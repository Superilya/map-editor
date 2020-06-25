import { connect } from 'react-redux';
import { RootStoreType } from 'src/ducks';
import { Room } from 'src/types/api';
import {
    selectTargetRoom,
    selectSelectedEditObjectType,
    selectSelectedEditObjectId,
} from 'src/ducks/room-editing/selectors';
import {
    setPlacePosition,
    setPlaceRotation,
    deletePlace,
} from 'src/ducks/places-editing/actions';
import { selectEdit } from 'src/ducks/room-editing/actions';
import {
    setObjectPosition,
    setObjectRotation,
    deleteObject,
} from 'src/ducks/objects-editing/actions';
import { ObjectTypes } from 'src/constants/objects';
import { selectObjects } from 'src/ducks/objects/selectors';
import { selectEditedObjects } from 'src/ducks/objects-editing/selectors';
import { selectPlaces } from 'src/ducks/places/selectors';
import { selectEditedPlaces } from 'src/ducks/places-editing/selectors';
import { ObjectsView } from './view';

type PropsType = {
    roomId: Room['id'];
};

const mapStateToProps = (state: RootStoreType, props: PropsType) => {
    const isEdit = selectTargetRoom(state) === props.roomId;
    const selectedObjectType = selectSelectedEditObjectType(state);

    return {
        selectedEditObjectId:
            selectedObjectType === ObjectTypes.OBJECT
                ? selectSelectedEditObjectId(state)
                : null,
        objects: isEdit
            ? selectEditedObjects(state, props)
            : selectObjects(state, props),
        isEdit,
    };
};

export const Objects = connect(mapStateToProps, {
    setObjectPosition,
    setObjectRotation,
    deleteObject,
    selectEdit,
})(ObjectsView);

const mapStateToPropsPlaces = (state: RootStoreType, props: PropsType) => {
    const isEdit = selectTargetRoom(state) === props.roomId;
    const selectedObjectType = selectSelectedEditObjectType(state);

    return {
        selectedEditObjectId:
            selectedObjectType === ObjectTypes.PLACE
                ? selectSelectedEditObjectId(state)
                : null,
        objects: isEdit
            ? selectEditedPlaces(state, props)
            : selectPlaces(state, props),
        isEdit,
    };
};

export const Places = connect(mapStateToPropsPlaces, {
    setObjectPosition: setPlacePosition,
    setObjectRotation: setPlaceRotation,
    deleteObject: deletePlace,
    selectEdit,
})(ObjectsView);
