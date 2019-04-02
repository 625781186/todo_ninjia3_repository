<template>
  <!-- tab Item Content -->
  <div>
    <v-card class="mx-auto" style="top:5px;">

      <v-sheet class="pa-3 primary lighten-2">
        /*搜索目录框*/
        <v-text-field
          v-model="searchword"
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

        <v-tree id="tree" ref='tree1' :canDeleteRoot="true" :data='treeData1'
                :draggable='true' :tpl="tpl" :halfcheck='true'
                :multiple="true" />

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
    <!--Dialog-->
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
    <!--Menu-->
    <template>
      <v-menu
        v-model="showMenu"
        :position-x="x"
        :position-y="y"
        absolute
        offset-y
      >
        <v-list>
          <v-list-tile

            v-for="(item, index) in items"
            :key="index"
            @click="menuItemClick"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
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
        searchword: '',
        caseSensitive: false,
        //
        over: null,
        //
        isMouseEnter: false,
        //dialog
        dialog: false,
        cNodeInfo: {cNode: "", cParent: "", cIndex: ""},

        //node
        initSelected: ['node-1'],
        treeData1: [{
          title: 'node1',
          expanded: true,
          children: [{
            title: 'node 1-1',
            expanded: true,
            children: [{
              title: 'node 1-1-1'
            }, {
              title: 'node 1-1-2'
            }, {
              title: 'node 1-1-3'
            }]
          }, {
            title: 'node 1-2',
            children: [{
              title: "<span style='color: red'>node 1-2-1</span>"
            }, {
              title: "<span style='color: red'>node 1-2-2</span>"
            }]
          }]
        }],
        //menu
        showMenu: false,
        x: 0,
        y: 0,
        items: [
          {title: 'Click Me',link:"/about"},
          {title: 'Click Me',link:"/about"},
          {title: 'Click Me',link:"/about"},
          {title: 'Click Me 2',link:"/about"}
        ],
      }
    },

    methods:
      {
        onAddBtnClick(item) {
          console.log(item)
        }
        ,
        onDelBtnClick(...args) {
          // node, parent, index

          if (args.length > 1) {
            // 别删， bug存疑
            // var c = this.cNodeInfo
            // console.log(c)
            [this.cNodeInfo.cNode,
              this.cNodeInfo.cParent,
              this.cNodeInfo.cIndex] = args
            var node = this.cNodeInfo.cNode
          }
          else {
            var node = args[0]
          }


          if (node === 0) {
            this.dialog = false

            console.log("cancel")
          }
          else if (node === 1) {
            let c = this.cNodeInfo
            this.dialog = false
            this.$refs.tree1.delNode(c.cNode, c.cParent, c.cIndex)

            console.log("delete")
          }
          else {
            this.dialog = true
          }

        }
        ,
        nodechecked(node, v) {
          alert('that a node-check envent ...' + node.title + v)
        },

                async asyncLoad1(node) {
          const {checked = false} = node
          this.$set(node, 'loading', true)
          let pro = new Promise(resolve => {
            setTimeout(resolve, 2000, ['async node1', 'async node2'])
          })
          this.$refs.tree1.addNodes(node, await pro)
          this.$set(node, 'loading', false)
          if (checked) {
            this.$refs.tree1.childCheckedHandle(node, checked)
          }
        },
        async asyncLoad2(node) {
          const {checked = false} = node
          this.$set(node, 'loading', true)
          let pro = await new Promise(resolve => {
            setTimeout(resolve, 2000, [{title: 'test1', async: true}, {title: 'test2', async: true}, {title: 'test3'}])
          })
          if (!node.hasOwnProperty('children')) {
            this.$set(node, 'children', [])
          }
          node.children.push(...pro)
          this.$set(node, 'loading', false)
          if (checked) {
            this.$refs.tree2.childCheckedHandle(node, checked)
          }
        },
        // tpl (node, ctx, parent, index, props) {
        tpl(...args) {
          let {0: node, 2: parent, 3: index} = args
          let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
          if (node.searched) titleClass += ' node-searched'
          // <v-btn fab small onClick = {() => this.$refs.tree1.delNode(node, parent, index)}>
          return   <span >
                   <v-btn fab small onClick = {() => this.$refs.tree1.addNode(node, {title: 'sync node'})}>
                     <v-icon> add </v-icon>
                   </v-btn>
                   <v-btn fab small onClick = {()=> this.asyncLoad1(node) }>
                     <v-icon> update </v-icon>
                   </v-btn>

                   <v-btn fab small onClick = {() => this.onDelBtnClick(node, parent, index)}>
                     <v-icon> delete </v-icon>
                   </v-btn>

                   <span class={titleClass}
                     domPropsInnerHTML = {node.title}

                     onContextmenu = {()=>{this.onNodeRelease(event,node)}}>
                   </span>
                   </span>
        }
        ,
        // onMouseup = {()=>{this.onNodeRelease(event,node)}}>

        search() {
          this.$refs.tree1.searchNodes(this.searchword)
        },
      // -------------Menu Function------------- ↓
        onNodePress(event, node) {
          if (event.button == 0) {
            console.log("左键")
            // this.$refs.tree1.nodeSelected(node)
          }
          // else if (event.button == 1) {
          //   console.log("中键")
          // }
          else if (event.button == 2) {
            console.log("右键")
            event.preventDefault()
            this.popMenu(event)
          }

        },
        onNodeRelease(event, node){
          event.preventDefault()
          event.stopPropagation()
          console.log("relase")
          if (event.button == 0) {
            console.log("左键")
            // this.$refs.tree1.nodeSelected(node)
          }
          else if (event.button == 2) {
            console.log("右键")
            this.popMenu(event)
          }
          // else if (event.button == 1) {
          //   console.log("中键")
          // }
        },
        popMenu(e) {
          e.stopPropagation()
          e.preventDefault()
          this.showMenu = false
          this.x = e.clientX
          this.y = e.clientY
          this.$nextTick(() => {
            this.showMenu = true
          })
        },
        menuItemClick(){
          this.$router.push(
            {path:"/about"}
          )
          console.log("menu")
        },
      // -------------Menu Function------------- ↑

      }
    ,

    computed: {
      // vuex 映射属性

      // ...mapState(['items']),
      // ...mapGetters(['getItems']),
      // 普通方法
      filter() {
        return undefined
        // return this.caseSensitive
        //   ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        //   : undefined;
      }
    }
    ,

    mounted() {

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

  /*.v-treeview-node__content .v-btn {*/
  /*display: none;*/
  /*}*/

  .tree-node-el .v-btn--small {
    width: 20px;
    height: 20px;
  }

  .tree-node-el .v-btn {
    margin: 3px;
    display: none;

  }

  .tree-node-el:hover .v-btn {
    display: inherit;
  }
  .tree-node-el .v-btn .v-icon{
    display: flex;
  }

  .tree-node-el:hover .v-btn:hover {
    color: red;
  }

  .tree-node-el{
      white-space: nowrap;
    /*height: 20px;*/
  }
  .tree3 {
    float: left;
    width: 33%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px dotted #ccccdd;
    overflow: auto;
    height: 800px;
  }

  .treebtn1 {
    background-color: transparent;
    border: 1px solid #ccc;
    padding: 1px 3px;
    border-radius: 5px;
    margin-right: 5px;
    color: rgb(148, 147, 147);
  }

  .treebtn2 {
    /*background-color: transparent;*/
    /*border: 1px solid #ccc;*/
    /*padding: 3px 5px;*/
    /*border-radius: 5px;*/
    /*margin-left: 5px;*/
    /*color: rgb(97, 97, 97);*/
  }

  .treebtn3 {
    /*background-color: transparent;*/
    /*border: 1px solid #ccc;*/
    /*padding: 3px 5px;*/
    /*border-radius: 5px;*/
    /*margin-left: 5px;*/
    /*color: rgb(63, 63, 63);*/
  }

  /*.tree-search-input{*/
  /*width: 70%;*/
  /*padding: 6px 8px;*/
  /*outline: none;*/
  /*border-radius: 6px;*/
  /*border:1px solid #ccc;*/
  /*}*/
  /*.tree-search-btn{*/
  /*width: 25%;*/
  /*padding: 6px 8px;*/
  /*outline: none;*/
  /*border-radius: 6px;*/
  /*background-color: rgb(218, 218, 218);*/
  /*border:1px solid rgb(226, 225, 225);*/
  /*color: rgb(117, 117, 117);*/
  /*}*/

  .halo-tree {
    padding-left: 0
  }
</style>





