import React from 'react'
import { connect } from 'react-redux'
import { setNothingAsFocused } from './store/focus/reducer'

class GlobalClickHandler extends React.Component {

    clickHandler = () => {
        console.log('global clicked')
        this.props.setNothingAsFocused()
    }

    render() {
        return (
            <div onClick={this.clickHandler} style={{width: '100%', height: '100%'}}>
                {this.props.children}
            </div>
        )
    }
}

export default connect(null, { setNothingAsFocused })(GlobalClickHandler)