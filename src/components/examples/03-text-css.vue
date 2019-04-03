<template>
  <v-card>
    <v-card-actions>
      <div class="v-subhead">
        <span>mode: {{ cmOption.mode }}</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span>theme: {{ cmOption.theme }}</span>
      </div>
      <v-btn class="v-icon-btn"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/03-text-css.vue">
        <v-icon>code</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-media>
      <div class="codemirror">
        <!-- codemirror -->
        <codemirror v-model="code" :options="cmOption"></codemirror>
      </div>
    </v-card-media>
  </v-card>
</template>

<script>

  // language
  import 'codemirror/mode/css/css.js'

  // theme css
  import 'codemirror/theme/paraiso-light.css'

  // require active-line.js
  import'codemirror/addon/selection/active-line.js'

  export default {
    data() {
const code =
`/* Some example CSS */

@import url("something.css");

body {
  margin: 0;
  padding: 3em 6em;
  font-family: tahoma, arial, sans-serif;
  color: #000;
}

#navigation a {
  font-weight: bold;
  text-decoration: none !important;
}

h1 {
  font-size: 2.5em;
}

h2 {
  font-size: 1.7em;
}

h1:before, h2:before {
  content: "::";
}

code {
  font-family: courier, monospace;
  font-size: 80%;
  color: #418A8A;
}`
      return {
        code,
        cmOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: 'text/css',
          theme: 'paraiso-light'
        }
      }
    }
  }
</script>

