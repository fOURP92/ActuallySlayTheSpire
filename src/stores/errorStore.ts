import { AxiosError } from 'axios';
import { defineStore } from 'pinia';

export const useErrorStore = defineStore('files', {
  state: () => ({
    currentError: null as AxiosError | null,
  }),
  actions: {
    handle(error: AxiosError) {
      this.currentError = error;
    },
  },
});
