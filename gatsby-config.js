/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
// this requires the npm-package dotenv.
let env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `./.env.${env}` });


const netlifyCmsPaths = {
  resolve: `gatsby-plugin-netlify-cms-paths`,
  options: {
    cmsConfig: `/static/admin/config.yml`,
  },
}

const settings = require("./src/util/site.json")

module.exports = {
  siteMetadata: settings.meta,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets/`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/`,
        name: `content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        plugins: [
          netlifyCmsPaths,
          `gatsby-remark-reading-time`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
              showCaptions: true,
              linkImagesToOriginal: false,
              tracedSVG: true,
              loading: "lazy",
            },
          },
          `gatsby-remark-responsive-iframe`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              // By default the HTML entities <>&'" are escaped.
              // Add additional HTML escapes by providing a mapping
              // of HTML entities and their escape value IE: { '}': '&#123;' }
              escapeEntities: {},
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('sass')
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: settings.ga,
      },
    },
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Metsän Otus`,
        short_name: `Metsän Otus`,
        start_url: `/`,
        background_color: `#faf7f2`,
        theme_color: `#e39b41`,
        display: `standalone`,
        icon: "static" + settings.meta.iconimage,
      },
    },
    // this plugin enables Progressive Web App + Offline functionality
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Poppins`,
          `source sans pro\:300,400,400i,700` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    },
  ],
}
