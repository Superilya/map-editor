import { connect } from 'react-redux'
import { search } from 'src/ducks/search/actions'
import { SearchView } from './view'

export const Search = connect(null, { search })(SearchView)
