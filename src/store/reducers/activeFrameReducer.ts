import { Map } from 'immutable'; // Assuming you are using Immutable.js for frames

import * as types from '../actions/actionTypes';

export const GRID_INITIAL_COLOR = 'rgba(49, 49, 49, 1)';

type FramesState = Map<string, any>; // Adjust 'any' to match your actual frame state shape

type Action = {
  type: string;
  [key: string]: any; // Define specific action properties as needed
};

const updateFrameProp = (prop: string) => (propReducer: Function) => (
  frames: FramesState,
  action: Action
): FramesState => {
  const activeIndex = frames.get('activeIndex');
  return frames.updateIn(['list', activeIndex, prop], stateProp =>
    propReducer(stateProp, action)
  );
};

const updateGrid = updateFrameProp('grid');
const updateInterval = updateFrameProp('interval');

const isSameColor = (colorA: string | undefined, colorB: string | undefined): boolean =>
  (colorA || GRID_INITIAL_COLOR) === (colorB || GRID_INITIAL_COLOR);

const getSameColorAdjacentCells = (
  frameGrid: Map<number, string>,
  columns: number,
  rows: number,
  id: number,
  color: string
): number[] => {
  const adjacentCollection: number[] = [];
  let auxId: number | undefined;

  if ((id + 1) % columns !== 0) {
    // Not at the very right
    auxId = id + 1;
    if (isSameColor(frameGrid.get(auxId), color)) {
      adjacentCollection.push(auxId);
    }
  }
  if (id % columns !== 0) {
    // Not at the very left
    auxId = id - 1;
    if (isSameColor(frameGrid.get(auxId), color)) {
      adjacentCollection.push(auxId);
    }
  }
  if (id >= columns) {
    // Not at the very top
    auxId = id - columns;
    if (isSameColor(frameGrid.get(auxId), color)) {
      adjacentCollection.push(auxId);
    }
  }
  if (id < columns * rows - columns) {
    // Not at the very bottom
    auxId = id + columns;
    if (isSameColor(frameGrid.get(auxId), color)) {
      adjacentCollection.push(auxId);
    }
  }

  return adjacentCollection;
};

const drawPixel = (pixelGrid: Map<number, string>, color: string, id: number): Map<number, string> =>
  pixelGrid.set(id, color);

const applyBucketToGrid = (grid: Map<number, string>, { id, paletteColor, columns, rows }: any): Map<number, string> => {
  const queue = [id];
  const cellColor = grid.get(id);
  let currentId: number | undefined;
  let newGrid = grid;
  let adjacents: number[];
  let auxAdjacentId: number | undefined;
  let auxAdjacentColor: string | undefined;

  while (queue.length > 0) {
    currentId = queue.shift();
    if (currentId !== undefined) {
      newGrid = drawPixel(newGrid, paletteColor, currentId);
      adjacents = getSameColorAdjacentCells(
        newGrid,
        columns,
        rows,
        currentId,
        cellColor || ''
      );

      for (let i = 0; i < adjacents.length; i++) {
        auxAdjacentId = adjacents[i];
        auxAdjacentColor = newGrid.get(auxAdjacentId);
        // Avoid introducing repeated or already painted cells into the queue
        if (
          auxAdjacentId !== undefined &&
          queue.indexOf(auxAdjacentId) === -1 &&
          auxAdjacentColor !== paletteColor
        ) {
          queue.push(auxAdjacentId);
        }
      }
    }
  }

  return newGrid;
};

const applyPencilToGrid = (pixelGrid: Map<number, string>, { paletteColor, id }: any): Map<number, string> =>
  drawPixel(pixelGrid, paletteColor, id);

const applyBucket = updateGrid(applyBucketToGrid);

const shiftPixelsDown = (grid: Map<number, string>, columnCount: number): Map<number, string> =>
  grid.withMutations(mutableGrid => {
    for (let i = 0; i < columnCount; i++) {
      const lastValue = mutableGrid.last();
      mutableGrid.pop().unshift(lastValue);
    }
  });

