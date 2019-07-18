import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchUser} from "../store/modules/users"
import ObjectExplorer from "../lib/ObjectExplorer"

class UserPage extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId)
  }

  render() {
    return (
      <div className="relative">

        <ObjectExplorer objectKey={'props'}>{this.props}</ObjectExplorer>
      </div>
    )
  }
}

export default connect((store, props) => ({ userData: store.users.usersStore[props.match.params.userId] }), {fetchUser})(UserPage)

