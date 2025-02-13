<template>
  <q-layout view="lHh Lpr lFf">
    <as-header />

    <!-- <as-error-handling /> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import AsHeader from '../components/layout/AsHeader.vue';
// import AsErrorHandling from '../components/layout/AsErrorHandling.vue';
</script>
