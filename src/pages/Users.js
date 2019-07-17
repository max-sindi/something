import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/modules/users'
import User from '../components/users/UsersListItem'

class Users extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    const {users} = this.props
    return (
      <div>
        {users.map(user => (
          <User user={user} key={user.id}></User>
        ))}
      </div>
    )
  }
}

export default connect(store => ({
  users: store.users.usersList
}), {fetchUsers})(Users)