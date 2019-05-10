# LuzJo Constelação Familiar Sistêmica

[![Netlify Status](https://api.netlify.com/api/v1/badges/b654c94e-08a6-4b79-b443-7837581b1d8d/deploy-status)](https://app.netlify.com/sites/relaxed-bell-9605ec/deploys)

This repo uses an example business website that is built with [Gatsby](https://www.gatsbyjs.org/), and [Netlify CMS](https://www.netlifycms.org).
Uses this starter: [gatsby-starter-netlify-cms](https://github.com/netlify-templates/gatsby-starter-netlify-cms) **[Demo Link](https://gatsby-netlify-cms.netlify.com/)**.

It follows the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, and [Netlify](https://www.netlify.com) for continuous deployment, and CDN distribution.

## Prerequisites

- Node (I recommend using v8.2.0 or higher)
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)

## Purgecss
This plugin uses [gatsby-plugin-purgecss](https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/) and [bulma](https://bulma.io/). The bulma builds are usually ~170K but reduced 90% by purgecss.
