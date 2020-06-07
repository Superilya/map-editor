import { PlacesView } from './view';
import { connect } from 'react-redux';
import { selectPlaces } from 'src/ducks/places/selectors';
import { RootStoreType } from 'src/ducks';
import { Room } from 'src/types/api';
import { selectTargetRoom, selectUpdatedPlaces } from 'src/ducks/room-editing/selectors';
import { setPosition, setRotation } from 'src/ducks/room-editing/actions';

type PropsType = {
    roomId: Room['id']
}

const mapStateToProps = (state: RootStoreType, props: PropsType) => {
    const isEdit = selectTargetRoom(state) === props.roomId;

    return {
        places: selectPlaces(state, props),
        updatedPlaces: isEdit ? selectUpdatedPlaces(state) : null,
        isEdit,
    }
};

export const Places = connect(mapStateToProps, { setPosition, setRotation })(PlacesView);
