export interface CharacterWinRateDto {
  name: 'IRONCLAD' | 'THE_SILENT' | 'DEFECT' | 'WATCHER';
  wins: number;
  loses: number;
  highestAscensionWon?: string;
}
