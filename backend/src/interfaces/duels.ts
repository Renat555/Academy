export interface GameInfo {
  header: string;
  generalInfo: GeneralInfo;
  user: Player;
  enemy: Player;
  battlefield: Battlefield;
}

export interface Player {
  name: string;
  enemyType: string;
  idGame: string;
  actionPoints: number;
  energyPoints: number;
  maxHealth: number;
  health: number;
  elements: string[];
  forms: string[];
  buffs: [];
  debuffs: [];
}

export interface Battlefield {
  map: (string | number)[][][];
}

export interface GeneralInfo {
  muve: string;
  enemyType: string;
}
