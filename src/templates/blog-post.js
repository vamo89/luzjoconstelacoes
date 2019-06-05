import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

import './blog-post.sass'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  ytkey,
  tags,
  title,
  helmet,
  featuredimage,
}) => {
  const PostContent =  Content

  return (
    <section className="blog-post section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>
              {ytkey ?
                <img className="youtube-title-image" src={`https://img.youtube.com/vi/${ytkey}/hqdefault.jpg`} alt={`Youtube thumbnail for post ${title}`}/>
                : featuredimage && <PreviewCompatibleImage imageInfo={{ image: featuredimage, alt: `Thumbnail for post ${title}` }} />
              }
            </p>
            { ytkey &&
              <h2><a href={`https://www.youtube.com/watch?v=${ytkey}`}>Link para o vídeo</a></h2>
            }
            <PostContent content={content} />
            {tags && tags.length ? (
              <div className="tags-container">
                <h4>Categorias</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link className="tag is-link is-size-7" to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  title: PropTypes.string,
  ytkey: PropTypes.string,
  featuredimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        ytkey={post.frontmatter.ytkey}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="ytkey"
              content={`${post.frontmatter.ytkey}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        featuredimage={post.frontmatter.featuredimage}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD/MM/YYYY")
        title
        ytkey
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
