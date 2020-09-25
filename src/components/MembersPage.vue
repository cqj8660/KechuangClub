<template>
  <div>
    <mt-header :title="msg">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button @click="onOperate" icon="more" slot="right"></mt-button> -->
    </mt-header>
    <mt-cell title="名单下载请点" :to="downloadUrl" is-link value="此处"></mt-cell>
    <!-- 活动activity_id为：{{$route.params.activity_id}} -->
    <!-- <mt-actionsheet :actions="sheetactions" v-model="sheetVisible"></mt-actionsheet> -->
    <mt-cell title="报名人数" :value="getNumber(members)"></mt-cell>
    <template v-for="member in members">
      <mt-cell :title="member.name" :label="member.ecnuId" :value="member.phoneNumber"></mt-cell>
    </template>

    <!-- <button @click="onCancel" class="mint-button mint-button--primary mint-button--large">取消报名</button> -->
  </div>
</template>

<script>
import {
  getActivityDetail,
  getAcceptuser,
  getMemberlist,
} from "../../request/api"; // 导入我们的api接口
export default {
  name: "DetailPage",
  data() {
    return {
      msg: "报名名单",
      downloadUrl: null,
      a_id: 0,
      members: {},
      sheetVisible: false,
      sheetactions: [
        {
          name: "查看报名人员",
          method: this.getmemberlist, // 调用methods中的函数
        },
      ],
    };
  },
  created: function () {
    let openId = this.$cookies.get("openId");
    if (openId === null) {
      console.log("openid为空");
      window.location = "/";
    }
    this.a_id = this.$route.params.activity_id;
    let params = { a_id: this.a_id };
    console.log(params);
    getMemberlist(params).then((res) => {
      console.log(res);
      this.downloadUrl = res.data;
    });
    getAcceptuser(params).then((res) => {
      console.log(res);
      this.members = res.data;
    });
  },
  methods: {
    getNumber: function (members) {
      if (members) return members.length;
      else return 0;
    },
    onCancel: function () {},
    onOperate: function () {
      this.sheetVisible = true;
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
