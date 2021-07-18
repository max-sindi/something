import React from "react"
import PropTypes from "prop-types"
import _ from "lodash"
import {TagWrapper} from "./TagManager/styled"
import * as aiIcons from "react-icons/ai"
import {AiOutlineFileAdd} from "react-icons/ai"
import {FaRegWindowClose} from "react-icons/fa"
import {MdArrowDownward, MdArrowUpward} from "react-icons/md"
import ClassNamesSelector from "./TagManager/ClassNamesSelector"
import ObjectEditor from "./TagManager/ObjectEditor"
import SVGBlockToText from '../../components/svg/BlockToText'
import Tooltip from 'rc-tooltip'
import {closePopup} from './hook/popup'
import { v4 as uuid } from 'uuid'

class EachTagManager extends React.Component {
    state = {
        isOpened: true, // @todo false
        localFragmentState: null // local state for improving performance
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
    get fragment() {
        return this.state.localFragmentState
    }
    componentDidMount() {
        console.log('Mounted')
        this.setState(old => ({...old, localFragmentState: this.props.fragment}))
    }

    createFieldUpdater = (path) => value => this.transform(old => ({ ...old, [path]: value }))
    toggleVisibility = () => this.setState(state => ({ isOpened: !state.isOpened }))
    addNewChild = async (creator = () => this.createNode()) =>
      this.transform(node => ({...node, children: [...node.children, creator()]}))
    transformParent = (transformer) => this.transform(transformer, this.props.parentXpath)
    deleteElement = () => this.transformParent(parent => ({...parent,
        children: parent.children.filter((i, index) => index !== this.props.indexInLevel)}))
    makeItText = () => this.transform('')
    makeItDiv = () => this.transform(node => this.createNode())
    changeText = (evt) => this.transform(evt.target.value)
    changeClassName = evt => this.transform((val) => ({...val, className: evt.target.value}))
    changeClassNamesList = className => this.transform(val => ({...val, className}))
    wrapWithDiv = () => this.transform(node => ({...this.createNode(), children: [node]}))
    wrapChildren = () => this.transform(node => ({...node, children: [this.createNode(this.fragment.children)]}))
    setOnParent = () => this.transformParent(node => ({...this.state.localFragmentState, children: node.children.filter((item, index) => index !== this.props.indexInLevel)}))
    moveUpward = () => this.swapElements(this.props.indexInLevel - 1, this.props.indexInLevel)
    moveDownward = () => this.swapElements(this.props.indexInLevel, this.props.indexInLevel + 1)
    swapElements = (firstIndex, secondIndex) => this.transformParent(parent => {
        const {children: childrenOriginal} = parent
        const children = _.clone(childrenOriginal)
        const firstElement = children[firstIndex]
        const secondElement = children[secondIndex]
        children[firstIndex] = secondElement
        children[secondIndex] = firstElement
        return {...parent, children}
    })
    onNameChange = ({target: {value: name}}) => this.transform(node => ({ ...node, name }))
    onAttrsChange = ({target: {value: attrs}}) => this.transform(node => ({ ...node, attrs }))
    setCurrentState = _.debounce( (...args) => _.setWith(...args), 1000)
    save = _.debounce(() => this.props.save(this.props.currentState), 1200)
    onTagSelect = ({target: {value: tag}}) => this.transform(node => ({...node, tag}))
    onParentClick = () => this.props.setPopup(old => ({ ...old, fragment: _.get(this.props.currentState.template, this.props.parentXpath)}))
    onFocusInspectClick = () => this.props.setPopup(old => ({ ...old, fragment: this.fragment}))
    onHightlight = () => this.props.setPopup(old => ({ ...old, highlightFragment: this.fragment}))
    cloneDeepWithUniqueId = (data) => _.cloneDeepWith(data, target => ({...target, id: uuid()}))
    createNode = (children = []) => ({
        children,
        tag: 'div',
        className: '',
        name: '',
        attrs: {},
        id: uuid()
    })
    duplicateNode = () => this.transformParent(parent => {
        return ({
            ...parent,
            children: [...parent.children, this.cloneDeepWithUniqueId(parent.children[this.props.indexInLevel])]
        })
    })
    transform = (updater, xpath = this.props.xpath) => {
        const isParentTransform = xpath === this.props.parentXpath
        const firstTwoArgs = [
            this.props.currentState,
            `template${xpath ? `.${xpath}` : ''}`
        ]

        const newValue = _.isFunction(updater) ? updater(_.get(...firstTwoArgs)) : updater

        const setStateCb = old => {
            return ({...old, localFragmentState: newValue})
        }

        if(isParentTransform) {
            this.props.parentSetState(setStateCb)
        } else {
            this.setState(setStateCb)
        }

        this.setCurrentState(...firstTwoArgs, newValue, undefined)
        this.save()
    }

    rendererTagSelect = () => (
      <select value={this.fragment.tag} onChange={this.onTagSelect}>
          {this.tags.map(tag => (
            <option value={tag} label={tag} key={tag}/>
          ))}
      </select>
    )

    recursiveRenderChildren = () => {
        // if(!this.state.localFragmentState.children) debugger
        return (
          this.state.isOpened
          &&
          (this.state.localFragmentState.children || []).map((child, index, arr) =>
            <div key={index} className={`mt-5 w-100-p`}>
                <EachTagManager
                  {...this.props}
                  first={false}
                  fragment={child}
                  key={child.id || String(this.props.deepLevel) + String(this.props.indexInLevel)}
                  deepLevel={this.props.deepLevel + 1}
                  indexInLevel={index}
                  parentXpath={this.props.xpath}
                  lastInLevel={index === arr.length - 1}
                  xpath={`${this.props.xpath}${this.props.xpath ? '.' : ''}children[${index}]`}
                  parentSetState={this.setState.bind(this)}
                />
            </div>
          )
        )
    }
    stylesExisting = [
        {
            name: 'backgroundImage',
            withFile: true,
            fileValueCreator: fileName => `url('http://localhost:8000${fileName}')`
        },
        {
            name: 'backgroundColor',
            withVariable: true
        },
        {
            name: 'borderColor',
            withVariable: true
        }
    ]

    attrsExisting = [
        {
            name: 'src',
            withFile: true,
            fileValueCreator: fileName => `http://localhost:8000${fileName}`
        },
        {
            name: 'title',
        },
        {
            name: 'href',
        },
    ]

    tags = ['div', 'span', 'input', 'img', 'a', 'button']

    render() {
        if(_.isNull(this.fragment)) return null

        const {deepLevel, indexInLevel, first, lastInLevel, popup, setPopup, parentXpath} = this.props
        const {fragment} = this
        const {isOpened} = this.state
        const isObject = _.isObject(fragment)

        return (
          <TagWrapper isOpened={isOpened} deepLevel={deepLevel} indexInLevel={indexInLevel} popup={popup} {...this.props}>
              <div className={`relative flex flex-wrap align-center w-100-p pr-30`}>

                  <div className={`flex align-center w-100-p pl-5 pb-10`}>
                      <div>Deep index: {deepLevel}.</div>
                      <div>Level index: {indexInLevel}.</div>
                      {parentXpath && <button className={`ml-20 black pointer fz-13`} onClick={this.onParentClick}>Parent</button>}
                      <button className={`ml-20 black pointer fz-13`} onClick={this.onFocusInspectClick}>Focus</button>
                      <button className={`ml-20 black pointer fz-13`} onClick={this.onHightlight}>Hightlight</button>
                  </div>

                  {/* Close Popup */}
                  <FaRegWindowClose onClick={() => closePopup(setPopup)} size={20} className={`pointer absolute r-3 t-3 z-index-5`}/>


                  {/* Toggle expand */}
                  {isOpened
                    ? <aiIcons.AiOutlineMinusSquare onClick={this.toggleVisibility} size={15}/>
                    : <aiIcons.AiOutlinePlusSquare onClick={this.toggleVisibility} size={15}/>
                  }

                  {/* Tag */}
                  <div className={`flex align-center`}>
                    {!first && isObject &&
                        <>
                            <div className={`mr-5 ml-5`}>Tag:</div>
                            {this.rendererTagSelect()}
                        </>
                      }
                  </div>


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

                        {/*<div className={`w-100-p flex align-center`}>*/}
                        {/*    <div className="mr-15">Attrs: </div>*/}
                        {/*    <textarea value={fragment.attrs || ''} onChange={this.onAttrsChange} className={`w-200 grow-1`} rows={1}/>*/}
                        {/*</div>*/}
                        {/*_____________________________________________*/}

                        <div className={`flex align-flex-end h-40`}>
                            <Tooltip overlay={'Add block'} placement={`top`}>
                                <AiOutlineFileAdd size={22} onClick={() => this.addNewChild()} title={'Add block +'} className={`mr-10 pointer`} style={{ marginBottom: 2 }} />
                            </Tooltip>
                            <Tooltip overlay={'Add text'} placement={`top`}>
                                <div onClick={() => this.addNewChild(() => '')} title={'Add text +'} className={`mr-10 pointer`} style={{ marginBottom: 2 }} >+ A</div>
                            </Tooltip>

                            <Tooltip overlay={`Duplicate`} placement={`top`}>
                                <img
                                  src={process.env.PUBLIC_URL + '/duplicate-node.svg'}
                                  onClick={this.duplicateNode}
                                  className={"pointer mr-5 ml-5 w-30 h-30"}
                                />
                            </Tooltip>
                        </div>
                    </>
                  )}

                  {/* text elements */}
                  {!first && !isObject && (
                    <>
                        {/* Make it div */}
                        <SVGBlockToText onClick={this.makeItDiv} className={`pointer mr-10 ml-10`} style={{ transform: 'scaleX(-1' }} color={'#fff'} />
                        <textarea onChange={this.changeText} className={`h-60`} rows="1" value={fragment} />
                    </>
                  )}


                  {/* general actions */}
                  {!first && (
                    <div className={`flex align-flex-end h-40`}>
                        {/* Delete */}

                        <Tooltip overlay={'Delete'} placement={`top`}>
                            <img
                              src={process.env.PUBLIC_URL + '/trash.svg'}
                              className={"pointer mr-5 ml-5 w-35 h-35"}
                              onClick={this.deleteElement}
                            />
                        </Tooltip>
                        {/* Wrap with div */}
                        <Tooltip overlay={'Wrap with div'} placement={`top`}>
                            <img
                              src={process.env.PUBLIC_URL + '/wrap-with-div.svg'}
                              onClick={this.wrapWithDiv}
                              className={"pointer mr-5 ml-5 w-25 h-25"}
                            />
                        </Tooltip>
                        {/* Wrap children */}
                        <Tooltip overlay={'Wrap children'} placement={`top`}>
                            <img
                              src={process.env.PUBLIC_URL + '/wrap-children.svg'}
                              onClick={this.wrapChildren}
                              className={"pointer mr-5 ml-5 w-25 h-25"}
                            />
                        </Tooltip>

                        {/* Set on parent */}
                        <Tooltip overlay={'Set on parent'} placement={`top`}>
                            <img
                              src={process.env.PUBLIC_URL + '/set-on-parent.svg'}
                              onClick={this.setOnParent}
                              className={"pointer mr-5 ml-5 w-25 h-25"}
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
              {/*_______________________________________________*/}
              {!first && isObject && (
                <>
                    <div className={`pt-5 pb-5 mt-10`}>
                        <div className={`flex`}>
                            <ClassNamesSelector onChange={this.changeClassNamesList} value={fragment.className}/>
                            <textarea value={fragment.className} onChange={this.changeClassName} rows={2} className={`grow-1 w-200`} />
                        </div>
                        <ObjectEditor
                          onChange={this.createFieldUpdater('style')}
                          value={fragment.style}
                          fields={this.stylesExisting}
                          title={'Styles: '}
                        />
                        <ObjectEditor
                          onChange={this.createFieldUpdater('attrs')}
                          value={fragment.attrs}
                          fields={this.attrsExisting}
                          title={'Attri-butes: '}
                        />
                        {/*<div className={`w-100-p`}>______________________________</div>*/}
                        <div className={``}>
                            <div className={`fz-17 mr-20 pt-5 bold`}>Content: </div>
                            {this.recursiveRenderChildren()}
                        </div>
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