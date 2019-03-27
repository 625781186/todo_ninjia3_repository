/*
包含n个用于间接更新状态的方法的对象模块
 */

import * as t from './mutation-types'

export default {

  add({commit}, searchName) {
    // 提交mutation: 更新状态(请求中)
    commit(t.AddTree)

  }
}
