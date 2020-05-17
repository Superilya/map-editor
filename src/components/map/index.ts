import { MapView } from './view';
import { connect } from 'react-redux';
import { selectRooms, selectIsRoomsLoading } from 'src/ducks/rooms/selectors';
import { RootStoreType } from 'src/ducks';

const mapStateToProps = (state: RootStoreType) => ({
    rooms: selectRooms(state),
    isRoomsLoading: selectIsRoomsLoading(state)
});

export const Map = connect(mapStateToProps)(MapView);