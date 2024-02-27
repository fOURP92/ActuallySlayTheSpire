import { CharacterWinRateDto } from './CharacterWinRateDto';

export interface DetailedCharacterDto extends CharacterWinRateDto {
  runTimeInSeconds: number;
  score: number;
  floorReached: number;
  isAscension: boolean;
  seed: string;
  victory: boolean;
  killedBy?: string;
}
