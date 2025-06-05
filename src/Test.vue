<script setup lang="ts">
// comment test
const foo = 'foo';

/* comment test */
const bar = 'bar';

/**
 *comment test
 */
const foobar = 'foobar';
</script>

<template>
  <div v-html="'<div>Test</div>'" />
</template>

<style scoped></style>
