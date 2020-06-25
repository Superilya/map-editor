import { connect } from 'react-redux';
import { selectUserById } from 'src/ducks/users/selectors';
import { RootStoreType } from 'src/ducks';
import { User } from 'src/types/api';
import { MapUserView } from './view';

type PropsType = {
    userId: User['id'];
};

const mapStateToProps = (state: RootStoreType, props: PropsType) => ({
    user: selectUserById(state, props),
});

export const MapUser = connect(mapStateToProps)(MapUserView);
