import React, { Component } from 'react';
import ClickListenerArea from './ClickListenerArea'
import { TypeableFieldDimensions } from './styled'


class TypeableField extends Component {

  state = {
    thisFieldIsFocused: true,
    focused: []
  }

  onAreaClick = () => {
    this.setState({thisFieldIsFocused: true})
  }

  render() {
    return (
      <TypeableFieldDimensions>
          <ClickListenerArea onClick={this.onAreaClick}></ClickListenerArea>
      </TypeableFieldDimensions>
    );
  }

}

export default TypeableField;
