import { BuildingPageView } from './view';
import { withLayout } from 'src/components/layout';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { RootStoreType } from 'src/ducks';
import { selectTargetBuilding, selectIsBuildingsLoading } from 'src/ducks/buildings/selectors';
import { selectCurrentFloor } from 'src/ducks/building-page/selectors';
import { updateRooms } from 'src/ducks/building-page/actions';
import { ParamsType } from 'src/types/routing';

const mapStateToProps = (state: RootStoreType, props: RouteComponentProps<ParamsType>) => ({
    building: selectTargetBuilding(Number(props.match.params.buildingId))(state),
    isBuildingsLoading: selectIsBuildingsLoading(state),
    currentFloor: selectCurrentFloor(state)
});

export const BuildingPage = withLayout()(withRouter(connect(
    mapStateToProps,
    { updateRooms }
)(BuildingPageView)));
