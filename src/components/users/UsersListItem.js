import React from 'react'
import styled from 'styled-components'
import {connect}from 'react-redux'
import {Avatar, Row, Col, Typography} from 'antd'
import DataExpander from '../../lib/ObjectExplorer'
import {commentUser} from "../../store/modules/users"
import {LinkToUserPage} from "./utils"

const Outer = styled.div`
  position: relative;
  padding: 50px 150px;
  margin-left: 15px;
  margin-right: 15px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
`
const Comment = ({commentData}) => (
  <Typography>Comment: {commentData.commentBody}</Typography>
)

function UsersListItem({user, ...props}) {
  return (
    <Outer>
      <DataExpander objectKey={'user'}>{user}</DataExpander>
      <Row justify={'center'} type={'flex'}>
        <Col span={3}>
          <LinkToUserPage userId={user.id}>
            <Avatar size={50}>{user.email.slice(0, 2)}</Avatar>
          </LinkToUserPage>
        </Col>
      </Row>
      <Row>
        <Typography>User email: {user.email}</Typography>
      </Row>
      <Row>
        {user.received_comments.map(comment =>
          <Comment commentData={comment} key={comment.id}/>
         )}
        <Typography>User email: {user.email}</Typography>
      </Row>
      <button onClick={props.commentUser.bind(null, user.id)}>Comment me</button>
    </Outer>
  )
}
export default connect(null, {commentUser})(UsersListItem)
