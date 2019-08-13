import React, {Component, Fragment} from 'react'
import _ from 'lodash'
var h = require('react-hyperscript')

function recursevelyDoSomething(start) {

}

class Element extends Component {

  get deepLevel() {
    return (typeof this.props.deepLevel === 'number' && this.props.deepLevel + 1) || 0
  }
  get indexInLevel() {
    return this.props.indexInLevel || 0
  }
  get attrs() {
    return {
      'data-deep-level': this.deepLevel,
      'data-index-in-level': this.indexInLevel
    }
  }
  get fragment() {
    return this.props.fragment
  }

  recursiveRenderChildren() {
    const {children} = this.props.fragment
    // if children are - return either string or mapped array
    return children && (!Array.isArray(children) ? children : children.map((child, index) => {
      return !_.isObject(child) ? (child || '') : (
        <Element
          fragment={child}
          deepLevel={this.deepLevel}
          indexInLevel={index}
        />
      )
    }))
  }

  hyperskriptRenderThisElement = () => {
    return h(
      this.fragment.tag,
      this.attrs,
      this.recursiveRenderChildren()
    )
  }

  render() {
    const Tag = () => this.hyperskriptRenderThisElement()
    return (
      <Tag></Tag>
    )
  }
}


export default class Zi extends React.Component {
  render() {
    const template = _.get(this.props.currentState, 'template')
    return !template ? null : (
      <>
        {template.map((fragment, index) =>
          <Element
            key={index}
            indexInLevel={index}
            fragment={fragment}
          />)
        }
      </>
    )
  }
}