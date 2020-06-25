import qs from 'qs';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { RootStoreType } from 'src/ducks';
import { changeMyPlace } from 'src/ducks/places/actions';
import { editStart } from 'src/ducks/room-editing/actions';
import { BuildingPageParams, BuildingPageQuery } from 'src/types/routing';
import { selectTargetRoom } from 'src/ducks/room-editing/selectors';
import { selectRoomById } from 'src/ducks/rooms/selectors';
import { selectPlaceById } from 'src/ducks/places/selectors';
import { ToolView } from './view';

const mapStateToProps = (
    state: RootStoreType,
    props: RouteComponentProps<BuildingPageParams>
) => {
    const query: BuildingPageQuery = qs.parse(props.location.search, {
        ignoreQueryPrefix: true,
    });

    return {
        place: query.place
            ? selectPlaceById(state, { placeId: Number(query.place) })
            : undefined,
        room: query.room
            ? selectRoomById(state, { roomId: Number(query.room) })
            : undefined,
        editableRoomId: selectTargetRoom(state),
    };
};

export const Tool = withRouter(
    connect(mapStateToProps, { changeMyPlace, editStart })(ToolView)
);
