import React, {Component} from 'react'
var h = require('react-hyperscript')

class Element extends Component {
  renderListOrText = (ch) => {
    const children = ch || this.props.fragment.children

    if(!children) {
      console.log('no children')
      return null
    } else
    if(Array.isArray(children)) {
      return children.map((item, index) => {
        const props = {
          fragment: item,
          deepLevel: this.deepLevel,
          indexInLevel: index,
        }
        return <Element {...props}></Element>
      })
    } else if(typeof children === 'string'){
      return children
    } else {
      console.log('children is not string or array')
    }

  }

  get deepLevel() {
    return (typeof this.props.deepLevel === 'number' && this.props.deepLevel + 1) || 0
  }
  get indexInLevel() {
    return this.props.indexInLevel  || 0
  }

  render() {
    // console.log(this.props.indexInLevel);
    const attrs = {'data-deep-level': this.deepLevel, 'data-index-in-level': this.indexInLevel}
    return <>{h('div', attrs, this.renderListOrText(this.props.fragment.children))}</>
  }
}

export default class Zi extends React.Component {
  render() {
    const {currentState} = this.props
    return !currentState.template ? null : (
      // null
      <>{currentState.template.map((fragment, index) => console.log('Symbol of each fragment', Symbol(index)) ||
        <Element key={index} indexInLevel={index} fragment={fragment}></Element>)}</>
    )
  }
}