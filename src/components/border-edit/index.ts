import { connect } from 'react-redux';
import {
    selectTargetBorder,
    selectTargetArea,
} from 'src/ducks/areas/selectors';
import {
    updateBorder,
    deleteBorder,
    createBorder,
    updateKind,
} from 'src/ducks/areas/actions';
import { RootStoreType } from 'src/ducks';
import { BorderEditView } from './view';

const mapStateToProps = (state: RootStoreType) => ({
    targetBorder: selectTargetBorder(state),
    targetArea: selectTargetArea(state),
});

export const BorderEdit = connect(mapStateToProps, {
    updateBorder,
    deleteBorder,
    createBorder,
    updateKind,
})(BorderEditView);
