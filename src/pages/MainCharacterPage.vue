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

function parse() {
  try {
    character.value = store.results.filter(
      (char: CharacterWinRateDto) => char.name === routeCharacter
    )[0] as DetailedCharacterDto;
  } catch (error) {
    // useErrorStore().handle(error as AxiosError);
    console.error(error);
  }
}
const runs = computed<Array<RunDto>>(() => {
  switch (character.value?.name) {
    case 'IRONCLAD':
      return store.ironcladRuns;
    case 'DEFECT':
      return store.defectRuns;
    case 'THE_SILENT':
      return store.silentRuns;
    case 'WATCHER':
      return store.watcherRuns;
    default:
      return [];
  }
});

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
    sortable: true,
  },
  {
    name: 'score',
    field: 'score',
    label: 'Score',
    align: 'center',
    sortable: true,
  },
  {
    name: 'floor',
    field: 'floor_reached',
    label: 'Floor',
    style: 'width: 1rem',
    sortable: true,
  },
  {
    name: 'killedBy',
    field: 'killed_by',
    label: 'Killed by',
    align: 'left',
    sortable: true,
  },
  {
    name: 'decksize',
    field: 'master_deck',
    label: 'Deck Size',
    align: 'center',
    sortable: true,
    sort: (deckA: Array<string>, deckB: Array<string>) =>
      deckA.length - deckB.length,
  },
  {
    name: 'relics',
    field: 'relics',
    label: 'Relics',
    align: 'center',
    sortable: true,
    sort: (relicsA: Array<string>, relicsB: Array<string>) =>
      relicsA.length - relicsB.length,
  },
  {
    name: 'events',
    field: 'event_choices',
    label: 'Events',
    align: 'center',
    sortable: true,
  },
  {
    name: 'campfires',
    field: 'campfire_choices',
    label: 'Campfires',
    align: 'center',
    sortable: true,
  },
];

onMounted(parse);
</script>
