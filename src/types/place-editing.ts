import { Place, ObjectType } from 'src/types/api';
import { ObjectTypes } from 'src/constants/objects';

export type PlaceChange = {
    x?: Place['x'];
    y?: Place['y'];
    rotation?: Place['rotation'];
};

export type SelectedEditType =
    | {
          objectType: typeof ObjectTypes.OBJECT;
          id: ObjectType['id'];
      }
    | {
          objectType: typeof ObjectTypes.PLACE;
          id: Place['id'];
      }
    | {
          objectType: null;
          id: null;
      };
