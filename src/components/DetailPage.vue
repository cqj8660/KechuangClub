<template>
  <div>
    <mt-header title="活动查看">
      <!-- <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> -->
      <!-- <mt-button @click="onOperate" icon="more" slot="right"></mt-button> -->
    </mt-header>
    <!-- 活动activity_id为：{{$route.params.activity_id}} -->
    <!-- <mt-actionsheet :actions="sheetactions" v-model="sheetVisible"></mt-actionsheet> -->
    <!-- {{msg}} -->
    <mt-cell title="活动名称" label>{{item.name}}</mt-cell>
    <mt-cell title="活动类型" label>{{item.type}}</mt-cell>
    <mt-cell title="活动描述" label><textarea style="color: gray" cols="40" rows="4">{{item.description}}</textarea></mt-cell>
    <mt-cell title="活动要求" label>{{item.limits}}</mt-cell>
    <mt-cell title="日期" label>{{String(item.actDate).substr(0,10)}}</mt-cell>
    <mt-cell title="时间" label>{{item.actTime}}</mt-cell>
    <mt-cell title="地点" label>{{item.location}}</mt-cell>
    <mt-cell title="负责人" label>{{item.leader}}</mt-cell>
    <mt-cell title="负责人联系方式" label>{{item.contact}}</mt-cell>
    <!-- <button @click="onCancel" class="mint-button mint-button--primary mint-button--large">取消报名</button> -->
  </div>
</template>

<script>
import { getActivityDetail } from "../../request/api"; // 导入我们的api接口
export default {
  name: "DetailPage",
  data() {
    return {
      msg: "Welcome to Detail Page",
      item: {},
      sheetVisible: false,
      sheetactions: [
        {
          name: "查看报名人员",
          method: this.getmemberlist // 调用methods中的函数
        }
      ]
    };
  },
  created: function() {
    let openId = this.$cookies.get("openId");
    if (openId === null) {
      console.log("openid为空");
      window.location = "/";
    }
    let params = { a_id: this.$route.params.activity_id };
    console.log(params);
    getActivityDetail(params).then(res => {
      this.item = res.data;
      console.log(this.item);
    });
  },
  methods: {
    onCancel: function() {},
    onOperate: function() {
      this.sheetVisible = true;
    }
  }
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
