import React from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ title, description, image, article }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitter,
  } = site.siteMetadata

  const Seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  }

  return (
    <Helmet title={Seo.title}>
      <html lang="en-US" />
      <link rel="alternate" href={Seo.url} hreflang="en-us" />
      <link rel="alternate" href={Seo.url} hreflang="en" />
      <link rel="alternate" href={Seo.url} hreflang="x-default" />
      <meta name="description" content={Seo.description} />
      <meta name="image" content={Seo.image} />

      {Seo.url && <meta property="og:url" content={Seo.url} />}

      {(article ? true : null) && <meta property="og:type" content="article" />}

      {Seo.title && <meta property="og:title" content={Seo.title} />}

      {Seo.description && (
        <meta property="og:description" content={Seo.description} />
      )}

      {Seo.image && <meta property="og:image" content={Seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />

      {twitter && (
        <meta name="twitter:creator" content={twitter} />
      )}

      {Seo.title && <meta name="twitter:title" content={Seo.title} />}

      {Seo.description && (
        <meta name="twitter:description" content={Seo.description} />
      )}

      {Seo.image && <meta name="twitter:image" content={Seo.image} />}
    </Helmet>
  )
}

export default Seo


const query = graphql`
  query Seo {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: siteUrl
        defaultImage: image
        twitter
      }
    }
  }
`