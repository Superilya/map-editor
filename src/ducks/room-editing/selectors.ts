import { RootStoreType } from 'src/ducks';

export const selectTargetRoom = (state: RootStoreType) => state.roomEditing.targetRoom
