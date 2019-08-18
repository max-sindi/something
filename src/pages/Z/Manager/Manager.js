import React from 'react'
import _ from "lodash"
import PropTypes from 'prop-types'

class EachTagManager extends React.Component {
  static propTypes = {
    indexInLevel: PropTypes.number,
    deepLevel: PropTypes.number
  }

  static defaultProps = {
    deepLevel: 0
  }

  render() {
    const fragment = this.props.fragment
    return (
      <div>
        <div>Tag: {fragment.tag}</div>
        <div>children: {fragment.children.map((child, index) => !_.isObject(child) ? child : (
          <EachTagManager fragment={child} key={index} deepLevel={this.props.deepLevel + 1} indexInLevel={index}/>
        ))}</div>
      </div>
    )
  }
}

class HtmlManager extends React.Component {
  static propTypes = {
    currentState: PropTypes.object,
  }

  render() {
    const template = _.get(this.props.currentState, 'template')

    return (
      <div className={"tags-manager"}>
        {template.map((fragment, index) =>
          <EachTagManager fragment={fragment} key={index} indexInLevel={index}/>
        )}
      </div>
    )
   }
}

class AppManager extends React.Component {
  static propTypes = {
    currentState: PropTypes.object,
  }

  render() {
    return (
      <div className={'app-manager'}></div>
    )
  }
}

export default class StateTreeManager extends React.Component {
  static propTypes = {
    currentState: PropTypes.object,
  }

  render() {
    return (
      <div>
        <AppManager currentState={this.props.currentState}/>
        <HtmlManager currentState={this.props.currentState}/>
      </div>
    )
  }
}