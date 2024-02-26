import { CharacterWinRateDto } from '@/dtos/CharacterWinRateDto';
import { defineStore } from 'pinia';

export const useFilesStore = defineStore('files', {
  state: () => ({
    results: [] as CharacterWinRateDto[],
    files: [] as FileList[],
  }),
});
