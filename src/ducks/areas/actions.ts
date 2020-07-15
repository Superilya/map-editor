import { Area, Border } from 'src/types/api';
import { BorderKinds } from 'src/constants/kinds';
import { AreasActionType } from './action-types';

export const getObjectsAreas = () => ({
    type: AreasActionType.GET_MAP_OBJECTS,
});

export const getObjectsAreasSuccess = (areas: Array<Area>) => ({
    type: AreasActionType.GET_MAP_OBJECTS_SUCCESS,
    areas,
});

export const updateBorder = (
    area: Area,
    borderId: Border['id'],
    x: Border['x'],
    y: Border['y']
) => ({
    type: AreasActionType.UPDATE_BORDER,
    borderId,
    area,
    x,
    y,
});

export const deleteBorder = (area: Area, borderId: Border['id']) => ({
    type: AreasActionType.DELETE_BORDER,
    area,
    borderId,
});

export const selectBorder = (area: Area, borderId: Border['id']) => ({
    type: AreasActionType.SELECT_BORDER,
    borderId,
    area,
});

export const createBorder = (area: Area, borderId: Border['id']) => ({
    type: AreasActionType.CREATE_BORDER,
    borderId,
    area,
});

export const updateKind = (
    area: Area,
    borderId: Border['id'],
    kind: BorderKinds
) => ({
    type: AreasActionType.UPDATE_KIND,
    borderId,
    area,
    kind,
});
