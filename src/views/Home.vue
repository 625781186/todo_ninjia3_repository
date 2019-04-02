<template>
  <div class="home">
    <h1>Home</h1>
    <!--<example01></example01>-->
    <example02></example02>
    <example14></example14>
  </div>
</template>

<script>

  import all from './examples'
  const { example01,example02, example14 } = all; // Works
  export default {
    components: {
      // example01,
      example02,
      example14
    }
  }
</script>
