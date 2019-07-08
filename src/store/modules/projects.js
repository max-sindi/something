import api from '../../apiUrls'
import {success, error} from "redux-saga-requests";

const FETCH_MY_PROJECTS = 'FETCH_MY_PROJECTS'
export const fetchMyProjects = () => ({
  type: FETCH_MY_PROJECTS,
  request: {
    url: api.myProjects,
  }
})

const initialState = {
  // projects of current logged user
  myProjectsList: [],
  myProjectsAreFetching: false,
  // all visible projects of site
  siteProjects: [],
  siteProjectsAreFetching: false,
  // some user's projects
  userProjects: [],
  userProjectsAreFetching: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    default: return state;
  }
}