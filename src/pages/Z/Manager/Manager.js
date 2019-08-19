import React from 'react'
import PropTypes from 'prop-types'
import HtmlManager from './HtmlManager'


class AppManager extends React.Component {
  static propTypes = {
    currentState: PropTypes.object,
  }

  render() {
    return (
      <div className={'app-manager'}></div>
    )
  }
}

export default class StateTreeManager extends React.Component {
  static propTypes = {
    currentState: PropTypes.object,
  }

  render() {
    return (
      <div>
        <AppManager currentState={this.props.currentState}/>
        <HtmlManager currentState={this.props.currentState}/>
      </div>
    )
  }
}