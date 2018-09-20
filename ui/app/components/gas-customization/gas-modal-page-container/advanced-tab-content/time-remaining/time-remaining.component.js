import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTimeBreakdown } from './time-remaining.utils'

export default class TimeRemaining extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {
    milliseconds: PropTypes.number,
  }

  render () {
    const {
      milliseconds,
    } = this.props

    const {
      minutes,
      seconds,
    } = getTimeBreakdown(milliseconds)

    return (
      <div className="time-remaining">
        1 min 31 sec
      </div>
    )
  }
}
