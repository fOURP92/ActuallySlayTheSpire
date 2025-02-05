import { CharacterWinRateDto } from './CharacterWinRateDto';

export interface DetailedCharacterDto extends CharacterWinRateDto {
  run_time_in_seconds: number;
  score: number;
  floor_reached: number;
  is_ascension: boolean;
  seed: string;
  victory: boolean;
  killed_by?: string;
}
