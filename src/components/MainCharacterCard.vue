<template>
  <q-card
    style="
      width: 300px;
      height: 400px;
      cursor: pointer;
      border: 1px outset black;
    "
    class="card"
    @click="redirectToMainCharacterPage"
  >
    <q-img :src="getCharacterImage()" fit="cover" :ratio="4 / 3" />
    <q-card-section>
      <div
        class="absolute-bottom text-subtitle1 text-center text-class"
        :style="{ backgroundColor: getBackgroundColor }"
        style="color: white"
      >
        {{ character?.name }}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-class" style="display: flex; justify-content: center">
        Wins: &nbsp;
        <div style="color: green">
          {{ character?.wins || '-' }}
          &nbsp;
        </div>
        | &nbsp;Loses: &nbsp;
        <div style="color: red">
          {{ character?.loses || '-' }}
        </div>
      </div>
      <q-separator />
      <div
        style="display: flex; justify-content: center; font-size: 18px"
        class="text-center text-class"
      >
        Winrate:
        {{
          calculateWinPercentage(
            props.character?.wins,
            props.character?.loses
          ) || '-'
        }}
      </div>
      <q-separator />

      <div class="text-center text-class" style="font-size: 18px">
        Highest Ascension Win:{{ character?.highest_ascension_won || '-' }}
      </div>
      <q-separator />
      <div class="text-center text-class" style="font-size: 18px">
        Playtime:{{ playtime ? playtime + ' hours' : '-' }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { CharacterWinRateDto } from 'src/dtos/CharacterWinRateDto';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

interface MainCharacterCardProps {
  character: CharacterWinRateDto | null;
  dataLoaded: boolean;
}

const props = withDefaults(defineProps<MainCharacterCardProps>(), {
  character: null,
  dataLoaded: false,
});
const router = useRouter();
const $q = useQuasar();

function calculateWinPercentage(
  wins: number | undefined,
  loses: number | undefined
): string {
  if (!wins || !loses) return '';
  let percentage = (wins / (wins + loses)) * 100;
  return percentage.toFixed(2) + '%';
}

const getBackgroundColor = computed<string>(() => {
  if (!props.character) return '#000000';
  if (props.character.name === 'IRONCLAD') return '#6C1313';
  if (props.character.name === 'DEFECT') return 'darkblue';
  if (props.character.name === 'THE_SILENT') return '#13360A';
  if (props.character.name === 'WATCHER') return '#421876';

  return '#000000';
});

const playtime = computed<number>(() => {
  if (!props.character) return 0;
  return Math.floor(props.character.playtime / 3600);
});

function redirectToMainCharacterPage() {
  if (!props.dataLoaded) {
    $q.notify({
      type: 'negative',
      message: 'No data loaded...',
      color: 'red-6',
    });
    return;
  }
  router.push(`/${props.character?.name.toLowerCase()}`);
}

function getCharacterImage() {
  switch (props.character?.name) {
    case 'IRONCLAD':
      return new URL('../assets/ironclad.jpg', import.meta.url).href;
    case 'DEFECT':
      return new URL('../assets/defect.jpg', import.meta.url).href;
    case 'THE_SILENT':
      return new URL('../assets/silent.jpg', import.meta.url).href;
    case 'WATCHER':
      return new URL('../assets/watcher.jpg', import.meta.url).href;
    default:
      return '';
  }
}
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Cinzel:wght@400..900&family=Indie+Flower&family=Lilita+One&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Yanone+Kaffeesatz:wght@200..700&display=swap');
.text-class {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
}
.card {
  transition: transform 0.5s ease;
}
.card:hover {
  transform: scale(1.07);
  box-shadow: 0px 0px 20px rgba(1, 1, 1, 1.3);
  /* box-shadow: 0px 0px 20px rgba(255, 255, 255, 1); this is white*/
}
</style>
