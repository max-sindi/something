import React, {Component} from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Project from './pages/Project'
import OnlineIndicator from './components/OnlineIndicator'
// import Sidebar from './components/sidebar/Sidebar'
import Main from './components/Main'
import ObjectExplorer from './lib/ObjectExplorer'

import {PageWrapper} from './components/styled'
import '../src/stylotron/styles.css'

class Bootstrap extends Component {

  componentWillMount() {
    // this.props.checkIsLogged()
    // this.props.fetchCities()
  }

  render() {
    return (
      <div style={{width: '100vw', height: '100vh', display: 'flex' }}>
        <OnlineIndicator />
        {/*<ObjectExplorer data={this.props.store} objectKey={'store'}/>*/}
        <PageWrapper>
          <Router>
            {/*<Sidebar></Sidebar>*/}
            <Main>
              <Route exact path={'/'} component={Project}/>
            </Main>
          </Router>
        </PageWrapper>
      </div>
    );
  }

}

export default Bootstrap;
