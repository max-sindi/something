import React from 'react'
import {connect} from 'react-redux'
import {fetchMyProjects} from '../store/modules/projects'

class MyProjects extends React.Component {
  componentDidMount() {
    this.props.fetchMyProjects();
  }
  render() {
    return (
      <div>
        My projects
      </div>
    )
  }
}

export default connect(store => store, {fetchMyProjects})(MyProjects)