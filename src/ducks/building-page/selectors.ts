import { RootStoreType } from 'src/ducks';

export const selectCurrentFloor = (state: RootStoreType) => state.buildingPage.currentFloor;
