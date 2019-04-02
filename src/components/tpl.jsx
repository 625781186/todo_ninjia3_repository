// -> Navbar-tree.vue methods
// dg_drag(dragging)
// {
//   this.dragging = dragging;
// }
// ,
// dg_enter(dragging, target)
// {
//   // this.expanded.push(target.id);
//   console.log("target.id:", target.id)
//   console.log("target", target)
// }
// ,
// dg_leave(dragging, target)
// {
//   this.over = null;
// }
// ,
// dg_hover(dragging, target)
// {
//   // let parent = this.findParent(dragging.id, this.tree);
//   // if (target.id !== parent.id) {
//   //   this.over = {id: target.id, mode: "append"};
//   // }
//   console.log("hover", (Math.random() * 100) + 1)
// }
// ,
// dg_drop(dragging, target)
// {
//   this.findParent(target.id)
//   /*
//   let parent = this.findParent(dragging.id, this.tree);
//   if (dragging.id !== target.id && target.id !== parent.id) {
//     let items = _.cloneDeep(this.tree);
//     // get dragging item (local copy!)
//     let item = this.findItem(dragging.id, items);
//     // remove from parent
//     let draggingParent = this.findParent(item.id, items);
//     let draggingIdx = draggingParent.children.findIndex(
//       sibling => sibling === item
//     );
//     draggingParent.children.splice(draggingIdx, 1);
//
//     // find target (local copy!)
//     target = this.findItem(target.id, items);
//     // add to target (local copy!)
//     target.children.push(item);
//
//     // sort
//     if (this.config.options.ddAppendOnly) {
//       target.children.sort((a, b) =>
//         a["text"].localeCompare(b["text"], undefined, {
//           sensitivity: "base"
//         })
//       );
//     }
//
//     // expand target
//     if (this.expanded.indexOf(target.id) === -1) {
//       this.expanded.push(target.id);
//     }
//   }
//   this.over = null;
//   */
// }
// ,
// findParent(id)
// {
//   console.log("target.id:", id)
//   // const root = item[0].children
//   // const L = root.length
//   // for (let i = 0; i < L; i++) {
//   //   console.log(`len${L}-${i}`, "dg_drop:", root[i])
//   // }
// }
// ,
// ->

/**<!--<v-treeview-->
        <!--:items="items"-->
        <!--:search="search"-->
        <!--:filter="filter"-->
        <!--:open.sync="open"-->
        <!--open-on-click-->
        <!--hoverable-->
        <!--open-all-->
        <!--&gt;-->
        <!--tree item组-->
        <!--<template slot="label" slot-scope="{ item }">-->
        <!--<DragDropSlot-->
        <!--:class="['tree-item', (over && over.id === item.id ? over.mode : '')]"-->
        <!--:key="item.id"-->
        <!--:item="item"-->
        <!--@drag="dg_drag"-->
        <!--@enter="dg_enter"-->
        <!--@leave="dg_leave"-->
        <!--@hover="dg_hover"-->
        <!--@drop="dg_drop"-->
        <!--@click.native="onItemClick"-->
        <!--@mouseenter.native="mouseEvent(isEnter=true)"-->
        <!--@mouseleave.native="mouseEvent(isEnter=false)"-->
        <!--&gt;-->
        <!--<v-icon v-if="item.children" v-text="`${item.id === 1 ? 'folder' : 'folder_open'}`"></v-icon>-->

        <!--<span v-html="item.name"></span>-->
        <!--</DragDropSlot>-->
        <!--</template>-->
        <!--后置按钮组-->
        <!--<template slot="prepend" slot-scope="{ item }">-->
        <!--&lt;!&ndash;<v-btn fab small-->
        <!--slot="append"-->
        <!--@click.stop="onAddBtnClick(item)">-->
        <!--<v-icon >add</v-icon>-->
        <!--</v-btn>-->

        <!--<v-btn fab small>-->
        <!--<v-icon>delete</v-icon>-->
        <!--</v-btn>&ndash;&gt;-->
        <!--<v-btn-toggle>-->
        <!--<v-btn active-class="" @click.stop="onAddBtnClick(item)">-->
        <!--<v-icon>add</v-icon>-->
        <!--</v-btn>-->
        <!--<v-btn active-class="" @click.stop="onDelBtnClick(item)">-->
        <!--<v-icon>delete</v-icon>-->
        <!--</v-btn>-->
        <!--</v-btn-toggle>-->
        <!--</template>-->
        <!--</v-treeview>-->*/
var mytpl =function(...args) {
  console.log("args")
  let {0: node, 2: parent, 3: index} = args
  let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
  if (node.searched) titleClass += ' node-searched'

  return <span >
           <v-btn fab small onClick = {() => this.$refs.tree1.addNode(node, {title: 'sync node'})}>
             <v-icon> add </v-icon>
           </v-btn>
           <v-btn fab small onClick = {()=> this.asyncLoad1(node) }>
             <v-icon> update </v-icon>
           </v-btn>
           <v-btn fab small onClick = {() => this.$refs.tree1.delNode(node, parent, index)}>
             <v-icon> delete </v-icon>
           </v-btn>
           <span class={titleClass}
             domPropsInnerHTML = {node.title}
             onClick = {()=>{this.$refs.tree1.nodeSelected(node)}}>
           </span>
           </span>
}

export  {mytpl}
