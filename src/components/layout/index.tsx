import React, { ComponentType } from 'react';
import { LayoutView } from './view';
import { connect } from 'react-redux';
import { RootStoreType } from 'src/ducks';
import { selectIsSelfLoading, selectSelfUser } from 'src/ducks/users/selectors';
import { selectIsBuildingsLoading, selectBuildings } from 'src/ducks/buildings/selectors';
import { goToPage } from 'src/ducks/app/actions';

const mapStateToProps = (state: RootStoreType) => ({
    isSelfLoading: selectIsSelfLoading(state),
    selfUser: selectSelfUser(state),
    isBuildingsLoading: selectIsBuildingsLoading(state),
    buildings: selectBuildings(state)
});

export const Layout = connect(mapStateToProps, { goToPage })(LayoutView);

export const withLayout = () => (Target: ComponentType) => () => (
    <Layout>
        <Target />
    </Layout>
);
