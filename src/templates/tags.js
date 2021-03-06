import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

import './tags.sass'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const suffix = totalCount === 1 ? '' : 's';
    const tagHeader = `${totalCount} post${suffix} categorizado${suffix} como “${tag}”`

    const postLinks = posts.map(({ node: post }) => {
      const hasImg = post.frontmatter.ytkey || post.frontmatter.featuredimage;
      return (
      <div className="is-parent column is-6" key={post.id}>
        <article className={`blog-list-item tile is-child box notification`}>
          <header>
            {hasImg && 
              <div className="featured-thumbnail">
                {post.frontmatter.ytkey ?
                  <img src={`https://img.youtube.com/vi/${post.frontmatter.ytkey}/mqdefault.jpg`} alt={`Youtube thumbnail for post ${post.frontmatter.title}`}/>
                  : <PreviewCompatibleImage imageInfo={{ image: post.frontmatter.featuredimage, alt: `Thumbnail for post ${post.frontmatter.title}` }} />
                }
              </div>
            }
            <p className={`post-meta ${hasImg ? 'has-img' : ''}`}>
              <Link className="title has-text-primary is-size-4" to={post.fields.slug}>
                {post.frontmatter.title}
              </Link>
            </p>
          </header>
          <Link className="button" to={post.fields.slug}>
            Continue lendo →
          </Link>
        </article>
      </div>
    )});

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div className="column is-10 is-offset-1 tag-column">
                <h3 className="title is-size-4 is-bold-light has-text-primary">{tagHeader}</h3>
                <ul className="taglist">{postLinks}</ul>
                <p>
                  <Link to="/tags/" className="has-text-primary">Veja todas as categorias</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            ytkey
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
