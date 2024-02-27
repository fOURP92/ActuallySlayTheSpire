<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header-style">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-class">.ActuallySlayTheSpire.</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

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
