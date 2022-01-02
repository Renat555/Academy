import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import * as Description from './../../actions/duels/description.actions';

export interface DescriptionState {
  description: string[][];
}

const initialState: DescriptionState = {
  description: [],
};

export const reducer = createReducer(
  initialState,
  on(Description.addDescriptionBlock, (state, { description }) => {
    let newDescription = deepCopy(state.description);
    let newBlock = [];
    newBlock.push(description);
    newDescription.unshift(newBlock);
    return { description: newDescription };
  }),
  on(Description.addDescriptionRow, (state, { description }) => {
    let newDescription = deepCopy(state.description);

    if (newDescription.length === 0) {
      let newBlock = [];
      newBlock.push(description);
      newDescription.push(newBlock);
    } else {
      let firstBlock = newDescription[0];
      firstBlock.unshift(description);
      newDescription.shift();
      newDescription.unshift(firstBlock);
    }
    return { description: newDescription };
  })
);

function deepCopy(arr: string[][]): string[][] {
  let copy: string[][] = [];

  for (let i = 0; i < arr.length; i++) {
    copy[i] = [...arr[i]];
  }

  return copy;
}
