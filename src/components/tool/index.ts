import qs from 'qs';
import { ToolView } from './view';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { RootStoreType } from 'src/ducks';
import { BuildingPageParams, BuildingPageQuery } from 'src/types/routing';

const mapStateToProps = (state: RootStoreType, props: RouteComponentProps<BuildingPageParams>) => {
    const query: BuildingPageQuery = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    return {
        place: query.place ? Number(query.place) : undefined
    };
};

export const Tool = withRouter(connect(
    mapStateToProps,
)(ToolView));
