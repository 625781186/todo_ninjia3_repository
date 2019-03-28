// function mix(...mixins) {
//   class Mix {
//     constructor() {
//       for (let mixin of mixins) {
//         try {
//           copyProperties(this, new mixin());
//         }catch (e) {
//           copyProperties(this, mixin);
//         }// 拷贝实例属性
//       }
//     }
//   }
//
//   for (let mixin of mixins) {
//     copyProperties(Mix, mixin); // 拷贝静态属性
//     copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
//   }
//
//   return Mix;
// }
//
// function copyProperties(target, source) {
//   for (let key of Reflect.ownKeys(source)) {
//     if (key !== 'constructor'
//       && key !== 'prototype'
//       && key !== 'name'
//     ) {
//       let desc = Object.getOwnPropertyDescriptor(source, key);
//       Object.defineProperty(target, key, desc);
//     }
//   }
// }

// Object.prototype.toString.call(obj) => 13种类型全区分
// Object.defineProperty(obj,prop,{value:v,writable: true}) => setattr
// SubClass instanceof BaseClass => isinstance(SubClass,BaseClass)


function __getType(obj) {
  return Object.prototype.toString.call(obj)
}


function load(value_, parent = null, index = null) {

  // Item.setKey('root')
  let value_type = __getType(value_)
  // # process the key / value pair
  if (value_type === "[object Object]") {
    var Item =  Object()
    Item.parent = parent
    Item.index = index
    Item.id = Math.floor(Math.random()*100+1)
    Item.name  = Math.floor(Math.random()*100+1).toString()
    for (let key in value_) {
      var v = value_[key]
      // 如果是children键,值 [{},{},{}]

      if (key === "children") {
        let childArray = Item.loadValue(v, Item)
        Item[key] = childArray

      }
      else {
        Object.defineProperty(Item, key.toString(), {value: v, writable: true})
      }

      // if (this.hasOwnProperty("children")) {}
    }
  }
  // # process the values in the list
  else if (value_type === "[object Array]") {
    // value_=[{},{},{}]
    var Item =  Array()
    Item.parent = parent
    value_.forEach((v, i) => {
      // v = {} , i = index
      var childObject = Item.loadValue(v, Item, i)
      Item.push(childObject)
    });
  }
  // # value is processed Item.setValue(value)
  else {
    Item = new Object()
    // Item.setValue(value_)
    // Item.setType(__getType(value_))
  }
  return Item

}


Object.prototype.loadValue = load
Array.prototype.loadValue = load

const json =
  {
    id: 1,
    name: "这是一个文件夹",
    children: [
      {
        id: 11,
        name: "一段很长很长很长很长很长很长很长的文字",
        // children: [
        //   {
        //     id: 111,
        //
        //     name: "一段很很长的文字"
        //   },
        //   {
        //     id: 112,
        //
        //     name: "举头望明月"
        //   },
        // ],
      },
      {
        id: 12,
        name: "挺长的一端"
      }
    ]
  }


var mRootItem = new Object()
mRootItem = mRootItem.loadValue(json)
console.log(mRootItem)

// console.log(mRootItem.children[0])

//1->mRootItem
