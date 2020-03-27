<template>
  <div
    v-if="show"
    class="form"
  >
    <form @submit.prevent="confirmAction(true)" class="form__block">
      <h2 class="form__title">
        {{ title }}
      </h2>
      <label class="mb-1">
        Title: <input type="text" v-model="title">
      </label>

      <label class="mb-1">
        Description: <textarea v-model="description" />
      </label>

      <div class="form__buttons">
        <button
          class="button--green cursor-pointer"
          @click="confirmAction(true)"
        >
          {{ action === 'add' ? 'Add post' : 'Update post' }}
        </button>
        <button
          class="button--red cursor-pointer"
          @click="confirmAction(false)"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import {
    Vue,
    Prop,
    Watch,
    Component
  } from "nuxt-property-decorator"
  import { namespace } from "vuex-class"

  const blogStore = namespace('blog');

  @Component({})
  export default class PostForm extends Vue {
    @Prop() private show: boolean | undefined;
    @Prop() private action: string | undefined;
    @Prop() private post: any | undefined;

    @blogStore.Action private addPost: any;
    @blogStore.Action private updatePost: any;

    @blogStore.Getter private getUser: any;

    private title: string = '';
    private description: string = '';

    @Watch('show')
    private onShowChanged() {
      if (this.action === 'edit') {
        this.title = this.post.title;
        this.description = this.post.description;
      }
    }

    private clear() {
      this.title = '';
      this.description = '';
    }

    private confirmAction(accept: boolean) {
      if (accept) {
        // try add post if action <=> 'add'
        this.action === 'add' ?
          this.addPost({
            userId: this.getUser.id,
            title: this.title,
            description: this.description
          }).then((res: any) => {
              // Close if successfully
              this.clear();
              this.$emit('close');
          }).catch((error: any) => {
            // console log error
            console.log(error)
          })
          :
          // else try update post
          this.updatePost({
            id: this.post.id,
            title: this.title,
            description: this.description
          }).then((res: any) => {
            // Close if successfully authorized
            this.clear();
            this.$emit('close');
          }).catch((error: any) => {
            // Show authentication's error
            console.log(error)
          })

      }
      else {
        // Cancel button
        this.clear();
        this.$emit('close');
      }
    }
  }
</script>

<style scoped lang="scss">
  .form {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow:hidden;
    z-index: 1000000;

    background-color: rgba(127, 130, 139, .7);

    display: flex;
    align-items: center;

    &__block {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 40%;

      padding: 3rem 0;
      margin: 0 auto;
      border-radius: 20px;

      background-color: #ffffff;

      @media screen and (max-width: 980px) {
        width: 85%;
      }
    }

    &__title {
      margin-bottom: 2rem;
    }

    &__buttons {
      display: flex;
      justify-content: space-around;
      width: 60%;

      @media screen and (max-width: 480px) {
        width: 90%;
      }
    }

    &__error {
      font-size: .8rem;
      color: #873333;
    }
  }
</style>
