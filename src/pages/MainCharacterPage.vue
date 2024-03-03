<template>
  <div>name:{{ character.name }}</div>
  <div>wins:{{ character.wins }}</div>
  <div>loses:{{ character.loses }}</div>
  <div>highest asc won:{{ character.highestAscensionWon }}</div>
  <div>killed by:{{ character.killedBy }}</div>
  <q-btn label="Home" to="/" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useFilesStore } from '../stores/slayStore';
import { CharacterWinRateDto } from '@/dtos/CharacterWinRateDto';
import { detailedParse } from '../services/detailedParse';
import { DetailedCharacterDto } from '@/dtos/DetailedCharacterDto';
import { ref } from 'vue';

const router = useRouter();
const store = useFilesStore();

const routeCharacter = router.currentRoute.value.params.character.toUpperCase();

const character = ref<DetailedCharacterDto>(
  store.results.filter(
    (char: CharacterWinRateDto) => char.name === routeCharacter
  )[0] as DetailedCharacterDto
); //typescript at its best :)

detailedParse(store.files, character.value).then((res) => {
  character.value = { ...character.value, ...res };
});
</script>
