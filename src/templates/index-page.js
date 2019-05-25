import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import Content, { HTMLContent } from '../components/Content'

import './index.sass'

export const IndexPageTemplate = ({
  image,
  title,
  subtitle,
  contentComponent,
  content,
}) => {
  const PageContent = contentComponent || Content

  return (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image})`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
      }}
    >
      <div className="title-container">
        <h1 className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen" >
          {title}
        </h1>
        <h3 className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen" >
          {subtitle}
        </h3>
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="columns">
                  <div className="column is-12 main-content">
                    <PageContent className="content" content={content} />
                  </div>
                </div>
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2 has-text-primary">
                    Últimas indicações
                  </h3>
                  <BlogRoll/>
                  <div className="column is-12 has-text-centered ">
                    <Link className="btn" to="/blog">
                      Veja mais
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const IndexPage = ({ data }) => {
  const { frontmatter: page } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={page.image}
        title={page.title}
        subtitle={page.subtitle}
        contentComponent={HTMLContent}
        content={data.markdownRemark.html}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        subtitle
        image {
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
