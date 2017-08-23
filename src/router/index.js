import Vue from 'vue'
import VueRouter from 'vue-router'
import ListView from '../views/List.vue'
import PostView from '../views/Post.vue'
import NProgress from 'nprogress'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: ListView
  },
  {
    path: '/post/:hash',
    name: 'post',
    component: PostView
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
})
router.afterEach(route => {
  NProgress.done();
})

export default router;
