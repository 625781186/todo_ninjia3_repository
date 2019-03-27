// export default {}

// class Point {
//   constructor(x, y) {
//     this.x = x
//     this.y = y
//   }
//
//   toString() {
//     return `( ${this.x}, ${this.y} )`
//   }
//
//   toValue() {
//     return this.x + this.y
//   }
// }
//
// var p = new Point(1, 2)
// console.log(p.toString())
// //"(1,2)"
// console.log(p.toValue())


// Object.prototype.toString.call(obj) => 13种类型全区分
// Object.defineProperty(obj,prop,{value:v,writable: true}) => setattr
// SubClass instanceof BaseClass => isinstance(SubClass,BaseClass)


class JsonTreeItem extends Map{
  __getType(obj) {
    return Object.prototype.toString.call(obj)
  }

  constructor(parent = null) {
    super()
    this.mParent = parent
    this.mChilds = []
    this.mType = null
    this.name = null
    // this.id = null
  }

  appendChild(item) {
    this.mChilds.push(item)
  }

  child(row) {
    console.log(row)
    return this.mChilds[row]
  }

  parent() {
    return this.mParent
  }

  childCount() {
    return this.mChilds.length
  }

  row() {
    if (this.mParent != null) {
      return this.mParent.mChilds.index()
    }
    return 0
  }

  setKey(key) {
    this.mkey = key
  }

  setValue(value) {
    this.name = value
  }

  setType(type) {
    this.mType = type
  }

  key() {
    return this.mkey
  }

  value() {
    return this.name
  }

  type() {
    return this.mType
  }

  load(value_, parent = null) {
    let rootItem = new JsonTreeItem(parent)
    // rootItem.setKey('root')
    let value_type = this.__getType(value_)

    // # process the key / value pair
    if (value_type === "[object Object]") {

      for (let key in value_) {
        var v = value_[key]
        Object.defineProperty(this, key.toString(), {value: v, writable: true})
        if (this.hasOwnProperty("children") && this.children.length > 0) {
          var child = this.load(v, rootItem)
          rootItem.appendChild(child)
        }

      }
    }
    // # process the values in the list
    else if (value_type === "[object Array]") {

      value_.forEach((v, i) => {
        var child = this.load(v, rootItem)
        // child.setKey(i)
        // child.setType(this.__getType(v))
        rootItem.appendChild(child)
      });
    }
    // # value is processed rootItem.setValue(value)
    else {
      rootItem.setValue(value_)
      rootItem.setType(this.__getType(value_))
    }
    return rootItem

  }
}

// var p = new JsonTreeItem(2)
// console.log(p.parent())
// console.log(p.child())
// console.log(p.childCount())

// "(1,2)"
// console.log(p.toValue())
mRootItem = new JsonTreeItem()
json =
  {
    id: 1,
    parent:
      null,
    name:
      "Vuetify Human Resources",
    children:
      [
        {
          id: 11,
          parent: 1,
          name: "Core team",
          children: [
            {
              id: 111,
              parent: 11,
              name: "John"
            }, {
              id: 112,
              parent: 11,
              name: "Kael"
            },

          ],

        },
        {
          id: 12,
          parent: 1,
          name: "Administrators",
          children: [
            {
              id: 121,
              parent: 12,
              name: "Ranee"
            },
            {
              id: 122,
              parent: 12,
              name: "Rachel"
            }
          ]
        },
      ]
  }


mRootItem = mRootItem.load(json)
console.log(mRootItem)

//1->mRootItem
