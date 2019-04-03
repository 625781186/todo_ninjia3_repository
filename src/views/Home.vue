<template>
  <div id="home" class="home">
    <div id="toolBar" style="position: fixed">
      <Col>

        <v-list>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn center small icon
                     @click="onSave"
                     v-on="on">
                <v-icon>save</v-icon>
              </v-btn>
            </template>
            <span>Top tooltip</span>
          </v-tooltip>
          <v-btn small icon
                 @mouseenter="popMenu"
                 @mouseleave="onLeaveBtn">
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn small icon>
            <v-icon>sync</v-icon>
          </v-btn>
          <v-btn small icon>
            <v-icon>add</v-icon>
          </v-btn>

        </v-list>

      </Col>
    </div>
    <Row style="margin-left:38px">

      <Col id="content" :xs="16" :sm="18" :md="20">
        <h1 style="text-align: center">Home</h1>
        <!--<example01></example01>-->
        <template>
          <h2 id="code_0">Code</h2>
          <v-layout>

            <example02 style="float:left;width:49%"></example02>
            <v-spacer style="float:left;width:2%;min-width: 5px"><br></v-spacer>
            <example02 style="float:left;width:49%"></example02>

          </v-layout>
        </template>

        <h2 id="code_1">Code</h2>
        <example03></example03>
        <h2 id="code_2">Code</h2>
      </Col>
      <Col id="AnchorLink" :xs="8" :sm="6" :md="4"
           style="padding-left: 10px"
           affix>
        <template>
          <Affix :offset-top="60">
            <Anchor :affix="false" show-ink>
              <AnchorLink href="#home" title="Basic Usage">

                <AnchorLink href="#code_0" title="code_0"/>
                <AnchorLink href="#code_1" title="code_1"/>
                <AnchorLink href="#code_2" title="code_2"/>
              </AnchorLink>
            </Anchor>
          </Affix>
        </template>
      </Col>
    </Row>
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
            @click="onSave"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </template>

  </div>
</template>

<script>

  import all from '../components/examples'

  const {example01, example02, example03, example14} = all; // Works
  export default {
    data() {
      return {
        //menu
        showMenu: false,
        x: 0,
        y: 0,
        items: [
          {title: 'Click Me', link: "/about"},
          {title: 'Click Me', link: "/about"},
          {title: 'Click Me', link: "/about"},
          {title: 'Click Me 2', link: "/about"}
        ],
      }
    },
    components: {
      example01,
      example02,
      example03,
      example14
    },
    methods: {
      onSave() {
        alert("save")
      },
      popMenu(e) {

        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      },
      onLeaveBtn() {

      },
    }
  }
</script>
<style>
  #toolBar {
    max-width: 34px
  }

  #toolBar .v-btn {
    margin: 3px;
  }

  .ivu-affix {
    left: initial !important;
  }
</style>
