import { ActionCreators } from 'redux-undo';
import * as types from './actionTypes';

export interface SetInitialStateAction {
  type: typeof types.SET_INITIAL_STATE;
  options: any;
}

export interface ChangeDimensionsAction {
  type: typeof types.CHANGE_DIMENSIONS;
  gridProperty: string;
  increment: number;
}

export interface UpdateGridBoundariesAction {
  type: typeof types.UPDATE_GRID_BOUNDARIES;
  gridElement: any;
}

export interface SelectPaletteColorAction {
  type: typeof types.SELECT_PALETTE_COLOR;
  position: number;
}

export interface SetCustomColorAction {
  type: typeof types.SET_CUSTOM_COLOR;
  customColor: string;
}

export interface CellAction {
  type: string;
  id: string;
  drawingTool: string;
  color: string;
  paletteColor: string;
  columns: number;
  rows: number;
}

export interface MoveDrawingAction {
  type: typeof types.MOVE_DRAWING;
  moveDiff: {
    xDiff: number;
    yDiff: number;
    cellWidth: number;
  };
}

export interface SetDrawingAction {
  type: typeof types.SET_DRAWING;
  frames: any[];
  paletteGridData: any[];
  cellSize: number;
  columns: number;
  rows: number;
  hoveredIndex: number;
}

export interface EndDragAction {
  type: typeof types.END_DRAG;
}

export interface SwitchToolAction {
  type: typeof types.SWITCH_TOOL;
  tool: string;
}

export interface SetCellSizeAction {
  type: typeof types.SET_CELL_SIZE;
  cellSize: number;
}

export interface ResetGridAction {
  type: typeof types.SET_RESET_GRID;
}

export interface ShowSpinnerAction {
  type: typeof types.SHOW_SPINNER;
}

export interface HideSpinnerAction {
  type: typeof types.HIDE_SPINNER;
}

export interface SendNotificationAction {
  type: typeof types.SEND_NOTIFICATION;
  message: string;
}

export interface ChangeActiveFrameAction {
  type: typeof types.CHANGE_ACTIVE_FRAME;
  frameIndex: number;
}

export interface ReorderFrameAction {
  type: typeof types.REORDER_FRAME;
  selectedIndex: number;
  destinationIndex: number;
}

export interface CreateNewFrameAction {
  type: typeof types.CREATE_NEW_FRAME;
}

export interface DeleteFrameAction {
  type: typeof types.DELETE_FRAME;
  frameId: number;
}

export interface DuplicateFrameAction {
  type: typeof types.DUPLICATE_FRAME;
  frameId: number;
}

export interface SetDurationAction {
  type: typeof types.SET_DURATION;
  duration: number;
}

export interface ChangeFrameIntervalAction {
  type: typeof types.CHANGE_FRAME_INTERVAL;
  frameIndex: number;
  interval: number;
}

export interface NewProjectAction {
  type: typeof types.NEW_PROJECT;
}

export interface ChangeHoveredCellAction {
  type: typeof types.CHANGE_HOVERED_CELL;
  cell: any;
}

export function setInitialState(options: any): SetInitialStateAction {
  return {
    type: types.SET_INITIAL_STATE,
    options,
  };
}

export function changeDimensions(gridProperty: string, increment: number): ChangeDimensionsAction {
  return {
    type: types.CHANGE_DIMENSIONS,
    gridProperty,
    increment,
  };
}

export function updateGridBoundaries(gridElement: any): UpdateGridBoundariesAction {
  return {
    type: types.UPDATE_GRID_BOUNDARIES,
    gridElement,
  };
}

export function selectPaletteColor(position: number): SelectPaletteColorAction {
  return {
    type: types.SELECT_PALETTE_COLOR,
    position,
  };
}

export function setCustomColor(customColor: string): SetCustomColorAction {
  return {
    type: types.SET_CUSTOM_COLOR,
    customColor,
  };
}

export function cellAction({
                             id,
                             drawingTool,
                             color,
                             paletteColor,
                             columns,
                             rows,
                           }: {
  id: string;
  drawingTool: string;
  color: string;
  paletteColor: string;
  columns: number;
  rows: number;
}): CellAction {
  return {
    drawingTool: '',
    type: `APPLY_${drawingTool}`,
    id,
    color,
    paletteColor,
    columns,
    rows
  };
}

export function moveDrawing({
                              xDiff,
                              yDiff,
                              cellWidth,
                            }: {
  xDiff: number;
  yDiff: number;
  cellWidth: number;
}): MoveDrawingAction {
  return {
    type: types.MOVE_DRAWING,
    moveDiff: { xDiff, yDiff, cellWidth },
  };
}

export function setDrawing(
  frames: any[],
  paletteGridData: any[],
  cellSize: number,
  columns: number,
  rows: number,
  hoveredIndex: number
): SetDrawingAction {
  return {
    type: types.SET_DRAWING,
    frames,
    paletteGridData,
    cellSize,
    columns,
    rows,
    hoveredIndex,
  };
}

export function endDrag(): EndDragAction {
  return {
    type: types.END_DRAG,
  };
}

export function switchTool(tool: string): SwitchToolAction {
  return {
    type: types.SWITCH_TOOL,
    tool,
  };
}

export function setCellSize(cellSize: number): SetCellSizeAction {
  return {
    type: types.SET_CELL_SIZE,
    cellSize,
  };
}

export function resetGrid(): ResetGridAction {
  return {
    type: types.SET_RESET_GRID,
  };
}

export function showSpinner(): ShowSpinnerAction {
  return {
    type: types.SHOW_SPINNER,
  };
}

export function hideSpinner(): HideSpinnerAction {
  return {
    type: types.HIDE_SPINNER,
  };
}

export function sendNotification(message: string): SendNotificationAction {
  return {
    type: types.SEND_NOTIFICATION,
    message,
  };
}

export function changeActiveFrame(frameIndex: number): ChangeActiveFrameAction {
  return {
    type: types.CHANGE_ACTIVE_FRAME,
    frameIndex,
  };
}

export function reorderFrame(selectedIndex: number, destinationIndex: number): ReorderFrameAction {
  return {
    type: types.REORDER_FRAME,
    selectedIndex,
    destinationIndex,
  };
}

export function createNewFrame(): CreateNewFrameAction {
  return {
    type: types.CREATE_NEW_FRAME,
  };
}

export function deleteFrame(frameId: number): DeleteFrameAction {
  return {
    type: types.DELETE_FRAME,
    frameId,
  };
}

export function duplicateFrame(frameId: number): DuplicateFrameAction {
  return {
    type: types.DUPLICATE_FRAME,
    frameId,
  };
}

export function setDuration(duration: number): SetDurationAction {
  return {
    type: types.SET_DURATION,
    duration,
  };
}

export function changeFrameInterval(frameIndex: number, interval: number): ChangeFrameIntervalAction {
  return {
    type: types.CHANGE_FRAME_INTERVAL,
    frameIndex,
    interval,
  };
}

export function newProject(): NewProjectAction {
  return {
    type: types.NEW_PROJECT,
  };
}

export function changeHoveredCell(cell: any): ChangeHoveredCellAction {
  return {
    type: types.CHANGE_HOVERED_CELL,
    cell,
  };
}

export function undo() {
  return ActionCreators.undo();
}

export function redo() {
  return ActionCreators.redo();
}
