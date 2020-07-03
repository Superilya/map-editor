import { connect } from 'react-redux';
import { RootStoreType } from 'src/ducks';
import { selectIsSelfLoading, selectSelfUser } from 'src/ducks/users/selectors';
import {
    selectIsBuildingsLoading,
    selectBuildings,
} from 'src/ducks/buildings/selectors';
import { goToPage } from 'src/ducks/app/actions';
import { selectTargetRoom } from 'src/ducks/room-editing/selectors';
import { withRouter, RouteComponentProps } from 'react-router';
import { BuildingPageParams } from 'src/types/routing';
import { LeftMenuView } from './view';

const mapStateToProps = (
    state: RootStoreType,
    props: RouteComponentProps<BuildingPageParams>
) => ({
    isSelfLoading: selectIsSelfLoading(state),
    selfUser: selectSelfUser(state),
    isBuildingsLoading: selectIsBuildingsLoading(state),
    buildings: selectBuildings(state),
    isEditing: selectTargetRoom(state) !== null,
    selectedBuildingId: Number(props.match.params.buildingId),
});

export const LeftMenu = withRouter(
    connect(mapStateToProps, { goToPage })(LeftMenuView)
);
