import React from 'react'
import {SidebarOuter, LinkStyled} from "./styled"
import {NavLink as Link} from 'react-router-dom'

export default class Sidebar extends React.Component {
  render() {
    return (
      <SidebarOuter>
        <LinkStyled>
          <Link to={`/my-projects`}>
            My projects
          </Link>
        </LinkStyled>
        <LinkStyled>
          <Link to={`/users`}>
            Users
          </Link>
        </LinkStyled>
        <LinkStyled>
          <Link to={`/weather`}>
            Weather
          </Link>
        </LinkStyled>
        <LinkStyled>
          <Link to={`/Z`}>
            Z
          </Link>
        </LinkStyled>
        <LinkStyled>
          <Link to={`/babylon`}>
            Babylon
          </Link>
        </LinkStyled>
      </SidebarOuter>
    )
  }
}