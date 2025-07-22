<template>
  <div>only-server</div>
</template>

<script setup>
/*
 * Define SSR cache control header for this page
 */
useCacheControl({
  public: true,
  // 1 hour
  sMaxAge: 60 * 30,
  // SWR for 2 minutes
  staleWhileRevalidate: 60 * 2,
})
</script>
