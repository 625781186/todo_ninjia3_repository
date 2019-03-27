/*
包含n个用于直接更新状态的方法的对象模块
 */

import * as t from './mutation-types'

export default {


  [t.AddTree](state) {
    state.items.push({id:5,name: "hh", children: [{id:66,name: "aa"}, {id:77,name: "bb"}]})
    console.log(state.items)
    // console.log("mutations", state.items)

  },

}
