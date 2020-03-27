import gql from 'graphql-tag';
import get = Reflect.get;

const actions = {
  async loadPosts({commit}: {commit: any}) {
    // @ts-ignore
    const client = this.app.apolloProvider.defaultClient;

    let allPosts = await client.query({
      query: gql`{
        posts {
          id
          title
          description
          creator_id
          created
        }
      }`
    }).then(({ data }: {data: any}) =>
      data && data.posts
    );

    commit('setPosts', allPosts);
  },

  authentication({commit}: {commit: any}, payload: {
    username: string,
    password: string
  }) {
    // @ts-ignore
    const client = this.app.apolloProvider.defaultClient;

    return new Promise(async (resolve, reject) => {
      const username = await client.query({
        query: gql`{
          user(username: "${payload.username}") {
            id
            username
            user_password
            email
          }
        }`
      }).then(({ data }: {data: any}) =>{
        // Wrong pass
        if (data.user.user_password !== payload.password) {
          reject({
            cause: 'password',
            msg: 'Invalid password'
          });
        }
        else {
          // Successfull
          resolve({
            id: data.user.id,
            username: data.user.username,
            email: data.user.email
          })
        }
      }).catch((err: any) => {
        // Wrong username
        reject({
          cause: 'username',
          msg: 'Invalid username'
        });
      });
    })
  },

  authorization({commit, dispatch}: {commit: any, dispatch: any}, payload: {
    username: string,
    email: string,
    id: number
  }) {
    commit('setUser', payload);
    dispatch('loadLikes')
  },

  async loadLikes({commit, getters} : {commit: any, getters: any}) {
    // @ts-ignore
    const client = this.app.apolloProvider.defaultClient;

    let likesByUser = await client.query({
      query: gql`{
        likes(userId: ${ getters['getUser'].id }) {
          id
          creator_id
          post_id
          created
        }
      }`
    }).then(({ data }: {data: any}) =>
      data && data.likes
    );

    likesByUser.forEach((like: any) => {
      getters['getPosts'].forEach((post: any) => {
        if (post.id === like.post_id) {
          commit('setLike', post.id)
        }
      })
    })
  },

  addLike({commit} : {commit: any}, payload: {
    userId: number,
    postId: number
  }) {
    // @ts-ignore
    const client = this.app.apolloProvider.defaultClient;

    client.mutate({
      mutation: gql`
        mutation {
          addLike(postId: ${payload.postId}, creatorId: ${payload.userId}) {
            post_id
          }
        }`
    }).then((data: any) =>{
      console.log(data);
      commit('setLike', payload.postId)
    }).catch((err: any) => {
      console.log(err)
    });
  },

  disLike({commit} : {commit: any}, payload: {
    userId: number,
    postId: number
  }) {
    // @ts-ignore
    const client = this.app.apolloProvider.defaultClient;

    client.mutate({
      mutation: gql`
        mutation {
          deleteLike(postId: ${payload.postId}, creatorId: ${payload.userId}) {
            post_id
          }
        }`
    }).then((data: any) =>{
      console.log(data);
      commit('deleteLike', payload.postId)
    }).catch((err: any) => {
      console.log(err)
    });
  },

  addPost({commit}: {commit: any}, payload: {
    userId: number,
    title: string,
    description: string
  }) {
    // @ts-ignore
    const client = this.app.apolloProvider.defaultClient;

    client.mutate({
      mutation: gql`
        mutation {
          addPost(creatorId: ${ payload.userId }, title: "${ payload.title }", description: "${ payload.description }") {
            id
            title
            creator_id
            description
            created
          }
        }`
    }).then((data: any) =>{
      console.log(data);
      commit('pushPost', data.data['addPost'])
    }).catch((err: any) => {
      console.log(err)
    });
  },

  updatePost({commit}: {commit: any}, payload: {
    id: number,
    title: string,
    description: string,
  }) {
    // @ts-ignore
    const client = this.app.apolloProvider.defaultClient;

    client.mutate({
      mutation: gql`
        mutation {
          updatePost(postId: ${ payload.id }, title: "${ payload.title }", description: "${ payload.description }"){
            id
            title
            description
            creator_id
            created
          }
        }`
    }).then((data: any) =>{
      console.log(data);
      commit('updatePost', data.data['updatePost'])
    }).catch((err: any) => {
      console.log(err)
    });
  }
};

export default actions
