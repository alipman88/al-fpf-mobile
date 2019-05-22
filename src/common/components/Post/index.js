import { connect } from 'react-redux'

import { Post as PostComponent } from './Post'
import { areas } from '@common/areas'
import { fetchSpecificIssue } from '@common/issues'
import { chooseMailApp } from '@common/mailApp'

const mapStateToProps = state => ({
  areasIdMap: areas.selectors.getAreasIdMap(state)
})

export const Post = connect(
  mapStateToProps,
  {
    fetchSpecificIssue,
    chooseMailApp
  }
)(PostComponent)
