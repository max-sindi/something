import React, {Component} from 'react'
import PropTypes from "prop-types"
import _ from "lodash"
const hyperscript = require('react-hyperscript')


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
    const dynamicAttrs = (() => {
      try {
        return JSON.parse(this.props.fragment.attrs)
      } catch (e) {
        return {}
      }
    })();

    return {
      'data-deep-level': this.props.deepLevel + 1,
      'data-index-in-level': this.props.indexInLevel,
      'data-name': this.fragment.name || '',
      'className': this.props.fragment.className,
      ...dynamicAttrs
    }
  }

  get fragment() {
    return this.props.fragment
  }

  recursiveRenderChildren() {
    const {children} = this.props.fragment
    return children && children.map((child, index) => {
      return !_.isObject(child) ? (child || '') : (
          <Tag
              fragment={child}
              deepLevel={this.props.deepLevel + 1}
              indexInLevel={index}
          />
      )
    })
  }

  canTagHaveChildren = tag => !['input', 'img'].includes(tag)

  render() {
    const children = this.canTagHaveChildren(this.fragment.tag) ? this.recursiveRenderChildren() : undefined

    // todo find reason why tag can be undefined, probably it happens with root fragment
    return hyperscript(
      this.fragment.tag || 'div',
      this.attrs,
      children
    )
  }
}
