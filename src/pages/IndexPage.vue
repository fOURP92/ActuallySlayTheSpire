<template>
  {{ winrate }}

  <q-btn
    label="load data"
    color="primary"
    class="absolute-center"
    @click="choseRunsDirectory"
  />

  <input type="file" style="display: none" class="openFileExplorer" />
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, watch } from 'vue';
import { parseRuns } from '../backend/runs';

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

watch(
  () => selectedFile.value,
  () => {
    if (!selectedFile.value) return;
    // console.log('selected file is now:', selectedFile.value);
    parseRuns(selectedFile.value);
  }
);
</script>
