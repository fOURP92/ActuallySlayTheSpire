<template>
  <q-card v-if="error">
    <q-card-section> Error Title </q-card-section>
    <q-card-section> Error Text </q-card-section>
    <q-card-actions>
      <q-btn v-close-popup> Ok </q-btn>
    </q-card-actions>
  </q-card>
</template>
<script setup lang="ts">
import { AxiosError } from 'axios';
import { useErrorStore } from '../../stores/errorStore';
import { computed } from 'vue';

const errorStore = useErrorStore();

const error = computed<AxiosError | null>(() => {
  return errorStore.currentError;
});
</script>
