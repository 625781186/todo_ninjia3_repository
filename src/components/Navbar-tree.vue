<template>
  <!-- tab Item Content -->
  <div>
    <v-card class="mx-auto" style="top:5px;">

      <v-sheet class="pa-3 primary lighten-2">
        /*搜索目录框*/
        <v-text-field
          v-model="search"
          label="Search Company Directory"
          dark
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="close-circle-outline"
        ></v-text-field>
        /*匹配大小写*/
        <v-checkbox v-model="caseSensitive" dark hide-details label="Case sensitive search"></v-checkbox>
      </v-sheet>
      <!--  -->
      <v-card-text>
        <v-treeview
          :items="items"
          :search="search"
          :filter="filter"
          :open.sync="open"
          open-on-click
          hoverable
          open-all
        >
          /*tree item组*/
          <template slot="label" slot-scope="{ item }">
            <DragDropSlot
              :class="['tree-item', (over && over.id === item.id ? over.mode : '')]"
              :key="item.id"
              :item="item"
              @drag="dg_drag"
              @enter="dg_enter"
              @leave="dg_leave"
              @hover="dg_hover"
              @drop="dg_drop"
              @click.native="onItemClick"
              @mouseenter.native="mouseEvent(isEnter=true)"
              @mouseleave.native="mouseEvent(isEnter=false)"
            >
              <v-icon v-if="item.children" v-text="`${item.id === 1 ? 'folder' : 'folder_open'}`"></v-icon>

              <span v-html="item.name"></span>
            </DragDropSlot>
          </template>
          /*后置按钮组*/
          <template slot="prepend" slot-scope="{ item }">
            <!--<v-btn fab small
            slot="append"
            @click.stop="onAddBtnClick(item)">
            <v-icon >add</v-icon>
            </v-btn>

            <v-btn fab small>
            <v-icon>delete</v-icon>
            </v-btn>-->
            <v-btn-toggle>
              <v-btn active-class="" @click.stop="onAddBtnClick(item)">
                <v-icon>add</v-icon>
              </v-btn>
              <v-btn active-class="" @click.stop="onDelBtnClick(item)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-treeview>
        <!-- /*BOX*/
        <template>
        <div>
        <div style="overflow: hidden; clear: both">
        <Dustbin></Dustbin>
        </div>
        <div style="overflow: hidden; clear: both">
        <Box @click="mouseEvent" name="Glass"/>
        <Box @mouseenter="mouseEvent" @mouseleave="mouseEvent" name="Banana"/>
        <Box name="Paper"/>
        </div>
        </div>
     </template>-->
      </v-card-text>
    </v-card>
    <template>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Delete Artcle?</v-card-title>
            <v-card-text>删除的文章会在垃圾桶 , 保留7天.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="onDelBtnClick(0)">Disagree</v-btn>
              <v-btn color="green darken-1" flat @click="onDelBtnClick(1)">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </div>
</template>

<script>

  import DragDropSlot from "./Navbar-tree-drop.vue"
  import Dustbin from './dnd_exmple1/Dustbin'
  import Box from './dnd_exmple1/Box'
  import {DragDropContext} from 'vue-react-dnd'
  import HTML5Backend from 'react-dnd-html5-backend'
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {

    components: {DragDropSlot, Dustbin, Box},

    mixins: [DragDropContext(HTML5Backend)],
    data() {
      return {
        open: [1, 2],
        //
        search: null,
        caseSensitive: false,
        //
        over: null,
        //
        isMouseEnter: false,
        //
        dialog: false,
        cItem: null,
      };
    },

    methods: {

      dg_drag(dragging) {
        this.dragging = dragging;
      }
      ,
      dg_enter(dragging, target) {
        // this.expanded.push(target.id);
          console.log("target.id:", target.id)
        console.log("target", target)
      }
      ,
      dg_leave(dragging, target) {
        this.over = null;
      }
      ,
      dg_hover(dragging, target) {
        // let parent = this.findParent(dragging.id, this.tree);
        // if (target.id !== parent.id) {
        //   this.over = {id: target.id, mode: "append"};
        // }
        console.log("hover", (Math.random() * 100) + 1)
      }
      ,
      dg_drop(dragging, target) {
        this.findParent(target.id)
        /*
        let parent = this.findParent(dragging.id, this.tree);
        if (dragging.id !== target.id && target.id !== parent.id) {
          let items = _.cloneDeep(this.tree);
          // get dragging item (local copy!)
          let item = this.findItem(dragging.id, items);
          // remove from parent
          let draggingParent = this.findParent(item.id, items);
          let draggingIdx = draggingParent.children.findIndex(
            sibling => sibling === item
          );
          draggingParent.children.splice(draggingIdx, 1);

          // find target (local copy!)
          target = this.findItem(target.id, items);
          // add to target (local copy!)
          target.children.push(item);

          // sort
          if (this.config.options.ddAppendOnly) {
            target.children.sort((a, b) =>
              a["text"].localeCompare(b["text"], undefined, {
                sensitivity: "base"
              })
            );
          }

          // expand target
          if (this.expanded.indexOf(target.id) === -1) {
            this.expanded.push(target.id);
          }
        }
        this.over = null;
        */
      }
      ,
      findParent(id) {
        console.log("target.id:", id)
        // const root = item[0].children
        // const L = root.length
        // for (let i = 0; i < L; i++) {
        //   console.log(`len${L}-${i}`, "dg_drop:", root[i])
        // }
      }
      ,
      mouseEvent(isEnter) {
        if (isEnter === true) {
          console.log("enter", (Math.random() * 100) + 1)
        }
        else
          console.log("leave", (Math.random() * 100) + 1)
        this.isMouseEnter = isEnter
      }
      ,
      onItemClick() {
        console.log("item click")
      },
      onAddBtnClick(item) {
        console.log(item)
      },
      onDelBtnClick(item) {
        if (item === 0) {
          this.dialog = false

          console.log("cancel")
        }
        else if (item === 1) {
          this.dialog = false
          if (this.cItem.parent != null) {
            this.cItem.parent.pop(this.cItem)
          }
          console.log("delete")
        }
        else {
          this.dialog = true
          console.log(item)
          this.cItem = item
        }
      },
    },

    computed: {
      // vuex 映射属性
      ...mapState(['items']),
      // ...mapGetters(['getItems']),
      // 普通方法
      filter() {
        return undefined
        // return this.caseSensitive
        //   ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        //   : undefined;
      }
    },

    mounted() {

      // this.items = this.$store.state.items
    }
  };
</script>

<style>
  .v-window {
    height: 100%;
    padding-bottom: 40px;
    overflow: auto;
    box-sizing: border-box;
  }

  .v-treeview-node__content .v-btn {
    display: none;
  }

  .v-treeview-node__content:hover .v-btn {
    display: inherit;
  }

  .v-treeview-node__content:hover .v-btn:hover {
    color: red;
  }


</style>





