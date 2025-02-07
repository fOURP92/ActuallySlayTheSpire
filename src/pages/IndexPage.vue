<template>
  <q-page-container>
    <div class="row" style="justify-content: center">
      <main-character-card
        v-for="(character, index) in results"
        :key="index"
        :character="character"
        :data-loaded="dataLoaded"
        class="q-mr-md q-mb-md"
      />
    </div>
    <div class="row justify-center">
      <q-btn
        label="load data"
        color="primary"
        push
        @click="choseRunsDirectory"
        class="button-shadow q-mt-lg"
      />
    </div>
  </q-page-container>
</template>

<script setup lang="ts">
import MainCharacterCard from 'src/components/MainCharacterCard.vue';
import { onMounted, ref, watch } from 'vue';
import { parseRuns } from '../backend/runs';
import { CharacterWinRateDto } from '../dtos/CharacterWinRateDto';
import { useFilesStore } from '../stores/slayStore';

function choseRunsDirectory() {
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

const store = useFilesStore();
const selectedFile = ref<FileList | null>(null);
const dataLoaded = ref<boolean>(false);

function handleDirectorySelection(event: Event) {
  selectedFile.value = event.target.files;
  store.files = event.target.files;
}

const results = ref<CharacterWinRateDto[]>([
  { name: 'IRONCLAD' } as CharacterWinRateDto,
  { name: 'THE_SILENT' } as CharacterWinRateDto,
  { name: 'DEFECT' } as CharacterWinRateDto,
  { name: 'WATCHER' } as CharacterWinRateDto,
]);

async function init() {
  if (store.files.length > 0) {
    results.value = await parseRuns(store.files as FileList[]);
    dataLoaded.value = true;
  }
}
onMounted(init);

watch(
  () => selectedFile.value,
  async () => {
    if (!selectedFile.value) return;
    results.value = await parseRuns(selectedFile.value);
    store.results = results.value;
    dataLoaded.value = true;
  }
);
</script>

<style lang="css">
.button-shadow {
  box-shadow: rgba(0, 0, 0, 0.685) 5px 5px;
}

html {
  background-color: rgb(211, 209, 209);
}
</style>
