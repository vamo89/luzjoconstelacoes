import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()

  if(data) {
    return (
      <BlogPostTemplate
        content={widgetFor('body')}
        ytkey={data.ytkey}
        tags={data.tags}
        title={data.title}
        featuredimage={data.featuredimage}
      />
    )
  }
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
