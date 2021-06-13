/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
// this requires the npm-package dotenv.
let env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `/.env.` });


//   path: `.env.${process.env.NODE_ENV}`,

const netlifyCmsPaths = {
  resolve: `gatsby-plugin-netlify-cms-paths`,
  options: {
    cmsConfig: `/static/admin/config.yml`,
  },
}

const settings = require("./src/util/site.json")

module.exports = {
  siteMetadata: {
    title: settings.meta.title,
    description: settings.meta.description,
    siteUrl: settings.meta.siteUrl,
    image: settings.meta.image,
    iconimage: settings.meta.iconimage,
    youtube: settings.meta.youtube,
    twitter: settings.meta.twitter,
    instagram: settings.meta.instagram,
    gtag: "G-DN31Z3YM6L",
    gtm: "GTM-TBFDWT8",
    MenuLinks: [
      {
        title: `Etusivu`,
        link: '/',
      },
      {
        title: `Minusta`,
        link: '/metsan-otus',
      },
      {
        title: `Vlogi`,
        link: `/vlogi`,
        subMenu: [
          {
            title: `Kirjakerho`,
            link: `/vlogi/kirjakerho/`,
          },
          {
            title: `Elämänkoulu`,
            link: `/vlogi/elamankoulu/`,
          },
          {
            title: `Saarnakirja`,
            link: `/vlogi/saarnakirja/`,
          },
          {
            title: `Hunajapurkki`,
            link: `/vlogi/hunajapurkki/`,
          },
          {
            title: `Pelihalli`,
            link: `/vlogi/pelihalli/`,
          },
          {
            title: `Karhuteatteri`,
            link: `/vlogi/karhuteatteri/`,
          },
        ],
      },
      {
        link: `/yhteydenotto`,
        title: `Ota yhteyttä`
      },
    ],
  },
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
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-TBFDWT8",
        includeInDevelopment: false,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        plugins: [
          netlifyCmsPaths,
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
      resolve: "gatsby-remark-embed-video",
      options: {
        width: 800,
        ratio: 1.77,
        height: 400,
        related: false,
        noIframeBorder: true
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `template`, `slug`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            template: node => node.frontmatter.template,
            title: node => node.frontmatter.title,
            slug: node => node.frontmatter.slug,
          },
        },
        // Optional filter to limit indexed nodes
        filter: (node, getNode) => node.frontmatter.tags !== "exempt",
      },
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Metsän Otus`,
        short_name: `Metsän Otus`,
        start_url: `/`,
        background_color: `#00000`,
        theme_color: `#006634`,
        display: `standalone`,
        icon: "static" + settings.meta.iconimage,
      },
    },
    // Kuukkeli hyväksyy  Progressive Web App + Offline functionality
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Poppins`,
          `source sans pro\:300,400,400i,700` // voit asettaa fontin koot ja tyylit tässä.
        ],
        display: 'swap'
      }
    },
  ],
}
