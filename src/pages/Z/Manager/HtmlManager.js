import React from "react"
import PropTypes from "prop-types"
import _ from "lodash"
import {ButtonExtendComponent, ButtonAddNewChild} from '../../../lib/ObjectExplorer'
import {TagWrapper} from '../styled'
import subscriber from '../subscriber'


class EachTagManager extends React.Component {
  state = {
    isOpened: false
  }
  static propTypes = {
    indexInLevel: PropTypes.number,
    deepLevel: PropTypes.number
  }

  static defaultProps = {
    deepLevel: 0
  }

  get breadcrumbsInTree() {
    return this.props.breadcrumbs
  }

  toggleVisibility = () => this.setState(st => ({ isOpened: !st.isOpened }))

  async addNewChild() {
    const template = await subscriber.template
    // console.log(template)
  }

  render() {
    const {deepLevel, indexInLevel} = this.props
    const {isOpened} = this.state
    const fragment = this.props.fragment
    return (
      <TagWrapper isOpened={isOpened} deepLevel={deepLevel} indexInLevel={indexInLevel}>
        {/* display tag name */}
        <div>{fragment.tag}</div>
        <div>
          <ButtonExtendComponent onClick={this.toggleVisibility}>{isOpened ? '-' : '+'}</ButtonExtendComponent>
        </div>

        {isOpened &&

        /* display children and ...*/
        <div style={{paddingLeft: 15}}>
          <div>
            {fragment.children.map((child, index) =>
              <div key={index} style={{marginTop: 4}}>
                {!_.isObject(child) ? child : (
                  <EachTagManager fragment={child} key={index} deepLevel={deepLevel + 1} indexInLevel={index}/>
                )}
              </div>
            )}
          </div>

          {/* ... and the button for adding new child */}
          <div style={{marginTop: 8}}>
            <ButtonAddNewChild onClick={this.addNewChild}>Add child</ButtonAddNewChild>
          </div>
        </div>

        }
      </TagWrapper>
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
        <h4 className={`mb-20`}>HTML manager </h4>
        {template.map((fragment, index) =>
          <EachTagManager fragment={fragment} key={index} indexInLevel={index}/>
        )}
      </div>
    )
  }
}