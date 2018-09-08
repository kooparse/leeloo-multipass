import moment from "moment"
import groupBy from "lodash/groupBy"
import React, { PureComponent } from "react"
import { withRouter } from "next/router"
import api from "../utils/api"

class Movie extends PureComponent {
  state = {
    days: {}
  }

  async componentDidMount() {
    const { code } = this.props.router.query
    const { data } = await api.get(`movie/${code}/showtimes`)

    const days = groupBy(data, item => item.day)
    this.setState({ days })
  }

  render() {
    const { days } = this.state
    console.log(days)
    return (
      <div>
        {Object.entries(days).map(([day, theaters]) => {
          return (
            <div key={day._id}>
              <strong>{moment(day).format("DD MMMM YYYY")}</strong>
              <div>
                {theaters.map(theater => (
                  <div key={theater.theaterCode}>
                    {theater.theaterName}

                    {theater.times.map((time, index) => (
                      <li key={index}>{time.time}</li>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default withRouter(Movie)
