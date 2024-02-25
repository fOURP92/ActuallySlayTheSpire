<template>
  <div>{{ character.name }}</div>
  <div>{{ character.wins }}</div>
  <div>{{ character.loses }}</div>
  <div>{{ character.highestAscensionWon }}</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useFilesStore } from '../stores/slayStore';
import { CharacterWinRateDto } from '@/dtos/CharacterWinRateDto';

const router = useRouter();
const store = useFilesStore();
//maybe show run history? like last ten..
//add notify for when data not loaded for example..

const routeCharacter = router.currentRoute.value.params.character.toUpperCase();
const character: CharacterWinRateDto = store.results.filter(
  (char: CharacterWinRateDto) => char.name === routeCharacter
)[0];
</script>
../stores/slayStore
