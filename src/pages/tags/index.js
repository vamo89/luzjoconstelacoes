import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

import './tags.sass'

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <section className="section tags-page">
      <Helmet title={`Categorias | ${title}`} />
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1 tags-container">
            <h1 className="title is-size-2 is-bold-light">Categorias</h1>
            <p>Clique em uma categoria para ver todas as indicações com este tema</p>
            <ul className="taglist tags">
              {group.map(tag => (
                <li key={tag.fieldValue}>
                  <Link className="tag is-link is-size-5" to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
