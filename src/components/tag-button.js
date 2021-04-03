import React from "react"
import { Link } from "gatsby"

const tagButton = ({ data }) => (
  <button className="tag-button">
    <Link to={data.tagsGroup.group}></Link>
  </button>
)

export default tagButton
