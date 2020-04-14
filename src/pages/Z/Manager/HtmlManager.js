import React from "react"
import PropTypes from "prop-types"
import _ from "lodash"
import {ButtonExtendComponent, ButtonAddNewChild} from '../../../lib/ObjectExplorer'
import {TagWrapper} from '../styled'
import subscriber from '../subscriber'

window.lodash = _

const expandedLog = (function(){
  var MAX_DEPTH = 100;

  return function(item, depth){

    depth = depth || 0;

    if (depth > MAX_DEPTH ) {
      console.log(item);
      return;
    }

    if (_.isObject(item)) {
      _.each(item, function(value, key) {
        console.group(key + ' : ' +(typeof value));
        expandedLog(value, depth + 1);
        console.groupEnd();
      });
    } else {
      console.log(item);
    }
  }
})();


class EachTagManager extends React.Component {
  state = {
    isOpened: false
  }
  static propTypes = {
    indexInLevel: PropTypes.number,
    deepLevel: PropTypes.number,
    parentXpath: PropTypes.string,
    xpath: PropTypes.string,
  }

  static defaultProps = {
    deepLevel: 0,
  }

  get breadcrumbsInTree() {
    return this.props.breadcrumbs
  }

  // get xpath() {
  //   return `${this.props.parentXpath}.children[${this.props.indexInLevel}]`
  // }




  toggleVisibility = () => this.setState(st => ({ isOpened: !st.isOpened }))



  addNewChild = async () => {
    const {currentState, save, deepLevel, indexInLevel, parentXpath, xpath} = this.props
    const {template} = currentState
    const clonedTemplate = this.createClone()
    let elem = _.get(clonedTemplate, xpath);

    console.log('template', template)
    console.log('deepLevel', deepLevel)
    console.log('indexInLevel', indexInLevel)
    console.log('parentXpath', parentXpath)
    console.log('xpath', this.props.xpath)
    console.log('elem',elem)

    if(!elem) {
      console.warn('no elem, ref to alpha')
      elem = clonedTemplate
    }

    elem.children.push({
      children: [],
      tag: 'div',
      className: 'newly added'
    })
    console.log('clonedTemplate after mutation', clonedTemplate)
    this.save(clonedTemplate)

    // const template = await subscriber.template
    // console.log(template)
  }




  save = newState => this.props.save({...this.props.currentState, template: newState})



  createClone = () => {
    return _.cloneDeep(this.props.currentState.template)
  }





  deleteElement = () => {
    const clone = this.createClone()
    const parent = _.get(clone, this.props.parentXpath)
    delete parent[this.props.indexInLevel]
    console.log('clone',clone)
    debugger
    this.save(clone)
  }

  render() {
    const {deepLevel, indexInLevel} = this.props
    const {isOpened} = this.state
    const fragment = this.props.fragment
    return (
      <TagWrapper isOpened={isOpened} deepLevel={deepLevel} indexInLevel={indexInLevel}>
        {/* display tag name */}
        <div>tag: {fragment.tag}</div>
        <div>deepLevel: {deepLevel}</div>
        <div>xpathttttttttttt: {this.props.xpath}</div>
        <div>parentXpath: {this.props.parentXpath}</div>
        <div className={`flex`}>
          <ButtonExtendComponent onClick={this.toggleVisibility}>{isOpened ? '-' : '+'}</ButtonExtendComponent>
          <div className="ml-a">
            <button onClick={this.deleteElement}>x</button>
          </div>
        </div>

        {isOpened &&

          /* display children and ...*/
          <div style={{paddingLeft: 15}}>
            <div style={{border: '1px solid #234589'}}>
              {fragment.children.map((child, index) =>
                <div key={index} style={{marginTop: 4}}>
                  {!_.isObject(child) ? child : (
                    <EachTagManager
                      {...this.props}
                      fragment={child}
                      key={index}
                      deepLevel={deepLevel + 1}
                      indexInLevel={index}
                      parentXpath={this.props.xpath}
                      xpath={`${this.props.xpath}${this.props.xpath ? '.' : ''}children[${index}]`}
                    />
                  )}
                </div>
              )}
            </div>

            {/* ... and the button for adding new child */}
            <div style={{marginTop: 8, marginLeft: 10}}>
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
        {/*{template.map((fragment, index) =>*/}
          <EachTagManager
            fragment={template}
            key={0}
            indexInLevel={0}
            parentXpath={``}
            xpath={``}
            {...this.props}
          />
        {/*)}*/}
      </div>
    )
  }
}