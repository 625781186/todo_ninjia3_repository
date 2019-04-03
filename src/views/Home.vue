<template>
  <div class="home">
    <Row>
      <Col id="toolBar" span="1">
        <v-list >

          <v-btn icon @click="onSave">
            <v-icon>save</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>add2</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>add3</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>add4</v-icon>
          </v-btn>

        </v-list>
      </Col>
      <Col id="content" span="20">
        <h1>Home</h1>
        <!--<example01></example01>-->
        <!--<v-layout row wrap>-->
        <Row >

          <Col span="12">
            <example02></example02>
          </Col>
          <v-spacer ></v-spacer>
          <Col span="12">
            <example02></example02>
          </Col>
        </Row>
        <!--</v-layout>-->
        <example14></example14>
      </Col>
      <Col span="3">
        <template>
          <Anchor :affix="false" show-ink>
            <AnchorLink href="#basic_usage" title="Basic Usage"/>
            <AnchorLink href="#static_position" title="Static Position"/>
            <AnchorLink href="#API" title="API">
              <AnchorLink href="#Anchor_props" title="Anchor props"/>
              <AnchorLink href="#Anchor_events" title="Anchor events"/>
              <AnchorLink href="#AnchorLink_props" title="AnchorLink props"/>
            </AnchorLink>
          </Anchor>
        </template>
      </Col>
    </Row>

  </div>
</template>

<script>

  import all from '../components/examples'

  const {example01, example02, example14} = all; // Works
  export default {
    components: {
      // example01,
      example02,
      example14
    },
    methods:{
      onSave(){
        alert("save")
      },
    }
  }
</script>
