export interface CampFire {
  floor: number;
  data?: string; //name of the card upgraded. only exists if key === 'SMITH'
  key: 'RECALL' | 'DIG' | 'SMITH' | 'REST';
}
