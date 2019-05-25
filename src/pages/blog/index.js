import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

import './indicacoes.sass'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="full-width-image-container margin-top-0 layout-container">
          <h1 className="has-text-weight-bold is-size-1">
            Indicações
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
