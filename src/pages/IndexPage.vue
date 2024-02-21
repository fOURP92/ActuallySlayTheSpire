<template>
  <q-page-container>
    <div class="row">
      <q-btn label="load data" color="primary" @click="choseRunsDirectory" />
    </div>
    <div class="row" style="justify-content: center">
      <main-character-card
        v-for="(character, index) in results"
        :key="index"
        :character="character"
        class="q-mr-md q-mb-md"
      />
    </div>
  </q-page-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { parseRuns } from '../backend/runs';
import { CharacterWinRateDto } from '../dtos/CharacterWinRateDto';
import MainCharacterCard from 'src/components/MainCharacterCard.vue';

function choseRunsDirectory() {
  //
  let openExplorer = document.createElement('input');
  openExplorer.style.display = 'none';
  openExplorer.classList.add('file-explorer');
  openExplorer.type = 'file';
  openExplorer.setAttribute('webkitdirectory', ''); // Allows directory selection
  openExplorer.setAttribute('directory', ''); // Allows directory selection in newer browsers
  openExplorer.addEventListener('change', handleDirectorySelection, false);
  document.body.appendChild(openExplorer);
  openExplorer.click();
}

const selectedFile = ref<FileList | null>(null);

function handleDirectorySelection(event: Event) {
  selectedFile.value = event.target.files;
}

const results = ref<CharacterWinRateDto[]>([]);

watch(
  () => selectedFile.value,
  async () => {
    if (!selectedFile.value) return;
    // console.log('selected file is now:', selectedFile.value);
    results.value = await parseRuns(selectedFile.value);
  }
);
</script>
