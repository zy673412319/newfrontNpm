<template>
  <div>Hello from MyComponent!</div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { numChecker } from './utils/regularCheck';
  @Component({
    components: {
    },
  })
  export default class MyComponent extends Vue {
    message: string = 'message'

    
  }
</script>
