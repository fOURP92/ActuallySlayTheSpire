<template>
  <as-popup v-if="deck.length > 0">
    <template #title>
      <span class="text-h6"> Deck </span>
    </template>

    <div class="row">
      <q-list>
        <q-item v-for="(card, index) in deck" :key="index">
          <q-item-section style="max-width: 100px">
            <q-img :src="getImg(card)" width="100px" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h6">{{ card }}</q-item-label>
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <template #actions>
      <div style="display: flex; justify-content: center; width: 100%">
        <q-btn label="Close" color="primary" @click="deck = []" />
      </div>
    </template>
  </as-popup>

  <q-table
    :rows="runs"
    :columns="columns"
    title="Runs Data"
    class="my-sticky-header-table runsTable"
    :dense="tableDense"
    :pagination="pagination"
    :style="{ height: height }"
    style="min-height: 500px"
  >
    <template #top>
      <div class="text-h6" style="width: 100%">
        {{ title }}
      </div>
      <q-toggle v-model="tableDense" label="Dense" />
    </template>
    <template #body-cell-timestamp="props">
      <q-td :props="props"> {{ timeConverter(props.row.timestamp) }} </q-td>
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
    <template #body-cell-playtime="props">
      <q-td :props="props"> {{ Math.floor(props.row.playtime / 60) }}min </q-td>
    </template>

    <template #body-cell-decksize="props">
      <q-td :props="props"> {{ props.row.master_deck.length }} </q-td>
    </template>

    <template #body-cell-relics="props">
      <q-td :props="props"> {{ props.row.relics.length }} </q-td>
    </template>

    <template #body-cell-events="props">
      <q-td :props="props"> {{ props.row.event_choices.length }} </q-td>
    </template>

    <template #body-cell-campfires="props">
      <q-td :props="props"> {{ props.row.campfire_choices.length }} </q-td>
    </template>

    <template #body-cell-deck="props">
      <q-td :props="props">
        <q-btn
          label="Show Deck"
          size="sm"
          no-caps
          color="green-4"
          @click="deck = props.row.master_deck"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import icons from '@/core/icons';
import RunDto from '@/dtos/RunDto';
import timeConverter from '@/services/timestampParse';
import { QTableColumn } from 'quasar';
import { markRaw, ref, watch } from 'vue';
import AsPopup from './AsPopup.vue';
import cards from '@/services/cardTranslator';
import { useRouter } from 'vue-router';

markRaw({
  icons,
});

interface AsRunsTableProps {
  runs: Array<RunDto>;
  columns: Array<QTableColumn>;
  height?: string;
  title?: string;
}

const props = withDefaults(defineProps<AsRunsTableProps>(), {
  runs: () => [],
  columns: () => [],
  height: '700px',
  title: 'Runs Data',
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

const router = useRouter();
const character = router.currentRoute.value.params.character as string;

const tableDense = ref(true);

const deck = ref<Array<string>>([]);

function getImg(card: string) {
  const path =
    character === 'ironclad'
      ? 'red'
      : character === 'defect'
      ? 'blue'
      : character === 'the_silent'
      ? 'green'
      : 'purple';

  let url;
  if (cards[path][card]) {
    url = `/cards/${path}/${cards[path][card]}`;
  } else if (cards.curses[card]) {
    url = `/cards/curse/${cards.curses[card]}`;
  } else if (cards.status[card]) {
    url = `/cards/status/${cards.status[card]}`;
  } else {
    url = `/cards/colorless/${card}.png`;
  }
  return url;
}

watch(
  () => deck.value,
  () => {
    console.log(deck.value);
  }
);
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
