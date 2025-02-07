<template>
  <as-runs-table :runs="runs" :columns="columns" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useFilesStore } from '../stores/slayStore';
import { CharacterWinRateDto } from '@/dtos/CharacterWinRateDto';
import { DetailedCharacterDto } from '@/dtos/DetailedCharacterDto';
import { onMounted, ref, watch } from 'vue';
import AsRunsTable from '@/components/AsRunsTable.vue';
import RunDto from '@/dtos/RunDto';
import { QTableColumn } from 'quasar';
import { useQuasar } from 'quasar';

const router = useRouter();
const store = useFilesStore();
const $q = useQuasar();

const routeCharacter = (
  router.currentRoute.value.params.character as string
).toUpperCase();

const character = ref<DetailedCharacterDto | null>(null);
const runs = ref<Array<RunDto>>([]);

const screenSize = ref($q.screen);

watch(screenSize, () => {
  console.log('screen size is now:', screenSize.value);
});

function parse() {
  try {
    character.value = store.results.filter(
      (char: CharacterWinRateDto) => char.name === routeCharacter
    )[0] as DetailedCharacterDto;
    switch (character.value.name) {
      case 'IRONCLAD':
        runs.value = store.ironcladRuns;
        break;
      case 'DEFECT':
        runs.value = store.defectRuns;
        break;
      case 'THE_SILENT':
        runs.value = store.silentRuns;
        break;
      case 'WATCHER':
        runs.value = store.watcherRuns;
        break;
      default:
        runs.value = [];
        break;
    }
  } catch (error) {
    // useErrorStore().handle(error as AxiosError);
    console.error(error);
  }
}

const columns: Array<QTableColumn> = [
  {
    name: 'timestamp',
    field: 'timestamp',
    label: '',
    align: 'left',
    style: 'width: 8rem',
  },
  {
    name: 'name',
    field: 'character_chosen',
    label: 'Name',
    align: 'left',
    style: 'width: 3rem',
  },
  {
    name: 'victory',
    field: 'victory',
    label: 'W/L',
    sortable: true,
    style: 'width: 1rem',
  },
  {
    name: 'ascension',
    field: 'ascension_level',
    label: 'Ascension',
    align: 'center',
    sortable: true,
    style: 'width: 1rem',
  },
  {
    name: 'playtime',
    field: 'playtime',
    label: 'Playtime',
    align: 'left',
    style: 'width: 1rem',
  },
  {
    name: 'score',
    field: 'score',
    label: 'Score',
    align: 'center',
  },

  {
    name: 'killedBy',
    field: 'killed_by',
    label: 'Killed by',
    align: 'left',
    sortable: true,
  },
];

onMounted(parse);
</script>
