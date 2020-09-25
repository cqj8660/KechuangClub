<template>
  <div>
    <mt-actionsheet :actions="types" v-model="typeSheetVisible"></mt-actionsheet>
    <mt-actionsheet :actions="years" v-model="yearSheetVisible"></mt-actionsheet>
    <mt-header :title="filters">
      <mt-button icon="more" slot="right" @click="handleFilter"></mt-button>
    </mt-header>
    <!-- <div class="filter-cls">
      <mt-button class="mint-button--normal" @click="handleType" type="primary">类型：{{activityType}}</mt-button>
      <mt-button class="mint-button--normal" @click="handleYear" type="primary">学年：{{activityYear}}</mt-button>
    </div> -->
    <!-- 活动activity_id为：{{$route.params.activity_id}} -->
    <!-- <mt-actionsheet :actions="sheetactions" v-model="sheetVisible"></mt-actionsheet> -->
    <!-- {{msg}} -->
    <template
      v-for="site in activities"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <router-link :to="'detail/'+site.id">
        <mt-cell :title="site.name" :label="stringCut(site.description)" is-link></mt-cell>
      </router-link>
    </template>
    <div class="pager-cls">
      <mt-button size="normal" plain @click="lastpage">上一页</mt-button>
      <mt-button size="normal" disabled @click="lastpage">{{page}}</mt-button>
      <mt-button size="normal" plain @click="nextpage">下一页</mt-button>
    </div>
  </div>
</template>

<script>
import {
  getActivityDetail,
  getAllActivity,
  modifyUserinfo,
} from "../../request/api"; // 导入我们的api接口
export default {
  name: "ShowPage",
  data() {
    return {
      typeSheetVisible: false,
      yearSheetVisible: false,
      types: [
        {
          name: "所有",
          method: this.fillType,
        },
        {
          name: "讲座",
          method: this.fillType, // 调用methods中的函数
        },
        {
          name: "活动",
          method: this.fillType, // 调用methods中的函数
        },
        {
          name: "培训",
          method: this.fillType,
        },
        {
          name: "竞赛",
          method: this.fillType,
        },
        {
          name: "其它",
          method: this.fillType,
        },
      ],
      years: [
        {
          name: "所有",
          method: this.fillYear,
        },
        {
          name: "2020",
          method: this.fillYear, // 调用methods中的函数
        },
        {
          name: "2021",
          method: this.fillYear, // 调用methods中的函数
        },
        {
          name: "2022",
          method: this.fillYear,
        },
        {
          name: "2023",
          method: this.fillYear,
        },
        {
          name: "2024",
          method: this.fillYear,
        },
      ],
      msg: "Welcome to Detail Page",
      activities: {},
      filters: "所有活动",
      activityType: "选择",
      activityYear: "选择",
      page: 1,
      item: {},
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
    getAllActivity({ page: this.page }).then((res) => {
      // console.log("getAll: ");
      this.activities = res.data.data;
      // console.log(res);
    });
  },
  methods: {
    handleFilter: function (res) {
      this.typeSheetVisible = true;
    },
    handleType: function (res) {
      this.typeSheetVisible = true;
    },
    handleYear: function (res) {
      this.yearSheetVisible = true;
    },
    fillYear: function (res) {
      this.activityYear = res.name;
      this.filters = this.activityType + "类型 - " + this.activityYear + "学年";
    },
    fillType: function (res) {
      this.activityType = res.name;
      this.filters = this.activityType + "类型 - " + this.activityYear + "学年";
    },
    lastpage: function () {
      this.page = Math.max(1, this.page - 1);
      getAllActivity({ page: this.page }).then((res) => {
        // console.log("getAll: ");
        this.activities = res.data.data;
        // console.log(res);
      });
    },
    nextpage: function () {
      this.page = Math.min(20, this.page + 1);
      getAllActivity({ page: this.page }).then((res) => {
        // console.log("getAll: ");
        this.activities = res.data.data;
        // console.log(res);
      });
    },
    stringCut: function (str) {
      if (str.length > 20) return str.substr(0, 20) + "...";
      else return str;
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.filter-cls {
  position: relative;
  display: flex;
  justify-content: space-around;
  margin: 10px;
  /* padding: 10px; */
}
a {
  text-decoration: none;
  color: #2c3e50;
}
.inviteCode-cls {
  margin: 20rpx;
  padding: 20rpx;
}
.bottom-dis-cls {
  margin: 50rpx;
  position: relative;
  display: flex;
  justify-content: space-around;
}
.pager-cls {
  /* position: absolute; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #2c3e50;
  font-size: 20px;
  padding: 20px;
}
/* a {
  color: #42b983;
} */
</style>
