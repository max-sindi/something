import React from 'react'
import { Engine, Scene } from 'react-babylonjs'
import { Vector3 } from '@babylonjs/core';
const MyScene = () => (
  <div>
    <Engine canvasId="sample-canvas" canvasStyle={{width: 600, height: 600}}>
      <Scene>
        <freeCamera name="camera1" position={new Vector3(0, 5, -10)} target={Vector3.Zero()} />
        <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
        <sphere name="sphere1" diameter={4} segments={16} position={new Vector3(0, 1, 0)} />
        <ground name="ground1" width={6} height={6} subdivisions={2}  />
      </Scene>
    </Engine>
  </div>
)

export default MyScene