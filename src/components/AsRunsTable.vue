<template>
  <q-table
    :rows="runs"
    :columns="columns"
    class="my-sticky-header-table runsTable"
    :pagination="pagination"
    :style="{ height: height }"
  >
    <template #body-cell-timestamp="props">
      <q-td :props="props"> {{ timeConverter(props.row.timestamp) }} </q-td>
    </template>

    <template #body-cell-playtime="props">
      <q-td :props="props"> {{ Math.floor(props.row.playtime / 60) }}min </q-td>
    </template>

    <template #body-cell-victory="props">
      <q-td :props="props">
        <q-icon
          :name="props.row.victory ? icons.trophy : icons.skull"
          size="sm"
          :color="props.row.victory ? 'green-6' : 'red-4'"
        >
          <q-tooltip style="background-color: #000" :delay="200">
            {{ props.row.victory ? 'WIN' : 'LOSS' }}
          </q-tooltip>
        </q-icon>
      </q-td>
    </template>

    <template #body-cell-name="props">
      <q-td :props="props">
        {{
          props.row.character_chosen === 'WATCHER'
            ? 'Watcher'
            : props.row.character_chosen === 'IRONCLAD'
            ? 'Ironclad'
            : props.row.character_chosen === 'THE_SILENT'
            ? 'Silent'
            : 'Defect'
        }}
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import icons from '@/core/icons';
import RunDto from '@/dtos/RunDto';
import timeConverter from '@/services/timestampParse';
import { QTableColumn } from 'quasar';
import { markRaw, watch } from 'vue';

markRaw({
  icons,
});

interface AsRunsTableProps {
  runs: Array<RunDto>;
  columns: Array<QTableColumn>;
  height?: string;
}

const props = withDefaults(defineProps<AsRunsTableProps>(), {
  runs: () => [],
  columns: () => [],
  height: '700px',
});

watch(
  () => props.runs,
  () => {
    console.log(props.runs[0]);
  },
  {
    immediate: true,
    deep: true,
  }
);

const pagination = {
  sortBy: null,
  descending: false,
  page: 1,
  rowsPerPage: 0,
};
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 30rem

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>

<style lang="css">
tr:nth-child(even) {
  background-color: rgb(248, 250, 250);
}
</style>
