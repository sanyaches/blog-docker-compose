<template>
  <div class="container blog">
    <h1 class="blog__title">Blog</h1>
    <button
      class="blog__button button mb-1"
      :class="{
        'button--green': isAuth,
        'button--disable': !isAuth
      }"
      :disabled="!isAuth"
      @click="openPopupPostAdd"
    >
      Add post <i class="fas fa-plus"></i>
    </button>
    <div class="blog-wrapper">
      <div
        v-for="(post, index) in getPostsSort"
        :key="index"
        class="blog__post post-preview"
      >
        <div class="post-thumbnail"></div>
        <div class="post-content">
          <h1>{{ post.title }}</h1>
          <p>{{ post.description }}</p>
        </div>
        <div class="post-bottom">
          <div
            class="post-bottom__button"
            :class="{ 'post-like--liked': post.liked, 'cursor-pointer': isAuth }"
            @click="tryLike(post)"
          >
            <i class="far fa-heart"></i>
          </div>
          <div
            class="post-bottom__button"
            @click="openPopupPostEdit(post)"
            :class="{ 'cursor-pointer': isAuth && getUser.id === post.creator_id}"
            :title="getUser.id !== post.creator_id ? 'You cant edit' : ''"
          >
            <i class="far fa-edit"></i>
          </div>
        </div>
      </div>
    </div>

    <PostForm
      :show="showPopupPost"
      :action="actionPopupPost"
      :post="popupPost"
      @close="closePopupPost"
    />
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Watch
  } from "nuxt-property-decorator";
  import { namespace } from "vuex-class"
  import PostForm from "~/components/PostForm.vue";

  const blogStore = namespace('blog');

  @Component({
    components: {
      PostForm
    }
  })
  export default class IndexPage extends Vue {
    @blogStore.Action private loadPosts: any;
    @blogStore.Action private addLike: any;
    @blogStore.Action private disLike: any;

    @blogStore.Getter private getPosts: any;
    @blogStore.Getter private getUser: any;
    @blogStore.Getter private isAuth: any;

    private showPopupPost: boolean = false;
    private actionPopupPost: string = '';
    private popupPost: any = {};

    private get getPostsSort() {
      let posts = [...this.getPosts];
      posts.sort((post1: any, post2: any) => {
        if (post1.created > post2.created) {
          return -1;
        }
        if (post1.created < post2.created) {
          return 1;
        }
        // a должно быть равным b
        return 0;
      });
      return posts
    }

    private openPopupPostAdd() {
      this.actionPopupPost = 'add';
      this.showPopupPost = true;
    }

    private openPopupPostEdit(post: any) {
      // User cant edit stranger posts
      if (this.isAuth && this.getUser.id === post.creator_id) {
        this.actionPopupPost = 'edit';
        this.popupPost = post;
        this.showPopupPost = true;
      }
    }

    private closePopupPost() {
      this.actionPopupPost = '';
      this.showPopupPost = false;
    }

    private created() {
      this.loadPosts()
    };

    private tryLike(post: any) {
      if (this.isAuth && !post.liked) {
        this.addLike({
          userId: this.getUser.id,
          postId: post.id
        })
      }
      if (this.isAuth && post.liked) {
        this.disLike({
          userId: this.getUser.id,
          postId: post.id
        })
      }
    }
  }
</script>

<style lang="scss">
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .blog {
    &-wrapper {
      display: grid;
      grid-template-columns: 33% 33% 33%;
      grid-gap: 1rem;
      width: 60%;

      @media screen and (max-width: 1360px) {
        grid-template-columns: 50% 50%;
      }
      @media screen and (max-width: 980px) {
        grid-template-columns: 100%;
        width: 90%;
      }
    }

    &__title {
      margin: 1rem 0;
    }

    &__button {
      font-size: 1.2rem;
      cursor: pointer;
    }

    &__post {
      padding: 1rem;
      border: 2px solid #7f828b;
      border-radius: 1rem;
    }
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }

  .post-preview {
    border: 1px solid #ccc;
    box-shadow: 0 2px 2px #ccc;
    background-color: white;
  }

  .post-thumbnail {
    width: 100%;
    height: 200px;
    background-position: center;
    background-size: cover;
    background-image: url("../assets/thumb.jpg");
  }

  .post-content {
    padding: 10px;
    text-align: center;
  }

  .post-bottom {
    display: flex;
    justify-content: space-around;

    &__button {
      text-align: center;
      padding: .5rem 1rem;
      border: 1px solid #897777;
    }
  }

  .post-like--liked {
    color: #873333;
    background-color: #F7F8FB;
    box-shadow: 0 0 7px 2px rgba(153,153,255,1);
  }
</style>
