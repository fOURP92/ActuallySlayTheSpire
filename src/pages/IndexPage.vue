<template>{{ winrate }}</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, watch } from 'vue';

const winrate = ref('test');

async function getPercentage() {
  const res = await axios.get('http://localhost:3000/winrate');
  console.log('DONE!', res.data);
  winrate.value = res.data;
}

watch(
  () => winrate.value,
  () => {
    console.log('winrate:', winrate.value);
  }
);

getPercentage();
</script>
