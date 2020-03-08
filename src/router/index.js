import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home'
import Room from '../views/Room'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/room",
    name: "Room",
    component: Room
  },
];

const router = new VueRouter({
  routes
});

export default router;
