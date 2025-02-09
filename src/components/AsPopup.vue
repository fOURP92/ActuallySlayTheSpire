<template>
  <q-dialog v-model="alert" persistent>
    <q-card :style="{ height: props.height, width: props.width }">
      <q-card-section>
        <slot name="title"> Title slot </slot>
      </q-card-section>
      <q-card-section style="max-height: 500px; overflow: auto">
        <slot> Default slot </slot>
      </q-card-section>
      <q-card-actions>
        <slot name="actions"> Actions slot </slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface AsPopupProps {
  height?: string | number;
  width?: string | number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<AsPopupProps>(), {
  height: 'auto',
  width: '1200px',
});

const alert = ref(true);
</script>
