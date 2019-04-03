<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>mode: {{ cmOption.mode }}</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span>theme: {{ cmOption.theme }}</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/06-python.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="codemirror">
        <!-- codemirror -->
        <codemirror v-model="code" :options="cmOption"></codemirror>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>

  // language
  import 'codemirror/mode/python/python.js'

  // theme css
  import 'codemirror/theme/base16-light.css'

  // require active-line.js
  import'codemirror/addon/selection/active-line.js'

  // closebrackets
  import'codemirror/addon/edit/closebrackets.js'

  // keyMap
  import'codemirror/mode/clike/clike.js'
  import'codemirror/addon/edit/matchbrackets.js'
  import'codemirror/addon/comment/comment.js'
  import'codemirror/addon/dialog/dialog.js'
  import'codemirror/addon/dialog/dialog.css'
  import'codemirror/addon/search/searchcursor.js'
  import'codemirror/addon/search/search.js'
  import'codemirror/keymap/emacs.js'
  export default {
    data() {
const code =
`

          `
      return {
        code,
        cmOption: {
          autoCloseBrackets: true,
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: 'text/x-python',
          theme: 'base16-light',
          keyMap: "emacs"
        }
      }
    }
  }
</script>

