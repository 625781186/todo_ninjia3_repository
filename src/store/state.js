/*
状态对象模块
 */
export default {
  items: [
    {
      id: 1,
      parent: null,
      name: "这是一个文件夹",

      children: [
        {
          id: 11,
          parent: 1,
          name: "一段很长很长很长很长很长很长很长的文字",
          children: [
            {
              id: 111,
              parent: 11,
              name: "一段很很长的文字"
            },
            {
              id: 112,
              parent: 11,
              name: "举头望明月"
            },

          ],
        }
      ]
    }
    // {
    //   id: 1,
    //   parent: null,
    //   name: "Vuetify Human Resources",
    //   icon:"home",
    //   children: [
    //     {
    //       id: 11,
    //       parent: 1,
    //       name: "Core team",
    //       children: [
    //         {
    //           id: 111,
    //           parent: 11,
    //           name: "John"
    //         },
    //         {
    //           id: 112,
    //           parent: 11,
    //           name: "Kael"
    //         },
    //
    //       ],
    //
    //     },
    //     {
    //       id: 12,
    //       parent: 1,
    //       name: "Administrators",
    //       children: [
    //         {
    //           id: 121,
    //           parent: 12,
    //           name: "Ranee"
    //         },
    //         {
    //           id: 122,
    //           parent: 12,
    //           name: "Rachel"
    //         }
    //       ]
    //     },
    //
    //   ]
    // }
  ]
}
