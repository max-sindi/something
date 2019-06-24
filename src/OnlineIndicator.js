import React from 'react'
import {connect} from 'react-redux'
import {checkOnline} from './store/reducers/online'
import {OnlineMark, OnlineOuter, OnlineMarkText} from './styled'

class OnlineIndicator extends React.Component {
  state = {
    timer: null
  }

  componentDidMount() {
    this.props.checkOnline()
    const timer = setInterval(this.props.checkOnline,30000)
    this.setState({ timer })
  }

  render() {
    return (
      <OnlineOuter>
        <OnlineMark isOnline={this.props.isOnline}/>
        <OnlineMarkText> {this.props.isOnline !== null && this.props.isOnline ? 'Online' : 'Offline'}</OnlineMarkText>
      </OnlineOuter>
    )
  }

}

export default connect(store => ({
  isOnline: store.online.isOnline
}), {checkOnline})(OnlineIndicator)