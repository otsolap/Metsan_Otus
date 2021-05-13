import React from "react"
import { Link } from "gatsby"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { RiArrowDownLine, RiArrowRightSLine } from "react-icons/ri"
import PostCard from "./post-card"

export default function VlogListHome(props) {
  const data = props.data
  const posts = data.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge =>
      <Col md={4}>
        <PostCard key={edge.node.id} data={edge.node} />
      </Col>
    )
  return <PostMaker data={posts} />
}

const PostMaker = ({ data }) => (
  <section className="home-posts py-4">
    <h2>Tuoreimmat <strong>Vlogit</strong> <span className="icon -right"><RiArrowDownLine /></span></h2>
    <Row>
      {data}
    </Row>
    <Link
      className="button home-btn"
      to="/vlogi"
    >
      Katso kaikki vlogit<span className="icon -right"><RiArrowRightSLine /></span>
    </Link>
  </section>
)