import { selectBuildings } from 'src/ducks/buildings/selectors';
import { select, put } from 'redux-saga/effects';
import { getDefaultFloor } from 'src/utils/building';
import { replace } from 'connected-react-router';
import { buildingLink } from 'src/routing/links';

export function* initRoot() {
    const [building]: ReturnType<typeof selectBuildings> = yield select(
        selectBuildings
    );
    const floor = getDefaultFloor(building);

    yield put(
        replace(
            buildingLink.get({
                buildingId: String(building.id),
                floor: String(floor),
            })
        )
    );
}
