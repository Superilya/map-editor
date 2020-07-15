import { Area, Border } from 'src/types/api';

import { InferValueTypes } from 'src/types/common';
import { AreasActionType } from '../action-types';
import * as actions from '../actions';

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

type StateType = {
    areaId: Area['id'] | null;
    borderId: Border['id'] | null;
};

export const initialState: StateType = {
    areaId: null,
    borderId: null,
};

export const selectedBorder = (
    state = initialState,
    action: ActionTypes
): StateType => {
    switch (action.type) {
        case AreasActionType.SELECT_BORDER: {
            const target: StateType = {
                areaId: action.area.id,
                borderId: action.borderId,
            };

            return target;
        }

        default: {
            return state;
        }
    }
};
