import { PlacesView } from './view';
import { connect } from 'react-redux';
import { selectPlaces } from 'src/ducks/places/selectors';
import { RootStoreType } from 'src/ducks';
import { Room } from 'src/types/api';

type PropsType = {
    roomId: Room['id']
}

const mapStateToProps = (state: RootStoreType, props: PropsType) => ({
    places: selectPlaces(state, props)
});

export const Places = connect(mapStateToProps)(PlacesView);
