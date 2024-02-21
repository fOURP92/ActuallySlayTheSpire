<template>
  <q-card style="width: 300px; height: 200px">
    <q-card-section>
      {{ character?.name }}
    </q-card-section>
    <q-card-section>
      wins: {{ character?.wins }} - loses: {{ character?.loses }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { CharacterWinRateDto } from 'src/dtos/CharacterWinRateDto';

interface MainCharacterCardProps {
  character: CharacterWinRateDto | null;
}

const props = withDefaults(defineProps<MainCharacterCardProps>(), {
  character: null,
});
</script>

<style scoped>
/*  */
</style>
