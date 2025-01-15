import { connect } from 'react-redux'

import { Post as PostComponent } from './Post'
import { areas } from '@fpf/common/areas'
import { fetchSpecificIssue } from '@fpf/common/issues'
import { chooseMailApp } from '@fpf/common/mailApp'
import { appSettings } from '@fpf/common/appSettings'

const mapStateToProps = (state) => ({
  areasIdMap: areas.selectors.getAreasIdMap(state),
  fullAreasIdMap: areas.selectors.getFullAreasIdMap(state),
  categories: appSettings.selectors.getCategories(state),
  labelStyles: appSettings.selectors.getLabelStyles(state),
})

export const Post = connect(mapStateToProps, {
  fetchSpecificIssue,
  chooseMailApp,
})(PostComponent)
