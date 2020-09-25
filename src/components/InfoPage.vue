<template>
  <div class="hello">
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <h1>{{ msg }}</h1>
      <h2>Metta</h2>
      <h2>World</h2>
      <h2>Peace</h2>
      <p style="text-align: center">
        <a href="http://beian.miit.gov.cn" target="_blank">沪ICP备19004953号-2</a>
      </p>
    </mt-loadmore>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
export default {
  name: "InfoPage",
  data() {
    return {
      msg: "Welcome to SaTI Club",
      allLoaded: false
    };
  },
  mounted() {
    document.title = "学习活动记录";
  },
  methods: {
    loadTop: function() {
      console.log('loadTop');
      this.$refs.loadmore.onTopLoaded();
      location.reload();
    },
    loadBottom: function() {
      console.log("loadBottom");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
  text-align: center;
  margin: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  line-height: 100px;
  text-align: center;
  margin: 20px;
}
</style>
