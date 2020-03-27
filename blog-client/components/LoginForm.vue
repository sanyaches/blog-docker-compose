<template>
  <div
    v-if="show"
    class="form"
  >
    <form @submit.prevent="confirmAction(true)" class="form__block">
      <h2 class="form__title">
        Sign in
      </h2>
      <label :class="{ 'mb-1': error.cause !== 'username' }">
        Username: <input type="text" v-model="username">
      </label>
      <p class="form__error mb-1" v-if="error.cause === 'username'">{{ error.msg }}</p>

      <label :class="{ 'mb-1': error.cause !== 'password' }">
        Password: <input type="password" v-model="password">
      </label>
      <p class="form__error mb-1" v-if="error.cause === 'password'">{{ error.msg }}</p>
      <div class="form__buttons">
        <button
          class="button--green cursor-pointer"
          @click="confirmAction(true)"
        >
          Sign in
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
    Component
  } from "nuxt-property-decorator"
  import { namespace } from "vuex-class"

  const blogStore = namespace('blog');

  @Component({})
  export default class LoginForm extends Vue {
    @Prop() private show: boolean | undefined;

    @blogStore.Action private authentication: any;
    @blogStore.Action private authorization: any;

    private username: string = '';
    private password: string = '';
    private error: any = {};

    private clear() {
      this.username = '';
      this.password = '';
    }

    private confirmAction(accept: boolean) {
      if (accept) {
        // Sign-in button
        this.authentication({
          username: this.username,
          password: this.password
        }).then((res: any) => {
          this.authorization(res).then(() => {
            // Close if successfully authorized
            this.clear();
            this.$emit('close');
          })
        }).catch((error: any) => {
          // Show authentication's error
          this.error = error
        });
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
