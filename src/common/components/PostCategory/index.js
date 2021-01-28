import { connect } from 'react-redux'

import { PostCategory as PostCategoryComponent } from './PostCategory'
import { appSettings } from '@common/appSettings'

const mapStateToProps = (state) => ({
  labelStyles: appSettings.selectors.getLabelStyles(state),
})

export const PostCategory = connect(mapStateToProps)(PostCategoryComponent)
