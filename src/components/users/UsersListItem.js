import React from 'react'
import styled from 'styled-components'
import {connect}from 'react-redux'
import {Avatar, Row, Col, Typography} from 'antd'
import DataExpander from '../../lib/ObjectExplorer'
import {commentUser} from "../../store/modules/users";

const Outer = styled.div`
  position: relative;
  padding: 50px 150px;
  margin-left: 15px;
  margin-right: 15px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
`
function UsersListItem(props) {
  return (
    <Outer>
      <DataExpander objectKey={'props'}>{props}</DataExpander>
      <Row justify={'center'} type={'flex'}>
        <Col span={3}>
          <Avatar size={50}>{props.user.email.slice(0, 2)}</Avatar>
        </Col>
      </Row>
      <Row>
        <Typography>User email: {props.user.email}</Typography>
      </Row>
      <button onClick={props.commentUser.bind(null, props.user.id)}>COmment me</button>
    </Outer>
  )
}
export default connect(null, {commentUser})(UsersListItem)
