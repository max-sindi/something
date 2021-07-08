import React from 'react'
import {OnlineMark, OnlineOuter, OnlineMarkText} from './styled'
import {observer} from "mobx-react"
import Online from "../mobX/online"

const OnlineIndicator = observer(
  class OnlineIndicator extends React.Component {
    state = {
      timer: null
    }

    render() {
      return (
          <OnlineOuter>
            <OnlineMark isOnline={this.props.online.isOnline}/>
            <OnlineMarkText> {this.props.online.isOnline !== null && this.props.online.isOnline ? 'Online' : 'Offline'}</OnlineMarkText>
          </OnlineOuter>
      )
    }
  }
)

const online = new Online()

export default props => <OnlineIndicator {...props} online={online} />