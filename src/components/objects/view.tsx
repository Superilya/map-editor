import React, { Component } from 'react';
import { MapObject } from 'src/components/map-object';
import { Place, ObjectType } from 'src/types/api';
import { selectEdit as selectEditAction } from 'src/ducks/room-editing/actions';
import {
    setObjectPosition as setObjectPositionAction,
    setObjectRotation as setObjectRotationAction,
    deleteObject as deleteObjectAction,
} from 'src/ducks/objects-editing/actions';
import {
    setPlacePosition as setPlacePositionAction,
    setPlaceRotation as setPlaceRotationAction,
    deletePlace as deletePlaceAction,
} from 'src/ducks/places-editing/actions';
import { ObjectTypes } from 'src/constants/objects';

type PropsType<T extends ObjectType | Place> = {
    selectedObject?: T['id'];
    objects: Array<T> | null;
    isEdit: boolean;
    selectedEditObjectId: T['id'] | null;
    setObjectPosition:
        | typeof setObjectPositionAction
        | typeof setPlacePositionAction;
    setObjectRotation:
        | typeof setObjectRotationAction
        | typeof setPlaceRotationAction;
    deleteObject: typeof deleteObjectAction | typeof deletePlaceAction;
    selectEdit: typeof selectEditAction;
    onClickObject?: (place: T) => void;
    objectType: ObjectTypes;
};

type StateType = {
    selectedEditPlace: Place['id'] | null;
};

export class ObjectsView<T extends ObjectType | Place> extends Component<
    PropsType<T>,
    StateType
> {
    handleClick = (object: T) => {
        const { onClickObject, isEdit, selectEdit, objectType } = this.props;

        if (isEdit) {
            selectEdit({
                objectType,
                id: object.id,
            });

            return;
        }

        if (typeof onClickObject === 'function') {
            onClickObject(object);
        }
    };

    handleChangePosition = (
        object: ObjectType,
        newX: ObjectType['x'],
        newY: ObjectType['y']
    ) => {
        const { setObjectPosition } = this.props;

        setObjectPosition(object.id, newX, newY);
    };

    handleChangeRotation = (object: T, newRotation: T['rotation']) => {
        const { setObjectRotation } = this.props;

        setObjectRotation(object.id, newRotation);
    };

    handleDelete = (object: T) => {
        const { deleteObject } = this.props;

        deleteObject(object.id);
    };

    render() {
        const {
            objects,
            isEdit,
            selectedEditObjectId,
            selectedObject,
        } = this.props;

        if (!Array.isArray(objects)) {
            return null;
        }

        return objects.map((object) => (
            <MapObject
                draggable={isEdit}
                key={object.id}
                onClick={this.handleClick}
                onChangePosition={this.handleChangePosition}
                onChangeRotation={this.handleChangeRotation}
                onDelete={this.handleDelete}
                isSelected={selectedObject === object.id}
                object={object}
                isSelectedEdit={isEdit && object.id === selectedEditObjectId}
            />
        ));
    }
}
