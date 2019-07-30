import React, { Component } from 'react';
import {BrowserRouter as Router, Route, } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MyProjects from './pages/MyProjects'
import UserProfile from './pages/UserProfile'
import Weather from './pages/Weather'
import Users from './pages/Users'
import Z from './pages/Z'
import {checkIsLogged} from './store/modules/auth'
import {connect} from 'react-redux'
import OnlineIndicator from './OnlineIndicator'
import Sidebar from './components/sidebar/Sidebar'
import Main from './components/Main'
import {fetchCities} from './store/modules/cities'
import ObjectExplorer from './lib/ObjectExplorer'

import {PageWrapper} from './styled'

class Bootstrap extends Component {

  componentWillMount() {
    this.props.checkIsLogged()
    this.props.fetchCities()
  }

  render() {
    return (
      <div style={{width: '100vw', height: '100vh', display: 'flex', }}>
        <OnlineIndicator />
        <ObjectExplorer data={this.props.store} objectKey={'store'}/>
        <PageWrapper>
          <Router>
            <Sidebar></Sidebar>
            <Main>
              <Route exact path={'/'} component={Dashboard}/>
              <Route exact path={'/my-projects'} component={MyProjects}/>
              <Route exact path={'/users'} component={Users}/>
              <Route exact path={'/user/:userId'} component={UserProfile}/>
              <Route exact path={'/weather'} component={Weather}/>
              <Route exact path={'/Z'} component={Z}/>
            </Main>
          </Router>
        </PageWrapper>
      </div>
    );
  }

}

export default connect(store => ({ store }), { checkIsLogged, fetchCities })(Bootstrap);
