import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {TagWrapper} from "./TagManager/styled";
import * as aiIcons from "react-icons/ai";
import {AiOutlineCodeSandbox, AiOutlineFileAdd} from "react-icons/ai";
import {FaAngleRight, FaEquals, FaRegWindowClose} from "react-icons/fa"
import * as gameIcons from "react-icons/go";
import {RiEditLine} from "react-icons/ri";
import * as githubIcons from "react-icons/gi";
import {MdArrowDownward, MdArrowUpward} from "react-icons/md";
import ClassNamesSelector from "./TagManager/ClassNamesSelector";
import ObjectEditor from "./TagManager/ObjectEditor"
import {generateColor, transparentColor} from '../../utils'
import SVGBlockToText from '../../components/svg/BlockToText'
import Tooltip from 'rc-tooltip'
import {closePopup} from './hook/popup'

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
    toggleVisibility = () => this.setState(state => ({ isOpened: !state.isOpened }))
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
            console.warn('no element found, ref to alpha')
            elem = clonedTemplate
        }

        elem.children.push(this.createDiv({children: ['']}))
        // console.log('clonedTemplate after mutation', clonedTemplate)
        this.save(clonedTemplate)
    }

    transformParent = (transformer) => this.transform(transformer, this.props.parentXpath)
    save = newState => this.props.save({...this.props.currentState, template: newState})
    createClone = () => _.cloneDeep(this.props.currentState.template)
    deleteElement = () => this.transformParent(parent => ({...parent, children: parent.children.filter((i, index) => index !== this.props.indexInLevel)}))
    makeItText = () => this.transform('')
    makeItDiv = () => this.transform(this.createDiv)
    changeText = (evt) => this.transform(evt.target.value)
    changeClassName = evt => this.transform((val) => ({...val, className: evt.target.value}))
    changeClassNamesList = className => this.transform(val => Object.assign(val, {className}))
    wrapWithDiv = () => this.transform(val => ({...this.createDiv(), children: [...this.createDiv().children, val]}))
    moveUpward = () => this.swapElements(this.props.indexInLevel - 1, this.props.indexInLevel)
    moveDownward = () => this.swapElements(this.props.indexInLevel, this.props.indexInLevel + 1 )
    swapElements = (firstIndex, secondIndex) => this.transformParent(parent => {
        const {children} = parent
        const firstElement = children[firstIndex]
        const secondElement = children[secondIndex]
        children[firstIndex] = secondElement
        children[secondIndex] = firstElement
        return {...parent, children}
    })
    onNameChange = ({target: {value: name}}) => this.transform(old => ({ ...old, name }))
    onAttrsChange = ({target: {value: attrs}}) => this.transform(old => ({ ...old, attrs }))
    createDiv = ({children = []} = {}) => ({
        children,
        tag: 'div',
        className: '_debug__newly_added',
        name: '',
        attrs: '{}'
    })
    duplicateNode = () => this.transformParent(parent => ({
        ...parent,
        children: [...parent.children, _.cloneDeep(parent.children[this.props.indexInLevel])]
    }))
    createFieldUpdater = (path) => value => this.transform(old => ({ ...old, [path]: value }))
    // updater passes to lodash.updateWith 3d arg and mutates current node
    transform = (updater, xpath = this.props.xpath) => {
        // @todo continue
        const clone = this.createClone()
        const firstTwoArgs = [
            xpath ? clone : { value: clone },
            xpath || 'value'
        ]

        // @todo refactor with "? :" in 3rd argument
        if(_.isFunction(updater)) {
            _.updateWith(...firstTwoArgs, updater)
        } else {
            _.updateWith(...firstTwoArgs, () => updater)
        }

        this.save(clone)
    }

    tags = ['div', 'span', 'input', 'img', 'a', 'button']
    onTagSelect = ({target: {value: tag}}) => this.transform(node => ({ ...node, tag }))
    // renderTagSelect = () => (
    //     <select value={this.props.fragment.tag} onChange={this.onTagSelect}>
    //         {this.tags.map(tag => (
    //             <option value={tag} label={tag} key={tag}/>
    //         ))}
    //     </select>
    // )
    rendererTagSelect = () => (
      <select value={this.props.fragment.tag} onChange={this.onTagSelect}>
          {this.tags.map(tag => (
            <option value={tag} label={tag} key={tag}/>
          ))}
      </select>
    )

    recursiveRenderChildren = () => (
      this.state.isOpened
      &&
      this.props.fragment.children.map((child, index, arr) =>
        <div key={index} className={`mt-5 w-100-p`}>
            {!_.isObject(child) ? child : (
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
            )}
        </div>
      )
    )
    stylesExisting = [
        {
            name: 'backgroundImage',
            fileSelectable: true,
            fileValueCreator: fileName => `url('http://localhost:8000${fileName}')`
        }
    ]

    componentDidMount() {
        console.log('Mounted')
    }

    render() {
        if(_.isNull(this.props.fragment)) return null
        const {deepLevel, indexInLevel, first, lastInLevel, fragment, popup, setPopup} = this.props
        const {isOpened} = this.state
        const isObject = _.isObject(fragment)
        const color = "#fff"

        if(popup.fragment !== fragment) {
            return this.recursiveRenderChildren()
        }

        return (
          <TagWrapper isOpened={isOpened} deepLevel={deepLevel} indexInLevel={indexInLevel} popup={popup} {...this.props}>
              <div className={`relative flex flex-wrap align-center w-100-p pr-10`}>

                  <div className={`w-100-p pl-5 pb-10`}>
                      Deep index: {deepLevel}.
                      Level index: {indexInLevel}. <br/>
                      _______________________________________
                  </div>

                  {/* Close Popup */}
                  <FaRegWindowClose onClick={() => closePopup(setPopup)} size={20} className={`pointer absolute r-3 t-3 z-index-5`}/>


                  {/* Toggle expand */}
                  {isOpened
                    ? <aiIcons.AiOutlineMinusSquare onClick={this.toggleVisibility} size={15}/>
                    : <aiIcons.AiOutlinePlusSquare onClick={this.toggleVisibility} size={15}/>
                  }

                  {/* Tag */}
                  <div className={`flex align-center`}>{!first && isObject &&
                    <>
                        <div className={`mr-5 ml-5`}>Tag:</div>
                        {this.rendererTagSelect()}
                    </>
                  }</div>


                  {/* Object elements */}
                  {!first && isObject && (
                    <>
                        {/* Make text */}
                        <Tooltip overlay={'Make it text'} placement={`top`}>
                            <SVGBlockToText onClick={this.makeItText} color={'#fff'} className={'pointer ml-15'} title={"Make it text"}/>
                        </Tooltip>

                        <div className="w-100-p flex align-center mt-5">
                            Name:
                            <textarea value={fragment.name || ''} onChange={this.onNameChange} rows={1} className={`grow-1 ml-5`}/>
                        </div>


                        <label className={'flex align-flex-end w-100-p mt-5 mb-5'} >
                            {/*<RiPaintBrushLine size={30} className={'mr-5'} />*/}
                            <span className={`mr-10`}>Class: </span>
                            <textarea value={fragment.className} onChange={this.changeClassName} rows={1} className={`grow-1 w-200`} />
                        </label>
                        <div className={`w-100-p flex align-center`}>
                            <div className="mr-15">Attrs: </div>
                            <textarea value={fragment.attrs || ''} onChange={this.onAttrsChange} className={`w-200 grow-1`} rows={1}/>
                        </div>
                        _____________________________________________

                        <div className={`flex align-center h-40`}>
                            <Tooltip placement={`top`} overlay={'Add Child'}>
                                <AiOutlineFileAdd size={25} onClick={this.addNewChild} title={'Add child +'} className={`mr-10`} />
                            </Tooltip>

                            <Tooltip placement={`top`} overlay={`Duplicate`}>
                                <div className={`pointer`} onClick={this.duplicateNode}>
                                  1 + 1
                                </div>
                            </Tooltip>
                        </div>
                    </>
                  )}

                  {/* text elements */}
                  {!first && !isObject && (
                    <>
                        {/* Make it div */}
                        <SVGBlockToText onClick={this.makeItDiv} className={`pointer`} style={{ transform: 'scaleX(-1' }} />
                    </>
                  )}


                  {/* general actions */}
                  {!first && (
                    <div className={`flex align-center h-40`}>
                        {/* Delete */}
                        <githubIcons.GiTrashCan onClick={this.deleteElement} title={'Delete'} size={23} className={`ml-5 mr-5`}>x</githubIcons.GiTrashCan>
                        {/* Wrap with div */}
                        <Tooltip overlay={'Wrap with div'} placement={`top`}>
                            <img
                              src={process.env.PUBLIC_URL + '/wrap-with-div.svg'}
                              title={'Wrap with div'}
                              onClick={this.wrapWithDiv}
                              className={"pointer mr-5 ml-5"}
                            />
                        </Tooltip>
                        {/* Move upward in level */}
                        {indexInLevel > 0 && (
                          <Tooltip overlay={`Move Upward`} placement={`top`}>
                            <MdArrowUpward onClick={this.moveUpward} title={`Move Upward`} size={25}/>
                          </Tooltip>
                        )}
                        {/* Move downward in level */}
                        {lastInLevel === false && (
                          <Tooltip overlay={`Move Downward`} placement={`top`}>
                            <MdArrowDownward onClick={this.moveDownward} title={`Move Downward`} size={25}/>
                          </Tooltip>
                        )}
                    </div>
                  )}
              </div>
              _______________________________________________
              {!first && isObject && (
                <>
                    <div className={`pt-5 pb-5 mt-10`}>
                        <div>
                            <ClassNamesSelector onChange={this.changeClassNamesList} value={fragment.className}/>
                        </div>
                        <ObjectEditor
                          onChange={this.createFieldUpdater('style')}
                          value={fragment.style}
                          fields={this.stylesExisting}
                          title={'Styles: '}
                        />
                        {this.recursiveRenderChildren()}
                    </div>
                </>
              )}
              {/* Children  */}
              {first && isObject && this.recursiveRenderChildren()}

          </TagWrapper>
        )
    }
}

export default EachTagManager