const mutations = {
  setPosts(state: any, posts: any) {
    state.posts = posts;
  },

  setUser(state: any, payload: any) {
    state.user = payload;
  },

  pushPost(state: any, newPost: any) {
    state.posts.push(newPost);
  },

  setLike(state: any, postId: number) {
    let posts = [... state.posts];

    posts.forEach((post: any) => {
      if (post.id === postId) {
        post.liked = true;
        console.log(`I like #${postId} post`)
      }
    });

    state.posts = posts
  },

  deleteLike(state: any, postId: number) {
    let posts = [... state.posts];

    posts.forEach((post: any) => {
      if (post.id === postId) {
        post.liked = false;
        console.log(`I dislike #${postId} post`)
      }
    });

    state.posts = posts
  },

  updatePost(state: any, updatePost: any) {
    state.posts.forEach((post: any, index: number) => {
      if (post.id === updatePost.id) {
        state.posts[index] = updatePost;
        return
      }
    })
  }
};

export default mutations;
