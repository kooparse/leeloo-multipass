import React, { PureComponent } from "react"
import Link from "next/link"
import api from "../utils/api"

const movieStyles = {
  display: "flex",
  flexWrap: "wrap"
}

const coverStyles = {
  margin: 10
}

class Home extends PureComponent {
  state = {
    movies: []
  }

  async componentDidMount() {
    const { data: movies } = await api.get("nowshowing")
    this.setState({ movies })
  }

  render() {
    const { movies } = this.state
    console.log(this.state)
    return (
      <div style={movieStyles}>
        {movies.map(movie => {
          return (
            <Link href={`movie?code=${movie.code}`}>
              <div key={movie._id} style={coverStyles}>
                <img src={movie.cover} width={300} />
              </div>
            </Link>
          )
        })}
      </div>
    )
  }
}

export default Home
