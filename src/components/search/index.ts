import { connect } from 'react-redux';
import { search } from 'src/ducks/search/actions';
import { RootStoreType } from 'src/ducks';
import { selectIsSearchLoading } from 'src/ducks/search/selectors';
import { selectTargetRoom } from 'src/ducks/room-editing/selectors';
import { SearchView } from './view';

const mapStateToProps = (state: RootStoreType) => ({
    isDisabled:
        selectIsSearchLoading(state) || selectTargetRoom(state) !== null,
});

export const Search = connect(mapStateToProps, { search })(SearchView);
