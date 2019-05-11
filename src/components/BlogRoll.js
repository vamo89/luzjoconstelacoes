import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts ?
          posts.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id}>
              <div className="card"
              style={{
                backgroundColor: 'rgba(108, 55, 191, 0.2)', //$site-primary-lighter-color
                borderRadius: 15,
              }}>
                <div className="card-image" style={{ paddingTop: 15 }}>
                  <Link to={post.fields.slug}>
                    <figure className="image">
                      {post.frontmatter.ytkey ? (
                        <div className="featured-thumbnail">
                          <img src={`https://img.youtube.com/vi/${post.frontmatter.ytkey}/maxresdefault.jpg`} alt="Youtube thumbnail" />
                        </div>
                      ) : (
                        post.frontmatter.featuredimage &&
                          <div className="featured-thumbnail">
                            <PreviewCompatibleImage
                              imageInfo={{
                                image: post.frontmatter.featuredimage,
                                alt: `featured image thumbnail for post ${
                                  post.title
                                }`,
                              }}
                            />
                          </div>
                      )}
                    </figure>
                  </Link>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title">
                        <Link className="title has-text-primary is-size-4" to={post.fields.slug}>
                          {post.frontmatter.title}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="content">
                    <time style={{ fontSize: 14, color: '#555' }}>{post.frontmatter.date}</time>
                    <br />
                    {post.excerpt}
                    <br />
                    <Link className="button is-info"
                      style={{
                        backgroundColor: 'rgb(36, 18, 64)',
                        borderColor: 'transparent',
                        color: '#fff',
                        left: '50%',
                        transform: 'translate(-50%, 10px)',
                      }}
                      to={post.fields.slug}>
                      Continue lendo →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )) : 'Não há indicações por enquanto' }
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 100)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "DD/MM/YYYY")
                ytkey
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 512, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
