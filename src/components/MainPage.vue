<template>
  <!-- <mt-loadmore
    :top-method="loadTop"
    :bottom-method="loadBottom"
    :bottom-all-loaded="allLoaded"
    ref="loadmore"
  >-->
  <div id="app">
    <mt-actionsheet :actions="types" v-model="typeSheetVisible"></mt-actionsheet>
    <mt-tabbar v-model="tab_selected" fixed>
      <mt-tab-item id="1" v-show="admin">
        <img slot="icon" src="../assets/release.png" />发布活动
      </mt-tab-item>
      <mt-tab-item id="2">
        <img slot="icon" src="../assets/list.png" />报名活动
      </mt-tab-item>
      <mt-tab-item id="3">
        <img slot="icon" src="../assets/personal.png" />我的
      </mt-tab-item>
    </mt-tabbar>
    <mt-tab-container v-model="tab_selected">
      <mt-tab-container-item id="1">
        <!-- <mt-header title="发布活动"></mt-header> -->
        <mt-field label="活动名称" placeholder="请输入活动名称" v-model="name"></mt-field>
        <mt-field label="活动类型" placeholder="请选择活动类型" disabled v-model="type">
          <span>
            <button
              @click="onChooseType"
              class="mint-button mint-button--default mint-button--small"
            >选择</button>
          </span>
        </mt-field>
        <mt-field label="活动描述" placeholder="请输入活动描述" type="textarea" rows="3" v-model="description"></mt-field>
        <mt-field label="活动要求" placeholder="请输入活动要求" v-model="limits"></mt-field>
        <mt-field label="活动日期" placeholder="请选择日期" type="date" v-model="actDate"></mt-field>
        <mt-field label="活动时间" placeholder="请输入时间" v-model="actTime"></mt-field>
        <mt-field label="地点" placeholder="请输入地点" v-model="location"></mt-field>
        <mt-field label="人数限制" placeholder="请输入人数限制" type="number" v-model="personAccount"></mt-field>
        <mt-field label="负责人" placeholder="请输入负责人名字" v-model="leader"></mt-field>
        <mt-field label="联系方式" placeholder="请输入负责人联系方式" v-model="contact"></mt-field>
        <button
          @click="onCreateActivity"
          class="mint-button mint-button--primary mint-button--large"
        >发布</button>
        <br />
        <br />
        <br />
        <br />
        <br />
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <!-- <mt-header title="最近活动"></mt-header> -->
        <template
          v-for="site in activities"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <router-link :to="'signup/'+site.id">
            <mt-cell :title="site.name" :label="stringCut(site.description)" is-link></mt-cell>
          </router-link>
        </template>

        <div class="pager-cls">
          <mt-button size="normal" plain @click="lastpage">上一页</mt-button>
          <mt-button size="normal" disabled @click="lastpage">{{page}}</mt-button>
          <mt-button size="normal" plain @click="nextpage">下一页</mt-button>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-navbar v-model="person_selected">
          <mt-tab-item id="1" v-show="admin">我发布的</mt-tab-item>
          <mt-tab-item id="2">我报名的</mt-tab-item>
          <mt-tab-item id="3">个人信息维护</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="person_selected">
          <mt-tab-container-item id="1">
            <template v-for="item in holdActivities">
              <router-link :to="'maintain/' + item.id">
                <mt-cell :title="item.name" :label="stringCut(item.description)" is-link></mt-cell>
              </router-link>
            </template>
            <br />
            <br />
            <br />
            <br />
            <br />
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <template v-for="item in acActivities">
              <router-link :to="'check/' + item.id">
                <mt-cell :title="item.name" :label="stringCut(item.description)" is-link></mt-cell>
              </router-link>
            </template>
            <br />
            <br />
            <br />
            <br />
            <br />
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <mt-field label="姓名" placeholder="请输入姓名" v-model="userinfo.name"></mt-field>
            <mt-field label="学工号" placeholder="请输入学工号" v-model="userinfo.ecnuId"></mt-field>
            <mt-field label="联系方式" placeholder="请输入联系方式" v-model="userinfo.phoneNumber"></mt-field>
            <mt-field label="邮箱" placeholder="请输入邮箱" v-model="userinfo.email"></mt-field>
            <!-- <mt-field label="openId" placeholder="openId" v-model="userinfo.openId"></mt-field> -->
            <mt-field
              class="inviteCode-cls"
              label="邀请码"
              placeholder="请输入邀请码"
              v-model="userinfo.tag"
              v-show="admin==false"
            >
              <span>
                <button
                  @click="onUpdateusertag"
                  class="mint-button mint-button--default mint-button--small"
                >验证</button>
              </span>
            </mt-field>
            <button
              @click="onUpdateuserinfo"
              class="mint-button mint-button--primary mint-button--large"
            >修改个人信息</button>
            <!-- <mt-cell title="姓名" label>{{userinfo.name}}</mt-cell>
            <mt-cell title="学工号" label>{{userinfo.ecnuId}}</mt-cell>
            <mt-cell title="联系方式" label>{{userinfo.phoneNumber}}</mt-cell>
            <mt-cell title="邮箱" label>{{userinfo.email}}</mt-cell>-->
          </mt-tab-container-item>
        </mt-tab-container>
      </mt-tab-container-item>
    </mt-tab-container>

    <!-- <img src="./assets/logo.png"> -->
  </div>
  <!-- </mt-loadmore> -->
