import { InferValueTypes } from 'src/types/common';
import { Area, Border } from 'src/types/api';
import { cloneDeep } from 'lodash';
import { editCancel, editSubmitSuccess } from 'src/ducks/room-editing/actions';
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types';
import { uniqueString } from 'src/utils/unique-string';
import { BorderKinds } from 'src/constants/kinds';
import { AreasActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<
    | InferValueTypes<typeof actions>
    | typeof editCancel
    | typeof editSubmitSuccess
>;

type StateType = Record<Area['id'], Array<Border>>;

export const initialState: StateType = {};

const isLast = <T>(item: T, array: Array<T>) =>
    item === array[array.length - 1];

const updatePosition = (
    borders: Array<Border>,
    borderId: Border['id'],
    x: Border['x'],
    y: Border['y']
) => {
    const targetBorder = borders.find(({ id }) => borderId === id);

    if (!targetBorder) {
        return borders;
    }

    if (isLast(targetBorder, borders)) {
        const firstBorder = borders[0];

        firstBorder.x = x;
        firstBorder.y = y;
    }

    targetBorder.x = x;
    targetBorder.y = y;

    return borders;
};

const updateKind = (
    borders: Array<Border>,
    borderId: Border['id'],
    kind: BorderKinds
) => {
    const targetBorder = borders.find(({ id }) => borderId === id);

    if (!targetBorder) {
        return borders;
    }

    targetBorder.kind = kind;

    return borders;
};

const deleteBorder = (borders: Array<Border>, borderId: Border['id']) => {
    const targetBorder = borders.find(({ id }) => borderId === id);

    if (isLast(targetBorder, borders)) {
        const preTargetBorder = borders[borders.length - 2];
        const firstBorder = borders[0];

        firstBorder.x = preTargetBorder.x;
        firstBorder.y = preTargetBorder.y;
    }

    return borders.filter((border) => border !== targetBorder);
};

const create = (borders: Array<Border>, borderId: Border['id']) => {
    const taergtBorderIndex = borders.findIndex(({ id }) => id === borderId);

    if (taergtBorderIndex === 0) {
        return borders;
    }

    const prevBorder = borders[taergtBorderIndex - 1];
    const targetBorder = borders[taergtBorderIndex];

    const newBorder: Border = {
        id: uniqueString(),
        kind: targetBorder.kind,
        x: Math.floor((prevBorder.x + targetBorder.x) / 2),
        y: Math.floor((prevBorder.y + targetBorder.y) / 2),
        cp1x: null,
        cp2x: null,
        cp1y: null,
        cp2y: null,
    };

    borders.splice(taergtBorderIndex, 0, newBorder);

    return borders;
};

export const editedBorders = (
    state = initialState,
    action: ActionTypes
): StateType => {
    switch (action.type) {
        case AreasActionType.UPDATE_BORDER: {
            if (!state[action.area.id]) {
                return {
                    ...state,
                    [action.area.id]: updatePosition(
                        cloneDeep(action.area.borders),
                        action.borderId,
                        action.x,
                        action.y
                    ),
                };
            }

            return {
                ...state,
                [action.area.id]: updatePosition(
                    state[action.area.id],
                    action.borderId,
                    action.x,
                    action.y
                ),
            };
        }

        case AreasActionType.DELETE_BORDER: {
            if (!state[action.area.id]) {
                return {
                    ...state,
                    [action.area.id]: deleteBorder(
                        cloneDeep(action.area.borders),
                        action.borderId
                    ),
                };
            }

            return {
                ...state,
                [action.area.id]: deleteBorder(
                    state[action.area.id],
                    action.borderId
                ),
            };
        }

        case AreasActionType.CREATE_BORDER: {
            if (!state[action.area.id]) {
                return {
                    ...state,
                    [action.area.id]: create(
                        cloneDeep(action.area.borders),
                        action.borderId
                    ),
                };
            }

            return {
                ...state,
                [action.area.id]: create(
                    state[action.area.id],
                    action.borderId
                ),
            };
        }

        case AreasActionType.UPDATE_KIND: {
            if (!state[action.area.id]) {
                return {
                    ...state,
                    [action.area.id]: updateKind(
                        cloneDeep(action.area.borders),
                        action.borderId,
                        action.kind
                    ),
                };
            }

            return {
                ...state,
                [action.area.id]: updateKind(
                    state[action.area.id],
                    action.borderId,
                    action.kind
                ),
            };
        }

        case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
        case RoomEditinActionType.EDIT_CANCEL: {
            return {};
        }

        default: {
            return state;
        }
    }
};
