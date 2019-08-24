import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {ExtendingButton} from '../../../lib/ObjectExplorer'
import {generateColor} from '../../../utils'


class EachTagManager extends React.Component {
  state = {
    isVisible: false
  }
  static propTypes = {
    indexInLevel: PropTypes.number,
    deepLevel: PropTypes.number
  }

  static defaultProps = {
    deepLevel: 0
  }

  toggleVisibility = () => this.setState(st => ({isVisible: !st.isVisible}))


  render() {
    const {deepLevel, indexInLevel} = this.props
    const {isVisible} = this.state
    const fragment = this.props.fragment
    return (
      <div style={{background: generateColor(deepLevel, indexInLevel)}}>
        <div>
          <ExtendingButton onClick={this.toggleVisibility}>{isVisible ? '-' : '+'}</ExtendingButton>
        </div>
        <div>Tag: {fragment.tag}</div>
        {isVisible &&
          <div>children: {fragment.children.map((child, index) =>
            <div key={index} style={{paddingLeft: 15}}>
              {!_.isObject(child) ? child : (
                <EachTagManager fragment={child} key={index} deepLevel={deepLevel + 1} indexInLevel={index}/>
              )}
            </div>
          )}</div>
        }
      </div>
    )
  }
}


export default class HtmlManager extends React.Component {
  static propTypes = {
    currentState: PropTypes.object,
  }

  render() {
    const template = _.get(this.props.currentState, 'template')

    return (
      <div className={"html-manager"}>
        {template.map((fragment, index) =>
          <EachTagManager fragment={fragment} key={index} indexInLevel={index}/>
        )}
      </div>
    )
  }
}