import React, {Component} from 'react'
import PropTypes from "prop-types"
import _ from "lodash"
import {toJS} from 'mobx'
import classNames from 'classnames'
import popup from '../../mobX/popup'
import {observer} from 'mobx-react'
const hyperscript = require('react-hyperscript')

//todo move to utils
const logObjectFields = (object) => Object.keys(object).forEach(name => console.log(name, ': ', object[name]))

class Tag extends Component {

  static propTypes = {
    indexInLevel: PropTypes.number,
    deepLevel: PropTypes.number,
  }

  static defaultProps = {
    indexInLevel: 0,
    deepLevel: 0,
  }

  initialState = {
    hover: false,
  }

  state = this.initialState

  componentDidUpdate() {
    const shouldHighlight =_.get(this.props, 'popup.highlightFragment.id', true) === _.get(this.props, `fragment.id`, false)
      && !this.state.hover

    if(shouldHighlight) {
      this.setState(s => ({...s, hover: true}))
    }
  }

  get attrs() {

    return {
      'data-deep-level': this.props.deepLevel + 1,
      'data-index-in-level': this.props.indexInLevel,
      'data-name': this.fragment.name || '',
      'className': classNames(this.props.fragment.className, this.state.hover && 'tag_hover'),
      ...this.fragment.attrs || {},
      style: toJS(this.props.fragment.style || {}),
      onClick: event => {
        event.stopPropagation()
        event.preventDefault()
        const top = event.clientY
        const left = event.clientX
        this.props.setPopup({
          coords: {top, left},
          fragment: this.props.fragment,
          highlightFragment: this.props.fragment,
          domElement: event.target
        })
      },
      onMouseOut: event => {
        event.stopPropagation()
        this.setState(state => ({...state, hover: false}))
      },
      onMouseOver: event => {
        event.stopPropagation()
        this.setState(state => ({...state, hover: true}))
      },
    }
  }

  get fragment() {
    return this.props.fragment
  }

  get tag() {
    return (this.props.fragment || {tag: ''}).tag
  }

  recursiveRenderChildren = () =>
    this.props.fragment.children && this.props.fragment.children.map((child, index) =>
      !_.isObject(child) ? (child || '') : (
        <Tag
          {...this.props}
          fragment={child}
          deepLevel={this.props.deepLevel + 1}
          indexInLevel={index}
        />
      ))

  canTagHaveChildren = tag => !['input', 'img'].includes(tag)

  render() {
    // todo find reason why tag can be undefined, probably it happens with root fragment
    return hyperscript(
      this.fragment.tag || 'div',
      this.attrs,
      this.canTagHaveChildren(this.fragment.tag) ? this.recursiveRenderChildren() : undefined
    )
  }
}

export default Tag