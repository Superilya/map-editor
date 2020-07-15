import { connect } from 'react-redux';
import { RootStoreType } from 'src/ducks';
import { Room } from 'src/types/api';
import { selectRoomById } from 'src/ducks/rooms/selectors';
import {
    updateBorder,
    deleteBorder,
    selectBorder,
} from 'src/ducks/areas/actions';
import { AreaEditView } from './view';

type PropsType = {
    roomId: Room['id'];
};

const mapStateToProps = (state: RootStoreType, props: PropsType) => ({
    room: selectRoomById(state, props),
});

export const AreaEdit = connect(mapStateToProps, {
    updateBorder,
    deleteBorder,
    selectBorder,
})(AreaEditView);
