import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import InfoPage from "@/components/InfoPage"
import MainPage from "@/components/MainPage"
import RegisterPage from "@/components/RegisterPage"
import SignupPage from "@/components/SignupPage"
import DetailPage from "@/components/DetailPage"
import CheckPage from "@/components/CheckPage"
import MembersPage from "@/components/MembersPage"
import ShowPage from "@/components/ShowPage"
import MaintainPage from "@/components/MaintainPage"
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: MainPage
    },
    {
      path: "/register",
      name: "RegisterPage",
      component: RegisterPage
    },
    {
      path: "/signup/:activity_id",
      name: "SignupPage",
      component: SignupPage
    },
    {
      path: "/detail/:activity_id",
      name: "DetailPage",
      component: DetailPage
    },
    {
      path: "/check/:activity_id",
      name: "CheckPage",
      component: CheckPage
    },
    {
      path: "/members/:activity_id",
      name: "MembersPage",
      component: MembersPage
    },
    {
      path: "/maintain/:activity_id",
      name: "MaintainPage",
      component: MaintainPage
    },
    {
      path: "/info",
      name: "InfoPage",
      component: InfoPage
    },
    {
      path: "/show",
      name: "ShowPage",
      component: ShowPage
    },

  ]
});
