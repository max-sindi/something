import React from 'react'
import Tag from './Tag'
import _ from "lodash"

function recursevelyDoSomething(start) {

}

export default class RenderState extends React.Component {
  render() {
    const template = _.get(this.props.currentState, 'template')
    return !template ? null : (
      <>
        {template.map((fragment, index) =>
          <Tag
            key={index}
            indexInLevel={index}
            fragment={fragment}
          />
        )}
      </>
    )
  }
}