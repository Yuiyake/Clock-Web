<!--<template>-->
<!--  <div id="app">-->
<!--&lt;!&ndash;    <img src="./assets/logo.png">&ndash;&gt;-->
<!--    <div>-->
<!--      <p>-->
<!--        If Element is successfully added to this project, you'll see an-->
<!--        <code v-text="'<el-button>'"></code>-->
<!--        below-->
<!--      </p>-->
<!--      <el-button>el-button</el-button>-->
<!--    </div>-->
<!--&lt;!&ndash;    <HelloWorld msg="Welcome to Your Vue.js App"/>&ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// import HelloWorld from './components/HelloWorld.vue'-->

<!--export default {-->
<!--  name: 'app',-->
<!--  components: {-->
<!--    // HelloWorld-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--#app {-->
<!--  font-family: 'Avenir', Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--  margin-top: 60px;-->
<!--}-->
<!--</style>-->
<template>
  <div id="app">
    <router-view v-if="isAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isAlive: true
    }
  },
  methods: {
    reload() {
      this.isAlive = false;
      this.$nextTick(function () {
        this.isAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 740px;
  margin: 0;
}
</style>
