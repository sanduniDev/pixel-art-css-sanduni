import { List, Map, fromJS } from 'immutable';
import shortid from 'shortid';
import * as types from '../actions/actionTypes';
import { GRID_INITIAL_COLOR } from './activeFrameReducer';

interface ColorData {
  r: number;
  g: number;
  b: number;
  a: number;
}

type Palette = Map<string, any>; // Adjust according to your palette structure

const getPositionFirstMatchInPalette = (grid: List<Map<string, any>>, color: string): number =>
  grid.findIndex(gridColor => gridColor.get('color') === color);

const isColorInPalette = (grid: List<Map<string, any>>, color: string): boolean =>
  getPositionFirstMatchInPalette(grid, color) !== -1;

const parseColorToString = (colorData: string | ColorData): string =>
  typeof colorData === 'string'
    ? colorData
    : `rgba(${colorData.r},${colorData.g},${colorData.b},${colorData.a})`;

const disableColor = (palette: Palette, action: { tool: string }): Palette => {
  if (action.tool === 'ERASER' || action.tool === 'MOVE') {
    return palette.set('position', -1);
  }
  return palette;
};

const addColorToLastGridCell = (palette: Palette, newColor: string): Palette => {
  const grid = palette.get('grid');
  const lastPosition = grid.size - 1;
  return palette.merge({
    grid: grid.setIn([lastPosition, 'color'], parseColorToString(newColor)),
    position: lastPosition
  });
};

const createPaletteGrid = (): List<Map<string, any>> =>
  List([
    'rgba(0, 0, 0, 1)',
    'rgba(255, 0, 0, 1)',
    'rgba(233, 30, 99, 1)',
    'rgba(156, 39, 176, 1)',
    'rgba(103, 58, 183, 1)',
    'rgba(63, 81, 181, 1)',
    'rgba(33, 150, 243, 1)',
    'rgba(3, 169, 244, 1)',
    'rgba(0, 188, 212, 1)',
    'rgba(0, 150, 136, 1)',
    'rgba(76, 175, 80, 1)',
    'rgba(139, 195, 74, 1)',
    'rgba(205, 220, 57, 1)',
    'rgba(158, 224, 122, 1)',
    'rgba(255, 235, 59, 1)',
    'rgba(255, 193, 7, 1)',
    'rgba(255, 152, 0, 1)',
    'rgba(255, 205, 210, 1)',
    'rgba(255, 87, 34, 1)',
    'rgba(121, 85, 72, 1)',
    'rgba(158, 158, 158, 1)',
    'rgba(96, 125, 139, 1)',
    'rgba(48, 63, 70, 1)',
    'rgba(255, 255, 255, 1)',
    'rgba(56, 53, 53, 1)',
    'rgba(56, 53, 53, 1)',
    'rgba(56, 53, 53, 1)',
    'rgba(56, 53, 53, 1)',
    'rgba(56, 53, 53, 1)',
    'rgba(56, 53, 53, 1)'
  ]).map(color => Map({ color, id: shortid.generate() }));

const isColorSelected = (palette: Palette): boolean => palette.get('position') !== -1;

const resetSelectedColorState = (palette: Palette): Palette => palette.set('position', 0);

const createPalette = (): Palette =>
  Map({
    grid: createPaletteGrid(),
    position: 0
  });

const getCellColor = (action: { color: string }): string => action.color || GRID_INITIAL_COLOR;

const eyedropColor = (palette: Palette, action: { color: string }): Palette => {
  const cellColor = getCellColor(action);
  const grid = palette.get('grid');

  if (!isColorInPalette(grid, cellColor)) {
    return addColorToLastGridCell(palette, cellColor);
  }
  return palette.set(
    'position',
    getPositionFirstMatchInPalette(grid, cellColor)
  );
};

const preparePalette = (palette: Palette): Palette => {
  if (!isColorSelected(palette)) {
    return resetSelectedColorState(palette);
  }
  return palette;
};

const selectPaletteColor = (palette: Palette, action: { position: number }): Palette =>
  palette.set('position', action.position);

const setCustomColor = (palette: Palette, { customColor }: { customColor: string | ColorData }): Palette => {
  if (!isColorSelected(palette)) {
    return addColorToLastGridCell(palette, customColor);
  }
  const customColorRgba = parseColorToString(customColor);
  return palette.setIn(
    ['grid', palette.get('position'), 'color'],
    customColorRgba
  );
};

const setPalette = (palette: Palette, action: { paletteGridData: any[] }): Palette => {
  const defaultPalette = action.paletteGridData.length === 0;
  return palette.set(
    'grid',
    fromJS(defaultPalette ? createPaletteGrid() : action.paletteGridData)
  );
};

export default function paletteReducer(palette: Palette = createPalette(), action: any): Palette {
  switch (action.type) {
    case types.SET_INITIAL_STATE:
    case types.NEW_PROJECT:
      return createPalette();
    case types.APPLY_EYEDROPPER:
      return eyedropColor(palette, action);
    case types.APPLY_PENCIL:
    case types.APPLY_BUCKET:
      return preparePalette(palette);
    case types.SELECT_PALETTE_COLOR:
      return selectPaletteColor(palette, action);
    case types.SET_CUSTOM_COLOR:
      return setCustomColor(palette, action);
    case types.SWITCH_TOOL:
      return disableColor(palette, action);
    case types.SET_DRAWING:
      return setPalette(palette, action);
    default:
      return palette;
  }
}
