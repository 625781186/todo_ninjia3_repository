// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
// vuetify UI库
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify, {
  iconfont: 'md',
})

// iview UI库
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

//vtree 树视图插件
import 'vue-tree-halower/dist/halower-tree.min.css' // 你可以自定义树的样式
import VTree from 'vue-tree-halower'
Vue.use(VTree)

//vue-codemirror 代码编辑器
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodemirror, /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)

// vuex步骤2. 映射路由
import store from './store/store.js'
Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
