<template>
  <div>
    <mt-header title="活动报名">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <!-- 活动activity_id为：{{$route.params.activity_id}}
    <br />
    {{msg}}-->
    <mt-cell title="活动名称" label>{{item.name}}</mt-cell>
    <mt-cell title="活动类型" label>{{item.type}}</mt-cell>
    <mt-cell title="活动描述" label>
      <textarea style="color: gray" cols="40" rows="4">{{item.description}}</textarea>
    </mt-cell>
    <mt-cell title="日期" label>{{String(item.actDate).substr(0,10)}}</mt-cell>
    <mt-cell title="时间" label>{{item.actTime}}</mt-cell>
    <mt-cell title="地点" label>{{item.location}}</mt-cell>
    <mt-cell title="负责人" label>{{item.leader}}</mt-cell>
    <mt-cell title="负责人联系方式" label>{{item.contact}}</mt-cell>
    <!-- <mt-field label="姓名" placeholder="请输入姓名" v-model="username"></mt-field>
    <mt-field label="学号" placeholder="请输入学号" v-model="idnumber"></mt-field>-->
    <button @click="onSignup" class="mint-button mint-button--primary mint-button--large">报名</button>
  </div>
</template>

<script>
import { getActivityDetail, acActivity } from "../../request/api"; // 导入我们的api接口
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
export default {
  name: "SignupPage",
  data() {
    return {
      item: {},
      msg: "Welcome to Signup Page",
      phonenumber: "",
    };
  },
  created: function () {
    let params = { a_id: this.$route.params.activity_id };
    console.log(params);
    let openId = this.$cookies.get("openId");
    if (openId === null) {
      console.log("openid为空");
      window.location = "/";
    }
    getActivityDetail(params).then((res) => {
      this.item = res.data;
      console.log(this.item);
    });
  },
  methods: {
    onSignup: function () {
      console.log("onSignup");
      let openId = this.$cookies.get("openId");
      console.log(openId);
      console.log(this.$route.params.activity_id);
      let params = {
        a_id: this.$route.params.activity_id,
        openId: openId,
      };
      console.log(params);
      // MessageBox.confirm(message, title);
      MessageBox.confirm("确定报名此活动?").then((action) => {
        acActivity(params).then((res) => {
          console.log(res);
          if (res.message == "success") {
            Toast({
              message: "活动报名成功",
              duration: 2000,
            });
            setInterval(function () {
              window.location = "/";
            }, 1000);
          } else {
            Toast({
              message: res.data,
              duration: 2000,
            });
          }
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
/* a {
  color: #42b983;
} */
</style>
