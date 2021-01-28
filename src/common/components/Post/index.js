import { connect } from 'react-redux'

import { Post as PostComponent } from './Post'
import { areas } from '@common/areas'
import { fetchSpecificIssue } from '@common/issues'
import { chooseMailApp } from '@common/mailApp'
import { appSettings } from '@common/appSettings'

const mapStateToProps = (state) => ({
  areasIdMap: areas.selectors.getAreasIdMap(state),
  categories: appSettings.selectors.getCategories(state),
  labelStyles: appSettings.selectors.getLabelStyles(state),
})

export const Post = connect(mapStateToProps, {
  fetchSpecificIssue,
  chooseMailApp,
})(PostComponent)
