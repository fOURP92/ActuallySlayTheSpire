import { CharacterWinRateDto } from '@/dtos/CharacterWinRateDto';
import { defineStore } from 'pinia';
import RunDto from '@/dtos/RunDto';

export const useFilesStore = defineStore('files', {
  state: () => ({
    results: [] as CharacterWinRateDto[],
    files: [] as RunDto[],
    ironcladRuns: [] as RunDto[],
    silentRuns: [] as RunDto[],
    defectRuns: [] as RunDto[],
    watcherRuns: [] as RunDto[],
  }),
});
