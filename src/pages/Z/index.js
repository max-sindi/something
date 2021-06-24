import React from 'react'
import Subscriber from './subscriber'
import RenderState from './RenderState'
import Manager from './Manager/StateTreeManager'
import {connect} from 'react-redux'
import _ from 'lodash'



const connectArgs = [
  null,
  null
]

const initialSelectingState = {
  updateInterval: null,
  mouseX: null,
  mouseY: null,
  startX: null,
  startY: null,
}
const initialMouseCoords = {
  X:null,
  Y:null
}

class Z extends React.Component {

  state = {...initialSelectingState, currentState: null}
  mouseCoords = {...initialMouseCoords}

  get mouseX() {
    return this.state.mouseX && (this.state.mouseX - 300)
  }
  get mouseY() {
    return this.state.mouseX && this.state.mouseY
  }

  api = {
    update: async data => {
      return this.props
        .dispatch({
          type: 'UPDATE_STATE', request: { url: '/z', method: 'post', data }
        })
        // .then(({ data: currentState }) => this.setState({ currentState }))
    },

    getCurrentState: (data) => {
      return this.props.dispatch({
        type: 'GET_CURRENT_STATE', request: { url: '/z' }
      })
    }
  }



  componentDidMount = () => {
    // const currentState = await subscriber.subscribe()
    const {dispatch} = this.props
    const api = this.api;
    (async() => {
      // const subscriber = new Subscriber({api})
      const {data: currentState} = await api.getCurrentState()
      // const updateResult = await api.update(currentState)
      // console.log('currentState', currentState)
      this.setState({currentState})
    //
    })()

  }

  saveState = _.debounce(() => {
    this.api.update(this.state.currentState)
  }, 1000)

  updateState = (newState) => {
    // update local state, and then remote state
    this.setState(cur => ({...cur, currentState: newState}), this.saveState)
  }
  //
  //
  // startSelect = evt => {
  //   const {clientY} = evt
  //   const clientX = evt.clientX - 300 // - 300 sidebar width for now
  //   this.mouseCoords = {...initialMouseCoords}
  //   this.setState(state => ({...state, ...initialSelectingState, startX: clientX, startY: clientY}))
  //   this.startHuntTheValue()
  // }
  //
  // startHuntTheValue = () => {
  //   const updateInterval = setInterval(() => this.setState({
  //     mouseX: this.mouseCoords.X,
  //     mouseY: this.mouseCoords.Y
  //   }),30)
  //
  //   this.setState({updateInterval})
  //   window.addEventListener('mousemove', this.mouseMoveHandler)
  // }
  //
  //  mouseMoveHandler = evt => {
  //   this.mouseCoords.X = evt.clientX
  //   this.mouseCoords.Y = evt.clientY
  // }
  //
  // stopSelect = () => {
  //   this.setState(st => st.updateInterval && (clearInterval(st.updateInterval) || ({...st, updateInterval: null})))
  //   window.removeEventListener('mousemove', this.mouseMoveHandler)
  //   saveElement()
  //
  //   // start collect results of area selecting
  //   function saveElement() {
  //   }
  // }

  // get getFrameDimentions() {
  //   const {state} = this
  //   const XDiff = this.mouseX - state.startX
  //   const YDiff = this.mouseY - state.startY
  //   const isWidthPositive = XDiff >= 0
  //   const isHeightPositive = YDiff >= 0
  //   // console.log(Math.abs(XDiff), Math.abs(YDiff))
  //
  //   return {
  //     top: isHeightPositive? state.startY : this.mouseY,
  //     left: isWidthPositive ? state.startX : this.mouseX,
  //     width: this.mouseX ? Math.abs(XDiff) : 0,
  //     height: this.mouseY ? Math.abs(YDiff) : 0
  //   }
  // }

  render() {
    const {state} = this
    return (
      <div onMouseDown={this.startSelect} onMouseUp={this.stopSelect} className={`h-100-vh w-100-p relative`} style={{background: '#98387444'}}>
        {/*startY:{ state.startY}, startX: {state.startX}, <br/>*/}
        {/*mouseY: {this.mouseY},  mouseX: {this.mouseX},*/}
        {/*<div style={{position: 'absolute', ...this.getFrameDimentions, background: '#ff7341f5'}}/>*/}

        {/* render current markup */}
        {state.currentState && <RenderState currentState={state.currentState}/>}

        {/* render tools */}
        {state.currentState && <Manager save={this.updateState} currentState={state.currentState}/>}

        {/*<button onClick={this.saveState} className={`fixed t-60 r-40`}>*/}
        {/*  Save*/}
        {/*</button>*/}
      </div>
    )
  }
}

export default connect(...connectArgs)(Z)