</template>

<script>
import {
  getAllActivity,
  holdActivity,
  getActivityHold,
  getActivityAc,
  getOpenid,
  userRegister,
  getUserinfo,
  modifyUserinfo,
  modifyUsertag,
} from "../../request/api"; // 导入我们的api接口
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import { Actionsheet } from "mint-ui";
import { TabContainer, TabContainerItem } from "mint-ui";
import { Loadmore } from "mint-ui";
import { InfiniteScroll } from "mint-ui";
import { DatetimePicker } from "mint-ui";
// import wx from 'weixin'
export default {
  name: "MainPage",
  data() {
    return {
      typeSheetVisible: false,
      types: [
        {
          name: "讲座",
          method: this.fill, // 调用methods中的函数
        },
        {
          name: "活动",
          method: this.fill, // 调用methods中的函数
        },
        {
          name: "培训",
          method: this.fill,
        },
        {
          name: "竞赛",
          method: this.fill,
        },
        {
          name: "其它",
          method: this.fill,
        },
      ],
      productionAppid: 'wx3985b1aa6c1573e2',
      devAppid: 'wx6604c51e82aabfd3',
      holdActivities: null,
      acActivities: null,
      activities: null,
      loading: false,
      userinfo: {},
      tag: -1,
      admin: true,
      page: 1,
      openId: null,
      name: "",
      type: "",
      description: "",
      limits: "",
      location: "",
      leader: "",
      actDate: "",
      actTime: null,
      contact: "",
      personAccount: "",
      tab_selected: "1",
      person_selected: "2",
      allLoaded: false,
    };
  },
  watch: {
    tab_selected: function (val, oldVal) {
      // console.log("tab_selected:", val);
      this.setCookie("tab_selected", val, "1d");
    },
    person_selected: function (val, oldVal) {
      // console.log("person_selected:", val);
      this.setCookie("person_selected", val, "1d");
    },
  },
  mounted: function () {
    // console.log("mounted");
  },
  created: function () {
    var tab = this.getCookie("tab_selected");
    if (tab != null) this.tab_selected = tab;
    // console.log(this.$appid);
    let code = this.GetQueryString("code");
    var openId = this.getCookie("openId");
    this.openId = openId;
    if (openId != null) {""
      this.loadUserinfo();
      this.loadActivity();
      return;
    } else {
      if (code != null) {
        console.log("code is not null");
        var params = { code: code };
        console.log(params);
        getOpenid(params).then((res) => {
          console.log("getopenid", res);
          this.setCookie("openId", res.data, -1);
          this.openId = res.data;
          params.openId = this.openId;
          userRegister(params).then((res) => {
            console.log(res.data);
            if (res.data == "用户注册") {
              console.log("用户注册");
              var oldUrl = window.location.href.split("?")[0];
              // location.href = oldUrl + "register";
            } else {
              location.reload();
            }
          });
        });
      } else {
        console.log("code is null");
        this.getToken();
      }
    }
  },
  methods: {
    fill: function (res) {
      console.log(res.name);
      this.type = res.name;
    },
    onChooseType: function () {
      this.typeSheetVisible = true;
    },
    stringCut: function (str) {
      if (str == undefined) return "";
      if (str.length > 20) return str.substr(0, 20) + "...";
      else return str;
    },
    onUpdateusertag: function () {
      console.log("邀请码提交");
      if (this.userinfo.tag == "2020ecnucs") {
        let params = { openId: this.openId };
        params.tag = 1;
        modifyUsertag(params).then((res) => {
          console.log(res);
          Toast({
            message: "邀请码正确",
            duration: 1200,
          });
          setInterval(function () {
            location.reload();
          }, 1200);
        });
      } else {
        Toast({
          message: "邀请码错误，请重新填写",
          duration: 1200,
        });
        setInterval(function () {
          location.reload();
        }, 1200);
      }
    },
    onUpdateuserinfo: function () {
      console.log(this.userinfo);
      let params = this.userinfo;
      console.log(params);
      var reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
      if (!reg.test(params.email)) {
        alert("请输入正确的邮箱地址");
        return;
      }
      reg = /0?(13|14|15|17|18|19)[0-9]{9}$/;
      if (!reg.test(params.phoneNumber)) {
        alert("请输入正确的手机号");
        return;
      }
      var ecnuid = params.ecnuId;
      if (ecnuid.length != 8) {
        //验证正确的学工号
        //8位为教师 9位为学生
        if (!(ecnuid.length == 11 && (ecnuid[0] == 1 || ecnuid[0] == 5))) {
          //1开头本科生 5开头研究生
          alert("请输入正确的学工号");
          return;
        }
      }
      MessageBox.confirm("确定信息修改无误?").then((action) => {
        modifyUserinfo(params).then((res) => {
          if ((res.message = "success")) {
            Toast({
              message: "信息修改成功",
              duration: 1000,
            });
            setInterval(function () {
              location.reload();
            }, 1000);
          }
        });
      });
    },
    loadUserinfo: function () {
      let params = { openId: this.openId };
      console.log(params);
      getUserinfo(params)
        .then((res) => {
          // console.log("用户信息", res.data);
          // console.log(res.data);
          this.userinfo = res.data;

          if (res.data == "该openId对应的用户不存在！") {
            Toast({
              message: "该openId对应的用户不存在！",
              duration: 1200,
            });
            var oldUrl = window.location.href.split("?")[0];
            // location.href = oldUrl + "register";
          }
          this.tag = res.data.tag;
          if (this.tag == 1) {
            //如果用户是管理员
            this.admin = true; //设置发布页可见
            this.tab_selected = "1";
            var tab = this.getCookie("tab_selected");
            if (tab != null) this.tab_selected = tab;
            this.person_selected = "1";
            tab = this.getCookie("person_selected");
            if (tab != null) this.person_selected = tab;
          } else {
            //普通学生
            this.admin = false; //设置发布页可见
            this.tab_selected = "2";
            var tab = this.getCookie("tab_selected");
            if (tab != null) this.tab_selected = tab;
            this.person_selected = "2";
            tab = this.getCookie("person_selected");
            if (tab != null) this.person_selected = tab;
          }
        })
        .catch((res) => {
          console.log(res.data);
          var oldUrl = window.location.href.split("?")[0];
          Toast({
            message: "获取用户详细信息失败",
            duration: 1200,
          });
          // location.href = oldUrl + "register";
        });
    },
    lastpage: function () {
      this.page = Math.max(1, this.page - 1);
      getAllActivity({ page: this.page }).then((res) => {
        this.activities = res.data.data;
      });
    },
    nextpage: function () {
      this.page = Math.min(20, this.page + 1);
      getAllActivity({ page: this.page }).then((res) => {
        this.activities = res.data.data;
      });
    },
    loadActivity: function () {
      getAllActivity({ page: this.page }).then((res) => {
        if (res.code == 200) this.activities = res.data.data;
      });
      getActivityHold({ openId: this.getCookie("openId") }).then((res) => {
        if (res.code == 200) this.holdActivities = res.data;
      });
      getActivityAc({ openId: this.getCookie("openId") }).then((res) => {
        if (res.code == 200) this.acActivities = res.data;
      });
    },
    loadTop: function () {
      console.log("loadTop");
      this.$refs.loadmore.onTopLoaded();
      location.reload();
    },
    loadBottom: function () {},
    onCreateActivity: function (e) {
      let params = {
        openId: this.openId,
        name: this.name,
        type: this.type,
        description: this.description,
        limits: this.limits,
        actTime: this.actTime,
        actDate: this.actDate,
        personAccount: this.personAccount,
        location: this.location,
        leader: this.leader,
        contact: this.contact,
        status: 0,
      };
      console.log(params);
      for (var i in params) {
        if (i == "status") continue;
        if (params[i] == "" || params[i] == null) {
          console.log(i);
          MessageBox({
            title: "提示",
            message: "活动还有未填项，请检查您的输入",
          });
          return;
        }
      }

      MessageBox.confirm("确定发布此活动?").then((action) => {
        holdActivity(params)
          .then((res) => {
            console.log(res);
            if (res.message == "success") {
              Toast({
                message: "活动创建成功",
                duration: 2000,
              });
              setInterval(function () {
                location.reload();
              }, 2000);
            } else {
              MessageBox({
                title: "提示",
                message: "活动创建失败",
              });
            }
          })
          .catch((res) => {
            MessageBox({
              title: "提示",
              message: "活动创建失败，请检查您的输入",
            });
          });
      });
    },
    // 截取URL字段
    GetQueryString: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    setCookie: function (cname, cvalue, extime) {
      // console.log(cname, cvalue, extime);
      this.$cookies.set(cname, cvalue, extime);
    },
    getCookie: function (cname) {
      var ret = this.$cookies.get(cname);
      // console.log(cname, ret);
      return ret;
    },
    getCode: function () {
      let url = window.location.search;
      if (url === "") {
        return false;
      }
      let code = url.match(/^\?code=(.+)&/)[1];
      return code;
    },
    getToken: function () {
      console.log("getToken");
      //判断是否有openid
      let appid = this.$appid,
        oldURL = window.location.href,
        SCOPE = "snsapi_base",
        url =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          appid +
          "&redirect_uri=" +
          oldURL +
          "&response_type=code&scope=" +
          SCOPE +
          "&state=1#wechat_redirect";
      window.location.href = url;
    },
  },
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
</style>
