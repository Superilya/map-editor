import React, { Component } from 'react';
import {
    updateBorder as updateBorderAction,
    deleteBorder as deleteBorderAction,
    createBorder as createBorderAction,
    updateKind as updateKindAction,
} from 'src/ducks/areas/actions';
import { Border, Area } from 'src/types/api';
import { MenuPart } from 'src/components/menu-part';
import { IconAction } from 'src/components/icon-action';
import { Input } from 'src/components/ui/input';
import { Dropdown, ItemType } from 'src/components/ui/dropdown';
import { BorderKinds } from 'src/constants/kinds';
import { ActionsBox, ActionBox, Box, Row, Cell } from './styles';

type PropsType = {
    targetBorder: Border | null;
    targetArea: Area | null;
    updateBorder: typeof updateBorderAction;
    deleteBorder: typeof deleteBorderAction;
    createBorder: typeof createBorderAction;
    updateKind: typeof updateKindAction;
};

type BorderKindItem = ItemType & {
    value: BorderKinds;
};

const borderKindItems: Array<BorderKindItem> = [
    {
        value: BorderKinds.TRANSPARENT,
        label: 'None',
    },
    {
        value: BorderKinds.WALL,
        label: 'Wall',
    },
];

export class BorderEditView extends Component<PropsType> {
    handleChangeBorderX = (e: React.FormEvent<HTMLInputElement>) => {
        const { updateBorder, targetBorder, targetArea } = this.props;

        if (!targetBorder || !targetArea) {
            return;
        }

        updateBorder(
            targetArea,
            targetBorder.id,
            Number(e.currentTarget.value),
            targetBorder.y
        );
    };

    handleChangeBorderY = (e: React.FormEvent<HTMLInputElement>) => {
        const { updateBorder, targetBorder, targetArea } = this.props;

        if (!targetBorder || !targetArea) {
            return;
        }

        updateBorder(
            targetArea,
            targetBorder.id,
            targetBorder.x,
            Number(e.currentTarget.value)
        );
    };

    handleDelete = () => {
        const { deleteBorder, targetArea, targetBorder } = this.props;

        if (!targetArea || !targetBorder) {
            return;
        }

        deleteBorder(targetArea, targetBorder.id);
    };

    handleCreate = () => {
        const { createBorder, targetArea, targetBorder } = this.props;

        if (!targetArea || !targetBorder) {
            return;
        }

        createBorder(targetArea, targetBorder.id);
    };

    handleChangeKind = (item: BorderKindItem | null) => {
        const { updateKind, targetArea, targetBorder } = this.props;

        if (!item || !targetArea || !targetBorder) {
            return;
        }

        updateKind(targetArea, targetBorder.id, item.value);
    };

    render() {
        const { targetBorder } = this.props;

        if (!targetBorder) {
            return null;
        }

        return (
            <MenuPart title="Corner">
                <Box>
                    <ActionsBox>
                        <ActionBox>
                            <IconAction
                                title="Delete"
                                icon="fa-trash-alt"
                                onClick={this.handleDelete}
                            />
                        </ActionBox>
                        <ActionBox>
                            <IconAction
                                title="Add"
                                icon="fa-plus"
                                onClick={this.handleCreate}
                            />
                        </ActionBox>
                    </ActionsBox>
                    <Row>
                        <Cell>
                            <Input
                                value={targetBorder.x}
                                onChange={this.handleChangeBorderX}
                                label="x:"
                                type="number"
                            />
                        </Cell>
                        <Cell>
                            <Input
                                value={targetBorder.y}
                                onChange={this.handleChangeBorderY}
                                label="y:"
                                type="number"
                            />
                        </Cell>
                    </Row>
                    <Row>
                        <Dropdown
                            items={borderKindItems}
                            label="line:"
                            value={targetBorder.kind}
                            onChange={this.handleChangeKind}
                        />
                    </Row>
                </Box>
            </MenuPart>
        );
    }
}
