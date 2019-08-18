import React, {Component} from 'react'
import PropTypes from "prop-types"
import _ from "lodash"
var hyperscript = require('react-hyperscript')



export default class Tag extends Component {

  static propTypes = {
    indexInLevel: PropTypes.number,
    deepLevel: PropTypes.number,
  }

  static defaultProps = {
    indexInLevel: 0,
    deepLevel: 0,
  }

  get attrs() {
    return {
      'data-deep-level': this.props.deepLevel + 1,
      'data-index-in-level': this.props.indexInLevel
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
          <Tag
              fragment={child}
              deepLevel={this.props.deepLevel + 1}
              indexInLevel={index}
          />
      )
    }))
  }

  render() {
    return hyperscript(
        this.fragment.tag,
        this.attrs,
        this.recursiveRenderChildren()
    )
  }
}
