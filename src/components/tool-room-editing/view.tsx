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
import { MenuTop } from 'src/components/menu-top';
import { MenuPart } from 'src/components/menu-part';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';

import { getObjectsAreas as getObjectsAreasActions } from 'src/ducks/areas/actions';

import { ObjectTypes } from 'src/constants/objects';
import { uniqueString } from 'src/utils/unique-string';
import { Place, Area, ObjectType, Room } from 'src/types/api';
import { AreaPreview } from 'src/components/area-preview';

import { Size, Theme } from 'src/constants/ui';
import {
    OffsetBox,
    Row,
    Cell,
    ActionsBox,
    FieldsBox,
    PreviewBox,
    PreviewRowBox,
} from './styles';

const divideByGoups = <T,>(array: Array<T>, groupLength: number) =>
    array.reduce((acc: Array<Array<T>>, item: T) => {
        const targetGounp = acc[acc.length - 1];

        if (!Array.isArray(targetGounp) || targetGounp.length >= groupLength) {
            acc.push([item]);
        } else {
            targetGounp.push(item);
        }

        return acc;
    }, []);

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
    editingRoom?: Room;
};

type State = {
    label?: string;
}

export class ToolRoomEditingView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            label: props.editingRoom?.label
        }
    }

    componentDidMount() {
        const { getObjectsAreas } = this.props;

        getObjectsAreas();
    }

    handleClickSubmit = () => {
        const { editSubmit } = this.props;
        const { label } = this.state;

        editSubmit({
            label
        });
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

    handleClickAddPlace = (e: MouseEvent<HTMLDivElement>) => {
        const { createPlace } = this.props;
        const areaId = Number(e.currentTarget.dataset.areaId);

        createPlace(areaId, uniqueString());
    };

    handleClickAddObject = (e: MouseEvent<HTMLDivElement>) => {
        const { createObject } = this.props;
        const areaId = Number(e.currentTarget.dataset.areaId);

        createObject(areaId, uniqueString());
    };

    handleChangeLabel = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            label: e.currentTarget.value
        });
    }

    renderFields() {
        const {
            selectedObjectType,
            editablePlace,
            editableObject,
        } = this.props;

        switch (selectedObjectType) {
            case ObjectTypes.PLACE: {
                if (!editablePlace) {
                    return null;
                }

                return (
                    <MenuPart title="Place">
                        <OffsetBox>
                            <FieldsBox>
                                <Row>
                                    <Cell>
                                        <Input
                                            label="x:"
                                            value={editablePlace.x}
                                            type="number"
                                            onChange={this.handleChangeObjectX}
                                        />
                                    </Cell>
                                    <Cell>
                                        <Input
                                            label="y:"
                                            value={editablePlace.y}
                                            type="number"
                                            onChange={this.handleChangeObjectY}
                                        />
                                    </Cell>
                                </Row>
                                <Row>
                                    <Cell>
                                        <Input
                                            label="rotation:"
                                            value={editablePlace.rotation || 0}
                                            type="number"
                                            onChange={
                                                this.handleChangeObjectRotation
                                            }
                                        />
                                    </Cell>
                                    <Cell />
                                </Row>
                            </FieldsBox>
                        </OffsetBox>
                    </MenuPart>
                );
            }

            case ObjectTypes.OBJECT: {
                if (!editableObject) {
                    return null;
                }

                return (
                    <MenuPart title="Object">
                        <OffsetBox>
                            <FieldsBox>
                                <Row>
                                    <Cell>
                                        <Input
                                            label="x:"
                                            value={editableObject.x}
                                            type="number"
                                            onChange={this.handleChangeObjectX}
                                        />
                                    </Cell>
                                    <Cell>
                                        <Input
                                            label="y:"
                                            value={editableObject.y}
                                            type="number"
                                            onChange={this.handleChangeObjectY}
                                        />
                                    </Cell>
                                </Row>
                                <Row>
                                    <Cell>
                                        <Input
                                            label="rotation:"
                                            value={editableObject.rotation || 0}
                                            type="number"
                                            onChange={
                                                this.handleChangeObjectRotation
                                            }
                                        />
                                    </Cell>
                                    <Cell />
                                </Row>
                            </FieldsBox>
                        </OffsetBox>
                    </MenuPart>
                );
            }

            default: {
                return null;
            }
        }
    }

    render() {
        const { isEditSubmitting, placesAreas, objectsAreas } = this.props;
        const { label } = this.state;

        return (
            <>
                <MenuTop>
                    <OffsetBox>
                        <Input label="label:" value={label} onChange={this.handleChangeLabel} />
                    </OffsetBox>
                </MenuTop>
                <div>{this.renderFields()}</div>
                <MenuPart title="Add Place">
                    <OffsetBox>
                        <ActionsBox>
                            {divideByGoups(placesAreas, 3).map((group) => (
                                <PreviewRowBox>
                                    {group.map((area) => (
                                        <PreviewBox
                                            onDoubleClick={
                                                this.handleClickAddObject
                                            }
                                            data-area-id={area.id}
                                        >
                                            <AreaPreview area={area} />
                                        </PreviewBox>
                                    ))}
                                </PreviewRowBox>
                            ))}
                        </ActionsBox>
                    </OffsetBox>
                </MenuPart>
                <MenuPart title="Add Object">
                    <OffsetBox>
                        <ActionsBox>
                            {divideByGoups(objectsAreas, 3).map((group) => (
                                <PreviewRowBox>
                                    {group.map((area) => (
                                        <PreviewBox
                                            onDoubleClick={
                                                this.handleClickAddObject
                                            }
                                            data-area-id={area.id}
                                        >
                                            <AreaPreview area={area} />
                                        </PreviewBox>
                                    ))}
                                </PreviewRowBox>
                            ))}
                        </ActionsBox>
                    </OffsetBox>
                </MenuPart>
                <OffsetBox>
                    <ActionsBox>
                        <Row>
                            <Cell>
                                <Button
                                    onClick={this.handleClickSubmit}
                                    disabled={isEditSubmitting}
                                    size={Size.L}
                                    theme={Theme.ACTIVE}
                                    wide
                                >
                                    Save
                                </Button>
                            </Cell>
                            <Cell>
                                <Button
                                    onClick={this.handleClickCancel}
                                    size={Size.L}
                                    disabled={isEditSubmitting}
                                    wide
                                >
                                    Cancel
                                </Button>
                            </Cell>
                        </Row>
                    </ActionsBox>
                </OffsetBox>
            </>
        );
    }
}
