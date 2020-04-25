import React from 'react'
import {isNil} from 'lodash'
import styled from 'styled-components'
import {Button} from "antd"

const MostOuter = styled.div.attrs(pr => ({
  tabIndex: 0
}))`
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 4px 10px;
  ${pr => pr.isRootOpened && 'z-index: 3'};
  &:focus {
    z-index: 4;
  }
`;

export const ExtendingButton = styled.button`
  padding: 0px 10px;
  margin-left: 10px;
  background-color: #eeeeeeee;
  color: rgba(24, 106, 59, 0.7);
  border-radius: 8px; 
  border: 0;
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
`;

export const ButtonExtendComponent = ExtendingButton
export const ButtonAddNewChild = styled(Button)``

const ValueRow = styled.div`
  margin-left: 10px;
  background-color: #fff;
`;

class ObjectExpander extends React.Component {
  state = {
    hidden: true,
    trackedPaths: []
  }

  hiddenToggle = () => {
    this.setState(state => ({
      hidden: !state.hidden
    }), () => {
      if(this.props.isInitial) {
        this.props.rootSetState({
          isRootOpened: !this.state.hidden
        })
      }
    })
  }

  render() {
    return (
      <span className="w100">
        {
          this.state.hidden
            ? (
                <>{this.props.isArray ? '[]' : '{}'}
                  <ExtendingButton onClick={this.hiddenToggle}>+</ExtendingButton>
                </>
              )
            : (
                <>
                  <ExtendingButton onClick={this.hiddenToggle}>-</ExtendingButton>
                  <div>{this.props.data}</div>
                </>
              )
        }
      </span>
    )
  }
}

const exploreObjectOrArray = (obj) => {
  switch(Array.isArray(obj)) {
    case true: {
      const array = obj
      return (
        <>
          {'['}
          {array.map((value, index)=>
            <ExploreData key={index} data={value} objectKey={index.toString()}/>)}
          {']'}
        </>
      )
    }
    case false:
      return (
        <>
          {'{'}
          {Object.keys(obj).map((key, i, keys) =>
            <ExploreData key={key} data={ obj[key] } objectKey={key} keys={keys}/>)}
          {'}'}
        </>
      )
    // no default
  }
}

const ExploreData = ({data, objectKey, keys, isInitial, rootSetState}) => {
  let res;
  switch(isNil(data)) {
    case true:
      switch(data === undefined) {
        case true:
          res = <span style={{color: 'blue'}}>{  'undefined'  }</span>
          break
        case false:
          res = <span style={{color: 'blue'}}>{  'null'  }</span>
          break
        // no default
      }
      break

    case false:
      switch(typeof data) {
        case 'function':
        case 'number':
        case 'string':
        case 'boolean':
          res = <span style={{color: 'green'}}>{  data.toString()  }</span>
          break
        case 'object':
          res = <ObjectExpander
            rootSetState={rootSetState}
            isInitial={isInitial}
            isArray={Array.isArray(data)}
            data={exploreObjectOrArray(data)}
            objectKey={objectKey}
          />
          break
        default:
          res = <span style={{ color: 'red', fontSize: 24}}>{  'DEFAULT'  }</span>
          break
      }
    // no default
  }

  return (
    <ValueRow>{objectKey || 'no key'}: {res},</ValueRow>
  )
}

class ObjectExplorer extends React.Component {
  state = {
    isRootOpened: false
  }

  render() {
    const data = this.props.children || this.props.data

    return (
      <MostOuter isRootOpened={this.state.isRootOpened}>
        <ExploreData data={data} isInitial={true} objectKey={this.props.objectKey} rootSetState={this.setState.bind(this)}/>
      </MostOuter>
    )
  }
}

export default ObjectExplorer