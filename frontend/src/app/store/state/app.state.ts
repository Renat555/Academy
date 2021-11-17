import { ArenaState } from '../reducers/arena.reducer';
import { IntuitionState } from '../reducers/intuition.reducer';

export interface AppState {
  arena: ArenaState;
  intuition: IntuitionState;
}
