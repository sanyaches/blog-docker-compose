<template>
  <div>
    <Header />
    <nuxt />
  </div>
</template>

<style>
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }

  .button--red {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #873333;
    color: #991111;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--red:hover {
    color: #fff;
    background-color: #873333;
  }

  .button.button--disable {
    color: rgba(33,33,33, .3);
  }

  .button.button--disable:hover {
    color: rgba(33,33,33, .3);
  }

  .button {
    color: #333;
  }

  .button:hover {
    color: #000;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .mr-1 {
    margin-right: 1rem;
  }

  .ml-1 {
    margin-left: 1rem;
  }

  .mb-1 {
    margin-bottom: 1rem;
  }

  .anchor {
    color: #000;
    text-decoration: none;
  }
</style>
<script>
  import Header from "../components/Header";
  export default {
    components: {Header}
  }
</script>
