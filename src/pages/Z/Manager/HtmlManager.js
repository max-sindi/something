import React from "react"
import PropTypes from "prop-types"
import _, {isNull} from "lodash"
import {ButtonExtendComponent, ButtonAddNewChild} from '../../../lib/ObjectExplorer'
import {TagWrapper} from '../styled'
import * as githubIcons from 'react-icons/gi'
import * as gameIcons from 'react-icons/go'
import * as aiIcons from 'react-icons/ai'
import {FaAngleLeft, FaAngleRight, FaEquals, FaRegShareSquare} from 'react-icons/fa'
import {AiOutlineFileAdd} from 'react-icons/ai'
import {AiFillCodeSandboxSquare} from 'react-icons/ai'
// import {FaEquals, IconContext} from 'react-icons'
import {TiArrowForward} from 'react-icons/ti'
import {AiOutlineCodeSandbox} from 'react-icons/ai'
import {RiEditLine, RiPaintBrushLine} from 'react-icons/ri'
import {MdArrowDownward, MdArrowUpward} from 'react-icons/md'
import ClassNamesSelector from '../ClassNamesSelector'

// import subscriber from '../subscriber'
// import ReactSelect from 'react-select'
// import classNamesJson from '../../../_styles.json'

// console.log(312,styleNamesJson)
// const classNamesToSelect = classNamesJson.classNames.map(cls => ({value: cls, label: cls}))

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
    isOpened: true // @todo false
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

    // console.log('template', template)
    // console.log('deepLevel', deepLevel)
    // console.log('indexInLevel', indexInLevel)
    // console.log('parentXpath', parentXpath)
    // console.log('xpath', this.props.xpath)
    // console.log('elem',elem)

    if(!elem) {
      console.warn('no elem, ref to alpha')
      elem = clonedTemplate
    }

    elem.children.push(this.createDiv({children: ['']}))
    // console.log('clonedTemplate after mutation', clonedTemplate)
    this.save(clonedTemplate)

    // const template = await subscriber.template
    // console.log(template)
  }




  save = newState => this.props.save({...this.props.currentState, template: newState})



  createClone = () => {
    return _.cloneDeep(this.props.currentState.template)
  }





  deleteElement = () => this.transformParent(parent => ({...parent, children: parent.children.filter((i, index) => index !== this.props.indexInLevel)}))




  makeItText = () => this.transform('')
  makeItDiv = () => this.transform(this.createDiv)
  changeText = (evt) => this.transform(evt.target.value)
  changeClassName = evt => this.transform((val) => ({...val, className: evt.target.value}))
  wrapWithDiv = () => this.transform(val => ({...this.createDiv(), children: [...this.createDiv().children, val]}))
  moveUpward = () => this.swapElements(this.props.indexInLevel - 1, this.props.indexInLevel)
  moveDownward = () => this.swapElements(this.props.indexInLevel, this.props.indexInLevel + 1 )
  changeClassNamesList = className => this.transform(val => Object.assign(val, {className}))

  swapElements = (first, second) => this.transformParent(parent => {
    const {children} = parent
    const firstElem = children[first]
    const secondElem = children[second]
    children[first] = secondElem
    children[second] = firstElem
    return {...parent, children}
  })


  createDiv = ({children = []} = {}) => ({
    children,
    tag: 'div',
    className: 'newly added'
  })

  transform = (transformer, xpath = this.props.xpath) => {
    // @todo continue
    const clone = this.createClone()
    const firstTwoArgs = [xpath ? clone : {value: clone}, xpath || 'value']

    if(_.isFunction(transformer)) {
      _.updateWith(...firstTwoArgs, transformer)
    } else {
      _.updateWith(...firstTwoArgs, () => transformer)
    }

    this.save(clone)
  }

  transformParent = (transformer) => this.transform(transformer, this.props.parentXpath)



  recursiveRenderChildren = () => (
    this.state.isOpened
    &&
    this.props.fragment.children.map((child, index, arr) =>
      <div key={index} style={{marginTop: 4}}>
        {/*{!_.isObject(child) ? child : (*/}
        <EachTagManager
          {...this.props}
          first={false}
          fragment={child}
          key={index}
          deepLevel={this.props.deepLevel + 1}
          indexInLevel={index}
          parentXpath={this.props.xpath}
          lastInLevel={index === arr.length - 1}
          xpath={`${this.props.xpath}${this.props.xpath ? '.' : ''}children[${index}]`}
        />
        {/*)}*/}
      </div>
    )
  )


  render() {
    // console.log('this.props.currentState' , this.props.currentState)
    const {deepLevel, indexInLevel, first, lastInLevel} = this.props
    const {isOpened} = this.state
    const fragment = this.props.fragment
    const isObject = _.isObject(fragment)
    const blockMinHeight = 215

    if(_.isNull(fragment)) {
      return null
    }

    return (
      <TagWrapper isOpened={isOpened} deepLevel={deepLevel} indexInLevel={indexInLevel} {...this.props}>

        <div className={`flex align-center`}>
          {isOpened
            ? <aiIcons.AiOutlineMinusSquare onClick={this.toggleVisibility} size={30}></aiIcons.AiOutlineMinusSquare>
            : <aiIcons.AiOutlinePlusSquare onClick={this.toggleVisibility} size={30}></aiIcons.AiOutlinePlusSquare>
          }
          {!first && isObject && <span className={`pl-5`}>tag: {fragment.tag}</span>}
        </div>

        {first && isObject && this.recursiveRenderChildren()}


        {/* object elements */}
        {!first && isObject && (
          <>
            <div className={`flex align-center mt-10 pointer`} onClick={this.makeItText} title={'Make it text'}>
              <AiOutlineCodeSandbox size={26} style={{marginRight: 4}}></AiOutlineCodeSandbox>
              <FaEquals size={17} style={{marginTop: 2}}></FaEquals>
              <FaAngleRight size={22} className={'mr-5-minus'} style={{marginLeft: -4}}></FaAngleRight>
              <gameIcons.GoTextSize size={28} style={{marginTop: -2, marginLeft: 6}}></gameIcons.GoTextSize>
            </div>
            {/*<label className={'flex align-center pb-10 pt-10'} >*/}
              {/*<RiPaintBrushLine size={30} className={'mr-5'}></RiPaintBrushLine>*/}
              {/*<input type="text" value={fragment.className} onChange={this.changeClassName} className={`grow-1`} style={{marginTop: 2}}/>*/}
            {/*</label>*/}

            <AiOutlineFileAdd size={30} onClick={this.addNewChild} title={'Add child +'} />

          </>
        )}





        {/* text elements */}
        {!first && !isObject && (
          <>
            <div className="inline-flex flex-center mt-10 pointer" title={'Make it div'} onClick={this.makeItDiv}>
              <gameIcons.GoTextSize size={28} style={{marginTop: -2, marginRight: 3}}></gameIcons.GoTextSize>
              <FaEquals size={17} className={'mr-5-minus'} style={{marginTop: 2}}></FaEquals>
              <FaAngleRight size={22}></FaAngleRight>
              <AiOutlineCodeSandbox size={26}></AiOutlineCodeSandbox>
            </div>

            <label className={`flex align-center pb-10 pt-10 `} >
              <RiEditLine size={25} className={'cursor-default mr-10'}/>
              <input type="text" value={fragment} onChange={this.changeText} className={`grow-1`}/>
            </label>

          </>
        )}


        {/* general actions */}
        {!first && (
          <>
            <githubIcons.GiTrashCan size={'40px'} onClick={this.deleteElement} title={'Delete'}>x</githubIcons.GiTrashCan>
            <FaRegShareSquare className="ml-10" onClick={this.wrapWithDiv} title={'Wrap with div'} size={25} />
            {indexInLevel > 0 && (
              <MdArrowUpward onClick={this.moveUpward} title={`Move Upward`}></MdArrowUpward>
            )}
            {lastInLevel === false && (
              <MdArrowDownward onClick={this.moveDownward} title={`Move Downward`}></MdArrowDownward>
            )}
          </>
        )}


        {!first && isObject && (
          <div className={`pt-5 pb-5`}>
            <ClassNamesSelector onChange={this.changeClassNamesList} value={fragment.className}></ClassNamesSelector>
            {this.recursiveRenderChildren()}
          </div>
        )}

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
            first={true}
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