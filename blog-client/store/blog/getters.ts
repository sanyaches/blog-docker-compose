const getters = {
  getPosts(state: any) {
    return state.posts;
  },

  getUser(state: any) {
    return state.user;
  },

  isAuth(state: any) {
    return typeof(state.user.username) === 'string'
  }
};

export default getters;