const shiftPixelsUp = (grid: Map<number, string>, columnCount: number): Map<number, string> =>
  grid.withMutations(mutableGrid => {
    for (let i = 0; i < columnCount; i++) {
      const firstValue = mutableGrid.first();
      mutableGrid.shift().push(firstValue);
    }
  });

const getGridColumnIndexes = (columnId: number, columnCount: number, cellCount: number): number[] => {
  let i = 0;
  const indexes: number[] = [];
  while (i < cellCount) {
    if (i % columnCount === columnId) {
      indexes.push(i);
      i += columnCount;
    } else {
      i += 1;
    }
  }
  return indexes;
};

const shiftPixelsLeft = (grid: Map<number, string>, columnCount: number): Map<number, string> => {
  const indexArray = getGridColumnIndexes(0, columnCount, grid.size);
  let tempGrid = grid;
  for (const cellIndex of indexArray) {
    const valueToMove = tempGrid.get(cellIndex);
    if (valueToMove !== undefined) {
      const target = cellIndex + columnCount;
      tempGrid = tempGrid.insert(target, valueToMove);
      tempGrid = tempGrid.delete(cellIndex);
    }
  }
  return tempGrid;
};

const shiftPixelsRight = (grid: Map<number, string>, columnCount: number): Map<number, string> => {
  const indexArray = getGridColumnIndexes(
    columnCount - 1,
    columnCount,
    grid.size
  );
  let tempGrid = grid;
  for (const cellIndex of indexArray) {
    const valueToMove = tempGrid.get(cellIndex);
    if (valueToMove !== undefined) {
      const target = cellIndex - columnCount + 1;
      tempGrid = tempGrid.insert(target < 0 ? 1 : target, valueToMove);
      tempGrid = tempGrid.delete(cellIndex + 1);
    }
  }
  return tempGrid;
};

const applyMove = (frames: FramesState, action: Action): FramesState => {
  const { xDiff, yDiff, cellWidth } = action.moveDiff;
  const x = xDiff / cellWidth;
  const y = yDiff / cellWidth;
  const xDirection = x < 0 ? 'LEFT' : 'RIGHT';
  const yDirection = y < 0 ? 'UP' : 'DOWN';
  const horizontal = Math.abs(x) > 1 ? xDirection : '';
  const vertical = Math.abs(y) > 1 ? yDirection : '';
  const activeIndex = frames.get('activeIndex');
  const currentFrame = frames
    .get('list')
    .get(activeIndex)
    .get('grid');

  const columnCount = frames.get('columns');
  let frameShifted = currentFrame;

  switch (horizontal) {
    case 'LEFT':
      frameShifted = shiftPixelsLeft(currentFrame, columnCount);
      break;
    case 'RIGHT':
      frameShifted = shiftPixelsRight(currentFrame, columnCount);
      break;
    default:
  }

  switch (vertical) {
    case 'UP':
      frameShifted = shiftPixelsUp(frameShifted, columnCount);
      break;
    case 'DOWN':
      frameShifted = shiftPixelsDown(frameShifted, columnCount);
      break;
    default:
  }
  return frames.setIn(['list', activeIndex, 'grid'], frameShifted);
};

const applyPencil = updateGrid(applyPencilToGrid);

const applyEraser = updateGrid((pixelGrid: Map<number, string>, { id }: any): Map<number, string> =>
  drawPixel(pixelGrid, '', id)
);

const resetGrid = updateGrid((pixelGrid: Map<number, string>): Map<number, string> =>
  pixelGrid.map(() => '')
);

const changeFrameInterval = updateInterval(
  (previousInterval: number, { interval }: any): number => interval
);

export default function reducer(frames: FramesState, action: Action): FramesState {
  switch (action.type) {
    case types.APPLY_PENCIL:
      return applyPencil(frames, action);
    case types.APPLY_ERASER:
      return applyEraser(frames, action);
    case types.APPLY_BUCKET:
      return applyBucket(frames, action);
    case types.MOVE_DRAWING:
      return applyMove(frames, action);
    case types.SET_RESET_GRID:
      return resetGrid(frames);
    case types.CHANGE_FRAME_INTERVAL:
      return changeFrameInterval(frames, action);
    default:
      return frames;
  }
}
