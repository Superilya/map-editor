import qs from 'qs';
import { ToolView } from './view';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { RootStoreType } from 'src/ducks';
import { changeMyPlace } from 'src/ducks/places/actions';
import { startEdit, endEdit } from 'src/ducks/room-editing/actions';
import { BuildingPageParams, BuildingPageQuery } from 'src/types/routing';
import { selectTargetRoom } from 'src/ducks/room-editing/selectors';

const mapStateToProps = (state: RootStoreType, props: RouteComponentProps<BuildingPageParams>) => {
    const query: BuildingPageQuery = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    return {
        place: query.place ? state.places.entity[Number(query.place)] : undefined,
        room: query.room ? state.rooms.entity[Number(query.room)] : undefined,
        editableRoomId: selectTargetRoom(state)
    };
};

export const Tool = withRouter(connect(
    mapStateToProps,
    { changeMyPlace, startEdit, endEdit }
)(ToolView));
