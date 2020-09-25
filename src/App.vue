
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: "App",
  data() {
    return {
      actname: "",
      actype: "",
      introduction: "",
      actrequest: "",
      actplace: "",
      actperson: "",
      actime: "",
      actphone: "",
      tab_selected: "1",
      person_selected: "1"
    };
  },
  mounted: function() {
    this.getToken();
  },
  methods: {
    onClick: function(e) {
      console.log(
        this.actname,
        this.actype,
        this.introduction,
        this.actrequest,
        this.actime,
        this.actplace,
        this.actperson,
        this.actphone
      );
    },
    loaded: function() {
      console.log("loaded");
    },
    // 截取URL字段
    GetQueryString: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    setCookie: function(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    getCookie: function(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return null;
    },
    getToken: function() {
      //判断是否有openid
      if (this.getCookie("openid") == null) {
      } else {
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
