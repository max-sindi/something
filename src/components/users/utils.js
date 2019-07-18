import React from 'react'
import {Link} from "react-router-dom"

export const LinkToUserPage = ({ userId, children }) => (
  <Link to={`/user/${userId}`}>{children}</Link>
)