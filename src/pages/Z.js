import React from 'react'

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

export default class Z extends React.Component {

  state = {...initialSelectingState}
  mouseCoords = {...initialMouseCoords}

  get mouseX() {
    return this.state.mouseX && (this.state.mouseX - 300)
  }
  get mouseY() {
    return this.state.mouseX && this.state.mouseY
  }

  startSelect = evt => {
    const {clientY} = evt
    const clientX = evt.clientX - 300 // - 300 sidebar width for now
    this.mouseCoords = {...initialMouseCoords}
    this.setState({...initialSelectingState, startX: clientX, startY: clientY})
    this.startHuntTheValue()
  }
  startHuntTheValue = () => {
    const timer = setInterval(() => this.setState({
      mouseX: this.mouseCoords.X,
      mouseY: this.mouseCoords.Y
    }),30)

    this.setState({updateInterval: timer})
    window.addEventListener('mousemove', this.mouseMoveHandler)
  }
  mouseMoveHandler = evt => {
    this.mouseCoords.X = evt.clientX
    this.mouseCoords.Y = evt.clientY
  }
  stopSelect = () => {
    this.setState(st => st.updateInterval && (clearInterval(st.updateInterval) || ({...st, updateInterval: null})),
      () => window.removeEventListener('mousemove', this.mouseMoveHandler))
  }

  get getFrameDimentions() {
    const {state} = this
    const XDiff = this.mouseX - state.startX
    const YDiff = this.mouseY - state.startY
    const isWidthPositive = XDiff >= 0
    const isHeightPositive = YDiff >= 0
    // console.log(Math.abs(XDiff), Math.abs(YDiff))
    return {
      top: isHeightPositive? state.startY : this.mouseY,
      left: isWidthPositive ? state.startX : this.mouseX,
      width: this.mouseX ? Math.abs(XDiff) : 0,
      height: this.mouseY ? Math.abs(YDiff) : 0
    }
  }

  render() {
    const {state} = this
    return (
      <div onMouseDown={this.startSelect} onMouseUp={this.stopSelect} style={{height: '100vh', width: '100%', background: '#98387444', position: 'relative'}}>
        startY:{ state.startY}, startX: {state.startX}, <br/>
        mouseY: {this.mouseY},  mouseX: {this.mouseX},
        <div style={{position: 'absolute', ...this.getFrameDimentions, background: '#ff7341f5'}}/>
      </div>
    )
  }
}