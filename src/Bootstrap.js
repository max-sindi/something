import React, { Component } from 'react';
import Editor from './Editor'
import GlobalClickHandler from './GlobalClickHandler'
// import { FullScreenStyled } from './styled'

class Bootstrap extends Component {

  render() {
    return (
      <div style={{width: '100%', height: '100%', display: 'flex'}}>
        <GlobalClickHandler>
            <Editor></Editor>
        </GlobalClickHandler>
      </div>
    );
  }

}

export default Bootstrap;
