import React, { Component } from 'react';
import ClickListenerArea from './ClickListenerArea'
import { TypeableFieldDimensions } from './styled'
import {connect} from 'react-redux'
import { setAreaAsFocused } from './store/focus/reducer'
import NativeListener from 'react-native-listener'

const id = 'EDITOR'

class Editor extends Component {

  // state = {
  //   thisFieldIsFocused: false,
  // }

  onAreaClick = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    this.props.setAreaAsFocused(id)
  }

  render() {
    return (
      <TypeableFieldDimensions isFocused={this.props.thisFieldIsFocused}>
          <NativeListener onClick={this.onAreaClick}>
            {null}
          </NativeListener>
      </TypeableFieldDimensions>
    );
  }

}

export default connect(store => ({
  thisFieldIsFocused: store.focus.focusedAreaId === id
}), { setAreaAsFocused })(Editor);
