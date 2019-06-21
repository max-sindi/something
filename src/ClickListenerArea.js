import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FullScreenStyled } from './styled'




class ClickListenerArea extends Component {

  propTypes: {
    onClick: PropTypes.func,
  }

  render() {
    return (
      <FullScreenStyled onClick={this.props.onClick}>
        {this.props.children}
      </FullScreenStyled>
    );
  }

}

export default ClickListenerArea;
