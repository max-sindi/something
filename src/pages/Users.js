import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/modules/users'

class Users extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    return (
      <div>
        Users
      </div>
    )
  }
}

export default connect(store => store, {fetchUsers})(Users)