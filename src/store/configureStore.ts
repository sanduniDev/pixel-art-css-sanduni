import { createStore, Store } from 'redux';
import undoable, { includeAction, UndoableOptions } from 'redux-undo';
import reducer, { RootState } from './reducers/reducer'; // Adjust RootState type as needed
import {
  CHANGE_DIMENSIONS,
  APPLY_PENCIL,
  APPLY_ERASER,
  APPLY_BUCKET,
  APPLY_EYEDROPPER,
  MOVE_DRAWING,
  SHOW_SPINNER,
  NEW_PROJECT,
  SET_DRAWING,
  SET_CELL_SIZE,
  SET_RESET_GRID
} from './actions/actionTypes';

// Define the action types array with TypeScript string literals
const includedActionTypes: string[] = [
  CHANGE_DIMENSIONS,
  APPLY_PENCIL,
  APPLY_ERASER,
  APPLY_BUCKET,
  APPLY_EYEDROPPER,
  MOVE_DRAWING,
  SET_DRAWING,
  SET_CELL_SIZE,
  SET_RESET_GRID,
  NEW_PROJECT
];

const createIncludedActions = () =>
  includeAction(includedActionTypes);

const configureStore = (devMode: boolean): Store<RootState, any> => { // Replace 'any' with your state shape if known
  const store: Store<RootState, any> = createStore(
    undoable(reducer, {
      filter: createIncludedActions(),
      debug: devMode,
      ignoreInitialState: true
    } as UndoableOptions<RootState>) // Use UndoableOptions with RootState
  );

  store.dispatch({
    type: SHOW_SPINNER
  });

  return store;
};

export default configureStore;
