import { RootStoreType } from 'src/ducks';

export const selectTargetRoom = (state: RootStoreType) => state.roomEditing.targetRoom
export const selectUpdatedPlaces = (state: RootStoreType) => state.roomEditing.updatedPlaces
export const selectIsSubmitting = (state: RootStoreType) => state.roomEditing.state.isSubmitting
