export default {
  login: 'login',
  myProfile: 'my-profile',
  myProjects: 'my-profile/projects',
  userProjects: userId => `${userId}/projects`,
  user: {
    user: 'user',
    comment: userId => `user/${userId}/comment`
  },
  weather: 'weather',
  cities: 'cities'
}