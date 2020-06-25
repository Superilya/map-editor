import React, { Component, ChangeEvent, MouseEvent } from 'react';
import {
    editCancel as editCancelAction,
    editSubmit as editSubmitAction,
} from 'src/ducks/room-editing/actions';
import {
    setPlacePosition as setPlacePositionAction,
    setPlaceRotation as setPlaceRotationAction,
    deletePlace as deletePlaceAction,
    createPlace as createPlaceAction,
} from 'src/ducks/places-editing/actions';

import {
    setObjectPosition as setObjectPositionAction,
    setObjectRotation as setObjectRotationAction,
    deleteObject as deleteObjectAction,
    createObject as createObjectAction,
} from 'src/ducks/objects-editing/actions';

import { getObjectsAreas as getObjectsAreasActions } from 'src/ducks/areas/actions';

import { ObjectTypes } from 'src/constants/objects';
import { uniqueString } from 'src/utils/unique-string';
import { Place, Area, ObjectType } from 'src/types/api';

type Props = {
    selectedObjectType: ObjectTypes | null;
    selectedObjectId: Place['id'] | null;
    editablePlace: Place | null;
    editableObject: ObjectType | null;
    editSubmit: typeof editSubmitAction;
    editCancel: typeof editCancelAction;
    setPlacePosition: typeof setPlacePositionAction;
    setPlaceRotation: typeof setPlaceRotationAction;
    deletePlace: typeof deletePlaceAction;
    createPlace: typeof createPlaceAction;
    setObjectPosition: typeof setObjectPositionAction;
    setObjectRotation: typeof setObjectRotationAction;
    deleteObject: typeof deleteObjectAction;
    createObject: typeof createObjectAction;
    getObjectsAreas: typeof getObjectsAreasActions;
    placesAreas: Array<Area>;
    objectsAreas: Array<Area>;
    isEditSubmitting: boolean;
};

export class ToolRoomEditingView extends Component<Props> {
    componentDidMount() {
        const { getObjectsAreas } = this.props;

        getObjectsAreas();
    }

    handleClickSubmit = () => {
        const { editSubmit } = this.props;

        editSubmit();
    };

    handleClickCancel = () => {
        const { editCancel } = this.props;

        editCancel();
    };

    handleChangeObjectX = (e: ChangeEvent<HTMLInputElement>) => {
        const {
            setPlacePosition,
            setObjectPosition,
            selectedObjectId,
            editablePlace,
            selectedObjectType,
            editableObject,
        } = this.props;
        const x = Number(e.currentTarget.value);

        if (!selectedObjectId) {
            return;
        }

        if (selectedObjectType === ObjectTypes.PLACE) {
            if (!editablePlace) {
                return;
            }

            setPlacePosition(selectedObjectId, x, editablePlace.y);
            return;
        }

        if (selectedObjectType === ObjectTypes.OBJECT) {
            if (!editableObject) {
                return;
            }

            setObjectPosition(selectedObjectId, x, editableObject.y);
        }
    };

    handleChangeObjectY = (e: ChangeEvent<HTMLInputElement>) => {
        const {
            setPlacePosition,
            setObjectPosition,
            selectedObjectId,
            editablePlace,
            selectedObjectType,
            editableObject,
        } = this.props;
        const y = Number(e.currentTarget.value);

        if (!selectedObjectId) {
            return;
        }

        if (selectedObjectType === ObjectTypes.PLACE) {
            if (!editablePlace) {
                return;
            }

            setPlacePosition(selectedObjectId, editablePlace.x, y);
            return;
        }

        if (selectedObjectType === ObjectTypes.OBJECT) {
            if (!editableObject) {
                return;
            }

            setObjectPosition(selectedObjectId, editableObject.x, y);
        }
    };

    handleChangeObjectRotation = (e: ChangeEvent<HTMLInputElement>) => {
        const {
            setPlaceRotation,
            setObjectRotation,
            selectedObjectId,
            selectedObjectType,
        } = this.props;
        const rotation = Number(e.currentTarget.value);

        if (!selectedObjectId) {
            return;
        }

        if (selectedObjectType === ObjectTypes.PLACE) {
            setPlaceRotation(selectedObjectId, rotation);
        }

        if (selectedObjectType === ObjectTypes.OBJECT) {
            setObjectRotation(selectedObjectId, rotation);
        }
    };

    handleClickAddPlace = (e: MouseEvent<HTMLButtonElement>) => {
        const { createPlace } = this.props;
        const areaId = Number(e.currentTarget.dataset.areaId);

        createPlace(areaId, uniqueString());
    };

    handleClickAddObject = (e: MouseEvent<HTMLButtonElement>) => {
        const { createObject } = this.props;
        const areaId = Number(e.currentTarget.dataset.areaId);

        createObject(areaId, uniqueString());
    };

    renderFields() {
        const {
            selectedObjectType,
            editablePlace,
            editableObject,
            placesAreas,
            objectsAreas,
        } = this.props;

        switch (selectedObjectType) {
            case ObjectTypes.PLACE: {
                if (!editablePlace) {
                    return null;
                }

                console.log('editablePlace.rotation', editablePlace.rotation);

                return (
                    <>
                        <div>типо юзера можно выбрать</div>
                        <div>x:</div>
                        <div>
                            <input
                                value={editablePlace.x}
                                type="number"
                                onChange={this.handleChangeObjectX}
                            />
                        </div>
                        <div>y:</div>
                        <div>
                            <input
                                value={editablePlace.y}
                                type="number"
                                onChange={this.handleChangeObjectY}
                            />
                        </div>
                        <div>rotation:</div>
                        <div>
                            <input
                                value={editablePlace.rotation || 0}
                                type="number"
                                onChange={this.handleChangeObjectRotation}
                            />
                        </div>
                    </>
                );
            }

            case ObjectTypes.OBJECT: {
                if (!editableObject) {
                    return null;
                }

                console.log('editableObject.rotation', editableObject.rotation);

                return (
                    <>
                        <div>x:</div>
                        <div>
                            <input
                                value={editableObject.x}
                                type="number"
                                onChange={this.handleChangeObjectX}
                            />
                        </div>
                        <div>y:</div>
                        <div>
                            <input
                                value={editableObject.y}
                                type="number"
                                onChange={this.handleChangeObjectY}
                            />
                        </div>
                        <div>rotation:</div>
                        <div>
                            <input
                                value={editableObject.rotation || 0}
                                type="number"
                                onChange={this.handleChangeObjectRotation}
                            />
                        </div>
                    </>
                );
            }

            default: {
                return (
                    <>
                        <div>
                            {placesAreas.map((area) => (
                                <div>
                                    <button
                                        type="button"
                                        onClick={this.handleClickAddPlace}
                                        data-area-id={area.id}
                                    >
                                        Добвать place {area.id}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div>
                            {objectsAreas.map((area) => (
                                <div>
                                    <button
                                        type="button"
                                        onClick={this.handleClickAddObject}
                                        data-area-id={area.id}
                                    >
                                        Добвать object {area.id}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                );
            }
        }
    }

    render() {
        const { isEditSubmitting } = this.props;

        return (
            <>
                <div>
                    <button
                        onClick={this.handleClickSubmit}
                        type="button"
                        disabled={isEditSubmitting}
                    >
                        Сохранить
                    </button>
                    <button
                        onClick={this.handleClickCancel}
                        type="button"
                        disabled={isEditSubmitting}
                    >
                        Отмена
                    </button>
                </div>
                <div>{this.renderFields()}</div>
            </>
        );
    }
}
