import React from "react"
import { Link } from "gatsby"
import { RiArrowDownLine, RiArrowRightSLine } from "react-icons/ri"
import PostCard from "./post-card"

export default function VlogListHome(props) {
  const data = props.data
  const posts = data.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge =>
      <PostCard key={edge.node.id} data={edge.node} />)
  return <PostMaker data={posts} />
}

const PostMaker = ({ data }) => (
  <section className="home-posts">
    <h2>Latest in <strong>Vlog</strong> <span className="icon -right"><RiArrowDownLine /></span></h2>
    <div className="grids col-1 sm-2 lg-3">
      {data}
    </div>
    <Link
      className="button"
      to="/vlogi"
    >
      Katso kaikki vlogit<span className="icon -right"><RiArrowRightSLine /></span>
    </Link>
  </section>
)