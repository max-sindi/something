import React from 'react'
import PropTypes from 'prop-types'
import HtmlManager from './HtmlManager'
import AppManager from './AppManager'
import popup from '../../mobX/popup'

class StateTreeManager extends React.Component {
  static propTypes = {
    currentState: PropTypes.object,
  }

  render = () => {
    return (
      <div style={{background: '#32D4CB'/*, padding: 20*/}}>
        <AppManager currentState={this.props.currentState} {...this.props} />
        <HtmlManager currentState={this.props.currentState} {...this.props} />
      </div>
    )
  }
}

export default StateTreeManager