import { CampFire } from './CampfireDto';
import { CardChoice } from './CardChoiceDto';
import { DamageTaken } from './DamageTakenDto';
import { EventChoice } from './EventChoiceDto';
import { NeowBonus } from './NeowBonusDto';
import { BossRelic } from './relics/BossRelicDto';
import { KeyRelic } from './relics/KeyRelicDto';
import { Relic } from './relics/RelicDto';
import { Reward } from './RewardDto';
import { Shop } from './ShopDto';

export default interface RunDto {
  ascension_level: number;
  blue_key_relic_skipped_log: KeyRelic;
  boss_relics: Array<BossRelic>;
  build_version: string;
  campfire_choices: Array<CampFire>;
  campfire_rested: number;
  campfire_upgraded: number;
  card_choices: Array<CardChoice>;
  character_chosen: 'IRONCLAD' | 'DEFECT' | 'THE_SILENT' | 'WATCHER';
  chose_seed: false;
  circlet_count: number;
  current_hp_per_floor: Array<number>;
  damage_taken: Array<DamageTaken>;
  event_choices: Array<EventChoice>;
  floor_exit_playtime: Array<number>;
  floor_reached: number;
  gold: number;
  gold_per_floor: Array<number>;
  green_key_taken_log: number;
  improvable_cards: unknown;
  is_ascension_mode: boolean;
  is_beta: boolean;
  is_daily: boolean;
  is_endless: boolean;
  is_prod: boolean;
  is_trial: boolean;
  itemPurchaseFloors: Array<number>;
  items_purchased: Array<string>;
  items_purged: Array<string>;
  items_purged_floors: Array<number>;
  killed_by: string;
  local_time: string;
  master_deck: Array<string>;
  max_hp_per_floor: Array<number>;
  neow_bonus: string;
  neow_bonus_log: NeowBonus;
  neow_bonuses_skipped_log: Array<string>;
  neow_cost: string;
  neow_cost_skipped_log: Array<string>;
  path_per_floor: Array<string>;
  path_taken: Array<string>;
  play_id: string;
  player_experience: number;
  playtime: number;
  potion_discard_per_floor: Array<Array<string>>;
  potion_use_per_floor: Array<Array<string>>;
  potions_floor_spawned: Array<number>;
  potions_floor_usage: Array<number>;
  potions_obtained_alchemize: Array<Array<string>>;
  potions_obtained_entropic_brew: Array<Array<string>>;
  purchased_purges: number;
  relic_stats: unknown; //to do
  relics: Array<string>;
  relics_obtained: Array<Relic>;
  rewards_skipped: Array<Reward>;
  score: number;
  score_breakdown: Array<string>;
  seed_played: string;
  seed_source_timestamp: number;
  shop_contents: Array<Shop>;
  timestamp: number;
  victory: boolean;
  win_rate: number;
}
