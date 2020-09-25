<template>
  <div>
    <mt-header title="个人信息填写">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    {{msg}}
    <mt-field label="姓名" placeholder="请输入姓名" v-model="name"></mt-field>
    <mt-field label="学号" placeholder="请输入学号" v-model="ecnuId"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" v-model="phoneNumber"></mt-field>
    <mt-field label="邮箱" placeholder="请输入邮箱" v-model="email"></mt-field>
    <mt-field label="邀请码" placeholder="请输入邀请码（没有请留空）" v-model="inviteCode"></mt-field>
    <button @click="onClick" class="mint-button mint-button--primary mint-button--large">确认</button>
    <!-- <button @click="onCancel" class="mint-button mint-button--primary mint-button--large">取消报名</button> -->
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { modifyUserinfo, userRegister, modifyUsertag } from "../../request/api"; // 导入我们的api接口
export default {
  name: "RegisterPage",
  data() {
    return {
      msg: "Welcome to Register Page",
      name: "",
      ecnuId: "",
      phoneNumber: "",
      email: "",
      inviteCode: "",
      openId: "",
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
    console.log("register created");
    // console.log(this.openId)
    this.openId = this.getCookie("openId");
  },
  methods: {
    onClick: function() {
      console.log("onClick");
      console.log(
        this.name,
        this.ecnuId,
        this.phoneNumber,
        this.email,
        this.openId,
        this.inviteCode
      );
      var reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
      if (!reg.test(this.email)) {
        alert("请输入正确的邮箱地址");
        return;
      }
      reg = /0?(13|14|15|17|18|19)[0-9]{9}$/;
      if (!reg.test(this.phoneNumber)) {
        alert("请输入正确的手机号");
        return;
      }
      var ecnuid = this.ecnuId;
      if (ecnuid.length != 8) {
        //验证正确的学工号
        //8位为教师 9位为学生
        if (!(ecnuid.length == 11 && (ecnuid[0] == 1 || ecnuid[0] == 5))) {
          //1开头本科生 5开头研究生
          alert("请输入正确的学工号");
          return;
        }
      }
      let params = { openId: this.openId };
      MessageBox.confirm("确定注册用户?").then(action => {
        console.log("register request", params);
        userRegister(params).then(res => {
          if (res.message == "success") {
            params.name = this.name;
            params.ecnuId = this.ecnuId;
            params.phoneNumber = this.phoneNumber;
            params.email = this.email;
            console.log(params);
            modifyUserinfo(params).then(res => {
              if ((res.message = "success")) {
                // var oldUrl = window.location.href.split("?")[0];
                // this.$router.go(-1);
                if (this.inviteCode == "2020ecnucs") {
                  params.tag = 1;
                  modifyUsertag(params).then(res => {
                    console.log(res);
                    alert("邀请码填写正确");
                  });
                } else if (
                  this.inviteCode != "" &&
                  this.inviteCode != "2020ecnucs"
                ) {
                  alert("邀请码填写错误");
                }
                this.$router.push({ path: "/" });
              }
            });
          }
        });
      });
    },
    setCookie: function(cname, cvalue, extime) {
      // console.log(cname, cvalue, extime);
      this.$cookies.set(cname, cvalue, extime);
    },
    getCookie: function(cname) {
      var ret = this.$cookies.get(cname);
      // console.log(cname, ret);
      return ret;
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
