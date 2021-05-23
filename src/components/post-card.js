import React from "react"
import Card from 'react-bootstrap/Card'
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const PostCard = ({ data }) => (
  <Card
    className="post-card">
    {data.frontmatter.featuredImage ?
      (
        <Link to={data.frontmatter.slug}>
          <GatsbyImage
            image={data.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
            alt={data.frontmatter.title}
            className="featured-image"
            objectFit="scale-down"
          />
        </Link>
      ) : ""
    }
    <Card.Body className="post-content">
      {data.frontmatter.tags.map(tag => <span className="vlog-tag">{tag}</span>)}
      <Card.Title className="title"><Link to={data.frontmatter.slug}>{data.frontmatter.title}</Link></Card.Title>
      <Card.Text className="meta"><time>{data.frontmatter.date}</time></Card.Text>
    </Card.Body>
  </Card>
)

export default PostCard

