import React from 'react'
import PropTypes from 'prop-types'


export default class AppManager extends React.Component {
  static propTypes = {
    currentState: PropTypes.object,
  }

  render() {
    return (
      <div className={'app-manager mb-20'}>App manager (soon)</div>
    )
  }
}