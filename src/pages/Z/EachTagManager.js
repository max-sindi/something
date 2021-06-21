import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {TagWrapper} from "./styled";
import * as aiIcons from "react-icons/ai";
import {AiOutlineCodeSandbox, AiOutlineFileAdd} from "react-icons/ai";
import {FaAngleRight, FaEquals} from "react-icons/fa";
import * as gameIcons from "react-icons/go";
import {RiEditLine, RiPaintBrushLine} from "react-icons/ri";
import * as githubIcons from "react-icons/gi";
import {MdArrowDownward, MdArrowUpward} from "react-icons/md";
import ClassNamesSelector from "./ClassNamesSelector";

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
            console.warn('no elem, ref to alpha')
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
    createDiv = ({children = []} = {}) => ({
        children,
        tag: 'div',
        className: '_debug__newly_added'
    })
    // transformer is passing to lodash.updateWith and mutates current node
    transform = (transformer, xpath = this.props.xpath) => {
        // @todo continue
        const clone = this.createClone()
        const firstTwoArgs = [
            xpath ? clone : { value: clone },
            xpath || 'value'
        ]

        if(_.isFunction(transformer)) {
            _.updateWith(...firstTwoArgs, transformer)
        } else {
            _.updateWith(...firstTwoArgs, () => transformer)
        }

        this.save(clone)
    }

    tags = ['div', 'span', 'input']
    onTagSelect = ({ target: { value: tag }}) => this.transform(node => ({ ...node, tag }))
    renderTagSelect = () => (
        <select value={this.props.fragment.tag} onChange={this.onTagSelect}>
            {this.tags.map(tag => (
                <option value={tag} label={tag} />
            ))}
        </select>
    )
    recursiveRenderChildren = () => (
        this.state.isOpened
        &&
        this.props.fragment.children.map((child, index, arr) =>
            <div key={index} className={`mt-5`}>
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
        const {deepLevel, indexInLevel, first, lastInLevel} = this.props
        const {isOpened} = this.state
        const fragment = this.props.fragment
        const isObject = _.isObject(fragment)

        if(_.isNull(fragment)) {
            return null
        }

        return (
            <TagWrapper isOpened={isOpened} deepLevel={deepLevel} indexInLevel={indexInLevel} {...this.props}>
                <div className={`flex align-center`}>
                    {isOpened
                        ? <aiIcons.AiOutlineMinusSquare onClick={this.toggleVisibility} size={15}/>
                        : <aiIcons.AiOutlinePlusSquare onClick={this.toggleVisibility} size={15}/>
                    }
                    {!first && isObject && <span className={`pl-5`}>tag: {this.renderTagSelect()}</span>}
                </div>

                {first && isObject && this.recursiveRenderChildren()}

                <div className={`d-flex align-center`}>
                    {/* object elements */}
                    {!first && isObject && (
                        <>
                            <div className={`flex align-center mt-10 pointer`} onClick={this.makeItText} title={'Make it text'}>
                                <AiOutlineCodeSandbox size={15} style={{marginRight: 4}}/>
                                <FaEquals size={15} style={{marginTop: 2}}/>
                                <FaAngleRight size={15} className={'mr-5-minus'} style={{marginLeft: -4}}/>
                                <gameIcons.GoTextSize size={15} style={{marginTop: -2, marginLeft: 6}}/>
                            </div>
                            <label className={'flex align-center pb-10 pt-10'} >
                            <RiPaintBrushLine size={30} className={'mr-5'}/>
                            <input type="text" value={fragment.className} onChange={this.changeClassName} className={`grow-1`} style={{marginTop: 2}}/>
                            </label>

                            <AiOutlineFileAdd size={15} onClick={this.addNewChild} title={'Add child +'} />

                        </>
                    )}

                    {/* text elements */}
                    {!first && !isObject && (
                        <>
                            <div className="inline-flex flex-center mt-10 pointer" title={'Make it div'} onClick={this.makeItDiv}>
                                <gameIcons.GoTextSize size={15} />
                                <FaEquals size={17} className={'mr-5-minus'} />
                                <FaAngleRight size={15}/>
                                <AiOutlineCodeSandbox size={15}/>
                            </div>

                            <label className={`flex align-center pb-10 pt-10 `} >
                                <RiEditLine size={15} className={'cursor-default mr-10'}/>
                                <textarea type="text" value={fragment} onChange={this.changeText} className={`grow-1`}/>
                            </label>

                        </>
                    )}


                    {/* general actions */}
                    {!first && (
                        <>
                            <githubIcons.GiTrashCan size={23} onClick={this.deleteElement} title={'Delete'}>x</githubIcons.GiTrashCan>
                            <img
                                src={process.env.PUBLIC_URL + 'wrap.svg'}
                                title={'Wrap with div'}
                                onClick={this.wrapWithDiv}
                                className={"pointer"}
                            />
                            {indexInLevel > 0 && (
                                <MdArrowUpward onClick={this.moveUpward} title={`Move Upward`}/>
                            )}
                            {lastInLevel === false && (
                                <MdArrowDownward onClick={this.moveDownward} title={`Move Downward`}/>
                            )}
                        </>
                    )}

                </div>
                {!first && isObject && (
                    <div className={`pt-5 pb-5`}>
                        <ClassNamesSelector onChange={this.changeClassNamesList} value={fragment.className}/>
                        {this.recursiveRenderChildren()}
                    </div>
                )}

            </TagWrapper>
        )
    }
}

export default EachTagManager