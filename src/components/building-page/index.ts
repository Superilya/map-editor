import qs from 'qs'
import { withLayout } from 'src/components/layout'
import { withRouter, RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { RootStoreType } from 'src/ducks'
import {
  selectTargetBuilding,
  selectIsBuildingsLoading,
} from 'src/ducks/buildings/selectors'
import { goToPage } from 'src/ducks/app/actions'
import { BuildingPageParams, BuildingPageQuery } from 'src/types/routing'
import { BuildingPageView } from './view'

const mapStateToProps = (
  state: RootStoreType,
  props: RouteComponentProps<BuildingPageParams>
) => {
  const query: BuildingPageQuery = qs.parse(props.location.search, {
    ignoreQueryPrefix: true,
  })

  return {
    building: selectTargetBuilding(Number(props.match.params.buildingId))(
      state
    ),
    isBuildingsLoading: selectIsBuildingsLoading(state),
    currentFloor: Number(props.match.params.floor),
    selectedPlace: query.place ? Number(query.place) : undefined,
    selectedRoom: query.room ? Number(query.room) : undefined,
  }
}

export const BuildingPage = withLayout()(
  withRouter(connect(mapStateToProps, { goToPage })(BuildingPageView))
)
