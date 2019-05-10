import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const PreviewCompatibleImage = ({ imageInfo }) => {
  const imageStyle = { borderRadius: '5px' }
  const { alt = '', childImageSharp, image } = imageInfo

  if (!!image && !!image.childImageSharp) {
    return (
      (image.childImageSharp.fluid && <Img style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />) ||
      (image.childImageSharp.fixed && <Img style={imageStyle} fixed={image.childImageSharp.fixed} alt={alt} />)
    )
  }

  if (!!childImageSharp) {
    return (
      (childImageSharp.fluid && <Img style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />) ||
      (childImageSharp.fixed && <Img style={imageStyle} fixed={childImageSharp.fixed} alt={alt} />)
    )
  }

  if (!!image && typeof image === 'string')
    return <img style={imageStyle} src={image} alt={alt} />

  return null
}

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
}

export default PreviewCompatibleImage
