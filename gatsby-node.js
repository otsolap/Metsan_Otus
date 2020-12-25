const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

// Data layer antaa pluginssien tehdä datasta sivuja.
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  //const vlogPost = path.resolve(`./src/templates/vlog-post.js`)
  const vlogList = path.resolve(`./src/templates/vlog-list.js`)

  const vlogresult = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
              title
            }
          }
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
      path: i === 0 ? `/vlog` : `/vlog/${i + 1}`,
      component: vlogList,
      context: {
        limit: vlogPostsPerPage,
        skip: i * vlogPostsPerPage,
        numVlogPages,
        currentPage: i + 1,
      },
    })
  })

}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}