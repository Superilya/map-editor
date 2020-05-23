import qs from 'qs';
import { BuildingPageView } from './view';
import { withLayout } from 'src/components/layout';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { RootStoreType } from 'src/ducks';
import { selectTargetBuilding, selectIsBuildingsLoading } from 'src/ducks/buildings/selectors';
import { goToPage } from 'src/ducks/app/actions';
import { BuildingPageParams, BuildingPageQuery } from 'src/types/routing';

const mapStateToProps = (state: RootStoreType, props: RouteComponentProps<BuildingPageParams>) => {
    const query: BuildingPageQuery = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    return {
        building: selectTargetBuilding(Number(props.match.params.buildingId))(state),
        isBuildingsLoading: selectIsBuildingsLoading(state),
        currentFloor: Number(props.match.params.floor),
        selectedPlace: query.place ? Number(query.place) : undefined
    };
};

export const BuildingPage = withLayout()(withRouter(connect(
    mapStateToProps,
    { goToPage }
)(BuildingPageView)));
