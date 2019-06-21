import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ClickListenerArea extends Component {

  static propTypes = {
    onClick: PropTypes.func,
  }

  render() {
    return (
      <div onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }

}

export default ClickListenerArea;
