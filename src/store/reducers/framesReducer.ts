import { List, Map, fromJS } from 'immutable';
import shortid from 'shortid';
import * as types from '../actions/actionTypes';
import getTimeInterval from '../../utils/intervals';

type Frame = Map<string, any>; // Adjust the type according to your frame structure

const createGrid = (numCells: number): List<any> => {
  let newGrid = List();
  for (let i = 0; i < numCells; i++) {
    newGrid = newGrid.push('');
  }
  return newGrid;
};

const resizeGrid = (
  grid: List<any>,
  gridProperty: string,
  increment: number,
  dimensions: { rows: number; columns: number }
): List<any> => {
  const totalCells = dimensions.rows * dimensions.columns;
  let newGrid = grid;

  if (gridProperty === 'columns') {
    if (increment > 0) {
      for (let i = totalCells; i > 0; i -= dimensions.columns) {
        newGrid = newGrid.insert(i, '');
      }
    } else {
      for (let i = totalCells; i > 0; i -= dimensions.columns) {
        newGrid = newGrid.splice(i - 1, 1);
      }
    }
  } else if (gridProperty === 'rows') {
    if (increment > 0) {
      for (let i = 0; i < dimensions.columns; i++) {
        newGrid = newGrid.push('');
      }
    } else {
      for (let i = 0; i < dimensions.columns; i++) {
        newGrid = newGrid.splice(-1, 1);
      }
    }
  }

  return newGrid;
};

const create = (cellsCount: number, intervalPercentage: number): Frame =>
  Map({
    grid: createGrid(cellsCount),
    interval: intervalPercentage,
    key: shortid.generate()
  });

const resetIntervals = (frameList: List<Frame>): List<Frame> =>
  frameList.map((frame, index) =>
    Map({
      grid: frame.get('grid'),
      interval: getTimeInterval(index, frameList.size),
      key: frame.get('key')
    })
  );

const getFrame = (frames: Map<string, any>, frameId: number): Frame => {
  const frameList = frames.get('list');
  const frame = frameList.get(frameId);
  return Map({
    grid: frame.get('grid'),
    interval: frame.get('interval'),
    key: shortid.generate()
  });
};

const initFrames = (action: any = {}): Map<string, any> => {
  const options = action.options || {};
  const columns = parseInt(options.columns, 10) || 20;
  const rows = parseInt(options.rows, 10) || 20;
  const list = resetIntervals(List([create(columns * rows, 100)]));
  const hoveredIndex = undefined;
  return Map({
    list,
    columns,
    rows,
    activeIndex: 0,
    hoveredIndex
  });
};

const changeActiveFrame = (frames: Map<string, any>, action: any): Map<string, any> => {
  const activeIndex = action.frameIndex;
  return frames.merge({ activeIndex });
};

const reorderFrame = (frames: Map<string, any>, action: any): Map<string, any> => {
  const frameList = frames.get('list');
  const { selectedIndex, destinationIndex } = action;
  const targetIsBefore = selectedIndex < destinationIndex;
  const insertPosition = destinationIndex + (targetIsBefore ? 1 : 0);
  const deletePosition = selectedIndex + (targetIsBefore ? 0 : 1);
  const list = resetIntervals(
    frameList
      .splice(insertPosition, 0, getFrame(frames, selectedIndex))
      .splice(deletePosition, 1)
  );

  return frames.merge({
    list,
    activeIndex: destinationIndex
  });
};

const createNewFrame = (frames: Map<string, any>): Map<string, any> => {
  const frameList = frames.get('list');
  const list = resetIntervals(
    frameList.push(create(frameList.getIn([0, 'grid']).size, 100))
  );
  return frames.merge({
    list,
    activeIndex: frameList.size
  });
};

const deleteFrame = (frames: Map<string, any>, action: any): Map<string, any> => {
  const { frameId } = action;
  const frameList = frames.get('list');
  if (frameList.size <= 1) {
    return frames;
  }
  const activeIndex = frames.get('activeIndex');
  const reduceFrameIndex = activeIndex >= frameId && activeIndex > 0;
  return frames.merge(
    {
      list: resetIntervals(frameList.splice(frameId, 1))
    },
    reduceFrameIndex ? { activeIndex: frameList.size - 2 } : {}
  );
};

const duplicateFrame = (frames: Map<string, any>, action: any): Map<string, any> => {
  const { frameId } = action;
  const frameList = frames.get('list');
  const list = resetIntervals(
    frameList.splice(frameId, 0, getFrame(frames, frameId))
  );
  return frames.merge({
    list,
    activeIndex: frameId + 1
  });
};

const changeDimensions = (frames: Map<string, any>, action: { gridProperty: string; increment: number }): Map<string, any> => {
  const dimensions = {
    columns: frames.get('columns'),
    rows: frames.get('rows')
  };
  const list = frames.get('list').map(frame =>
    Map({
      grid: resizeGrid(frame.get('grid'), action.gridProperty, action.increment, dimensions),
      interval: frame.get('interval'),
      key: frame.get('key')
    })
  );
  return frames.merge({
    list,
    [action.gridProperty]: frames.get(action.gridProperty) + action.increment
  });
};

const setFrames = (frames: Map<string, any>, action: any): Map<string, any> => {
  const { columns, rows, hoveredIndex } = action;
  const frameList = action.frames;
  return fromJS({
    list: frameList,
    columns,
    rows,
    activeIndex: 0,
    hoveredIndex
  });
};

const changeHoveredCell = (frames: Map<string, any>, cell: any): Map<string, any> =>
  frames.merge({ hoveredIndex: cell });

export default function framesReducer(frames: Map<string, any> = initFrames(), action: any): Map<string, any> {
  switch (action.type) {
    case types.SET_INITIAL_STATE:
    case types.NEW_PROJECT:
      return initFrames(action);
    case types.SET_DRAWING:
      return setFrames(frames, action);
    case types.CHANGE_ACTIVE_FRAME:
      return changeActiveFrame(frames, action);
    case types.REORDER_FRAME:
      return reorderFrame(frames, action);
    case types.CREATE_NEW_FRAME:
      return createNewFrame(frames);
    case types.DELETE_FRAME:
      return deleteFrame(frames, action);
    case types.DUPLICATE_FRAME:
      return duplicateFrame(frames, action);
    case types.CHANGE_DIMENSIONS:
      return changeDimensions(frames, action);
    case types.CHANGE_HOVERED_CELL:
      return changeHoveredCell(frames, action.cell);
    default:
      return frames;
  }
}
