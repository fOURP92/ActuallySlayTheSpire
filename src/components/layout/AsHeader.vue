<template>
  <q-header elevated class="header-style">
    <q-toolbar>
      <q-toolbar-title>
        <div
          class="text-class cursor-pointer"
          @click="redirectHome"
          style="width: 20%"
        >
          .ActuallySlayTheSpire.
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

function redirectHome() {
  router.push('/');
}
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Autour+One&display=swap');
.header-style {
  background-color: rgb(29, 27, 27);
}
.text-class {
  font-family: 'Autour One', system-ui;
  font-weight: 400;
  font-style: normal;
}
</style>
