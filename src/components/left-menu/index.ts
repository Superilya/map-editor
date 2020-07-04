import { connect } from 'react-redux';
import qs from 'qs';
import { RootStoreType } from 'src/ducks';
import { selectIsSelfLoading, selectSelfUser } from 'src/ducks/users/selectors';
import {
    selectIsBuildingsLoading,
    selectBuildings,
    selectTargetBuilding,
} from 'src/ducks/buildings/selectors';
import { goToPage } from 'src/ducks/app/actions';
import { selectTargetRoom } from 'src/ducks/room-editing/selectors';
import { withRouter, RouteComponentProps } from 'react-router';
import { BuildingPageParams, BuildingPageQuery } from 'src/types/routing';
import { selectRoomById } from 'src/ducks/rooms/selectors';
import { selectPlaceById } from 'src/ducks/places/selectors';
import { LeftMenuView } from './view';

const mapStateToProps = (
    state: RootStoreType,
    props: RouteComponentProps<BuildingPageParams>
) => {
    const query: BuildingPageQuery = qs.parse(props.location.search, {
        ignoreQueryPrefix: true,
    });

    return {
        building: selectTargetBuilding(Number(props.match.params.buildingId))(
            state
        ),
        currentFloor: Number(props.match.params.floor),
        isSelfLoading: selectIsSelfLoading(state),
        selfUser: selectSelfUser(state),
        isBuildingsLoading: selectIsBuildingsLoading(state),
        buildings: selectBuildings(state),
        isEditing: selectTargetRoom(state) !== null,
        selectedBuildingId: Number(props.match.params.buildingId),
        place: query.place
            ? selectPlaceById(state, { placeId: Number(query.place) })
            : undefined,
        room: query.room
            ? selectRoomById(state, { roomId: Number(query.room) })
            : undefined,
        editableRoomId: selectTargetRoom(state),
    };
};

export const LeftMenu = withRouter(
    connect(mapStateToProps, { goToPage })(LeftMenuView)
);
