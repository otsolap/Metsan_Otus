import React from "react"
import { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import { RiSearchLine } from "react-icons/ri"

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = { showSearch: false }
    this.handleToggleClick = this.handleToggleClick.bind(this)
    this.state = {
      query: ``,
      results: [],
    }
  }

  handleToggleClick() {
    this.setState(state => ({
      showSearch: !state.showSearch,
    }))
  }

  render() {
    return (
      <div className="search-field">
        <div>
          <button
            onClick={this.handleToggleClick}
            className={this.state.showSearch ? "search is-active" : "search"}
          >
            <RiSearchLine />
          </button>
          <div className="search-container">
            <input
              type="text"
              placeholder="Hae vlogia"
              value={this.state.query}
              onChange={this.search}
              className="search-input"
            />
            <ul className="search-results">
              {this.state.results.map(page => (
                <li key={page.id}>
                  {page.template === "vlog-post" ? (
                    <Link to={page.slug}>{page.title}</Link>
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  getOrCreateIndex = () =>
    this.index
      ?
      this.index : // Create an elastic lunr index and hydrate with graphql query results
      Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true }) // Accept partial matches
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}

export default Search;