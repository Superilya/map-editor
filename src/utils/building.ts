import { Building } from 'src/types/api'

export const getDefaultFloor = (building: Building) => building.floors[0]
