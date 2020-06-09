import { PlacesView } from './view';
import { connect } from 'react-redux';
import { selectPlaces } from 'src/ducks/places/selectors';
import { RootStoreType } from 'src/ducks';
import { Room } from 'src/types/api';
import {
    selectTargetRoom,
    selectEditedPlaces
} from 'src/ducks/room-editing/selectors';
import { setPosition, setRotation, deletePlace } from 'src/ducks/room-editing/actions';

type PropsType = {
    roomId: Room['id']
}

const mapStateToProps = (state: RootStoreType, props: PropsType) => {
    const isEdit = selectTargetRoom(state) === props.roomId;

    return {
        places: isEdit
            ? selectEditedPlaces(state, props)
            : selectPlaces(state, props),
        isEdit,
    }
};

export const Places = connect(
    mapStateToProps, 
    { setPosition, setRotation, deletePlace }
)(PlacesView);
