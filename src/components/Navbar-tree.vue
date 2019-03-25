<template>
  <!-- tab Item Content -->
  <div>
    <v-card class="mx-auto" style="top:5px;">
      <!--  -->
      <v-sheet class="pa-3 primary lighten-2">
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
        <v-checkbox v-model="caseSensitive" dark hide-details label="Case sensitive search"></v-checkbox>
      </v-sheet>
      <!--  -->
      <v-card-text>
        <!-- :items="items" -->
        <v-treeview
          :items="items"
          :search="search"
          :filter="filter"
          :open.sync="open"
          open-on-click
          hoverable
          open-all
        >
          <!-- <draggable v-model="items"  @start="drag = true" @end="drag = false"> -->
          <!--<template v-slot:prepend="{ item }">-->
            <!--<v-icon v-if="item.children" v-text="`${item.id === 1 ? 'folder' : 'folder_open'}`"></v-icon>-->
          <!--</template>-->
          <!-- </draggable> -->

          <template slot="label" slot-scope="{ item }">
          <dragdropslot
          :class="['tree-item', (over && over.id === item.id ? over.mode : '')]"
          :key="item.id"
          :item="item"
          @drag="drag"
          @enter="enter"
          @leave="leave"
          @hover="hover"
          @drop="drop"
          >
          <!--<icon :config="item" size="17"/>-->
          <span v-html="item.name"></span>
          </dragdropslot>
          </template>
        </v-treeview>

        <template>
          <div>
            <div style="overflow: hidden; clear: both">
              <Dustbin></Dustbin>
            </div>
            <div style="overflow: hidden; clear: both">
              <Box name="Glass"/>
              <Box name="Banana"/>
              <Box name="Paper"/>
            </div>
          </div>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import draggable from "vuedraggable"
  import dragdropslot from "./Navbar-tree-drop.vue"
  import Dustbin from './Dustbin'
  import Box from './Box'
  import {DragDropContext} from 'vue-react-dnd'
  import HTML5Backend from 'react-dnd-html5-backend'

  export default {
    components: {draggable, dragdropslot, Dustbin, Box},

    mixins: [DragDropContext(HTML5Backend)],
    data() {
      return {
        items: [
          {
            id: 1,
            parent: null,
            name: "Vuetify Human Resources",
            children: [
              {
                id: 11,
                parent: 1,
                name: "Core team",
                children: [
                  {
                    id: 111,
                    parent: 11,
                    name: "John"
                  },
                  {
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
        ],
        open: [1, 2],
        search: null,
        caseSensitive: false,
        over: null
      };
    },
    methods: {
      setEvent() {
      }
      ,
      drag(dragging) {
        this.dragging = dragging;
      }
      ,
      enter(dragging, target) {
        // this.expanded.push(target.id);
        console.log("target.id:",target.id)
        console.log("target",target)
      }
      ,
      leave(dragging, target) {
        this.over = null;
      }
      ,
      hover(dragging, target) {
        // let parent = this.findParent(dragging.id, this.tree);
        // if (target.id !== parent.id) {
        //   this.over = {id: target.id, mode: "append"};
        // }
      }
      ,
      drop(dragging, target) {
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
      findParent(id){
        console.log("target.id:",id)
        // while true:
        //   null
        const root = item[0].children
        const L = root.length
        for(let i=0;i<L;i++){
          console.log(`len${L}-${i}`,"drop:",root[i])
        }
      }
      ,

    },

    computed: {
      filter() {
        return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined;
      }
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
</style>





