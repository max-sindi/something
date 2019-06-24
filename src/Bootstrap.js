import React, { Component } from 'react';
import {BrowserRouter as Router, Route, } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { checkIsLogged } from './store/reducers/auth'
import { connect } from 'react-redux'
import OnlineIndicator from './OnlineIndicator'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import {PageWrapper} from './styled'

class Bootstrap extends Component {

  componentWillMount() {
    this.props.checkIsLogged()
  }

  render() {
    return (
      <div style={{width: '100vw', height: '100vh', display: 'flex', }}>
        <OnlineIndicator />
        <PageWrapper>
          <Router>
            <Sidebar></Sidebar>
            <Main>
              <Route exact path={'/'} component={Dashboard}/>
            </Main>
          </Router>
        </PageWrapper>
      </div>
    );
  }

}

export default connect(null, { checkIsLogged })(Bootstrap);
