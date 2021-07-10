import React from "react"
import PropTypes from "prop-types"
import _ from "lodash"
import EachTagManager from './EachTagManager'
import {ButtonExtendComponent, ButtonAddNewChild} from '../../lib/ObjectExplorer'
import {TagWrapper} from './TagManager/styled'
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
import ClassNamesSelector from './TagManager/ClassNamesSelector'

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
      // console.log(item);
      return;
    }

    if (_.isObject(item)) {
      _.each(item, function(value, key) {
        console.group(key + ' : ' +(typeof value));
        expandedLog(value, depth + 1);
        console.groupEnd();
      });
    } else {
      // console.log(item);
    }
  }
})();


export default class HtmlManager extends React.Component {
  static propTypes = {
    currentState: PropTypes.object,
  }

  render() {
    const template = _.get(this.props.currentState, 'template')

    return (
      <div className={"html-manager"}>
        {/*<h4 className={`mb-20`}>HTML manager </h4>*/}
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