import { ObjectType, Place } from 'src/types/api';
import { ObjectTypes } from 'src/constants/objects';
import { defaultObjectFields } from 'src/constants/editing';

export const editableList = <T extends ObjectType | Place>(
    entity,
    list,
    areasMapping,
    updated,
    deleted,
    created,
    areasEntity
): Array<T> => {
    const rest = !Array.isArray(list)
        ? []
        : list
              .filter((placeId) => deleted.indexOf(placeId) === -1)
              .map((placeId) => entity[placeId])
              .filter(Boolean);
    const assempledCreated = Object.keys(created)
        .reduce((acc: Array<T>, placeId) => {
            const targetArea = areasEntity[created[placeId]];

            if (!targetArea) {
                return acc;
            }

            if (!updated[placeId]) {
                return acc;
            }

            acc.push({
                id: placeId,
                x: 50,
                y: 50,
                area: targetArea,
                ...updated[placeId],
            });

            return acc;
        }, [])
        .filter(Boolean);

    const existObjects: T[] = rest.reduce((acc: T[], halfObject) => {
        const targetArea = areasEntity[areasMapping[halfObject.id]];
        const targetUpdate = updated[halfObject.id];
        if (!targetArea) {
            return acc;
        }

        if (!targetUpdate) {
            acc.push({
                ...halfObject,
                area: targetArea,
            });
        } else {
            acc.push({
                ...halfObject,
                area: targetArea,
                ...targetUpdate,
            });
        }

        return acc;
    }, []);

    return existObjects.concat(assempledCreated);
};

export const editableObject = <T extends ObjectType | Place>(
    objectType,
    objectId,
    areasMapping,
    entity,
    updated,
    created,
    areasEntity
): T | null => {
    if (objectType !== ObjectTypes.OBJECT || !objectId) {
        return null;
    }

    const targetArea = areasEntity[created[objectId]];

    if (targetArea) {
        return {
            id: objectId,
            ...defaultObjectFields,
            ...updated[objectId],
            area: targetArea,
        };
    }

    const object = entity[objectId];

    if (!object) {
        return null;
    }

    const targetObjectArea = areasEntity[areasMapping[object.id]];

    if (!targetObjectArea) {
        return null;
    }

    return {
        ...object,
        area: targetObjectArea,
        ...updated[object.id],
    };
};
