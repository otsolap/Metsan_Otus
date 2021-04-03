const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")

// Data layer antaa pluginssien tehdä datasta sivuja.
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  //const vlogPost = path.resolve(`./src/templates/vlog-post.js`)
  const vlogList = path.resolve(`./src/templates/vlog-list.js`)
  const tagList = path.resolve("./src/templates/tags.js")

  const vlogresult = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            fields {
              slug
            }
            id
            frontmatter {
              slug
              template
              title
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)
  // Handle errors
  if (vlogresult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create markdown pages
  const vlogPosts = vlogresult.data.allMarkdownRemark.edges
  const tags = vlogresult.data.tagsGroup.group
  let vlogPostsCount = 0

  vlogPosts.forEach((post, index) => {
    const id = post.node.id
    const previous = index === vlogPosts.length - 1 ? null : vlogPosts[index + 1].node
    const next = index === 0 ? null : vlogPosts[index - 1].node

    createPage({
      path: post.node.frontmatter.slug,
      component: path.resolve(
        `src/templates/${String(post.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    })

    // Count vlog posts.
    if (post.node.frontmatter.template === 'vlog-post') {
      vlogPostsCount++
    }
  })

  // Create vlog-list pages
  const vlogPostsPerPage = 9
  const numVlogPages = Math.ceil(vlogPostsCount / vlogPostsPerPage)

  Array.from({ length: numVlogPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/vlogi` : `/vlogi/${i + 1}`,
      component: vlogList,
      context: {
        limit: vlogPostsPerPage,
        skip: i * vlogPostsPerPage,
        numVlogPages,
        currentPage: i + 1,
      },
    })
  })

  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/vlogi/tagit/${_.kebabCase(tag.fieldValue)}/`,
      component: tagList,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}

// Luo sivuja
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `sivut` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}