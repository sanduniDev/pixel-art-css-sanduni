import * as types from '../actions/actionTypes';
import { PENCIL, ERASER, EYEDROPPER, MOVE } from './drawingToolStates';

type DrawingToolAction = {
  type: string;
  tool?: string; // Adjust based on actual action properties
};

const switchTool = (drawingTool: string = PENCIL, tool: string): string => {
  if (drawingTool === tool) {
    return PENCIL;
  }
  return tool;
};

const disableTool = (drawingTool: string, tool: string): string => {
  if (drawingTool === tool) {
    return PENCIL;
  }
  return drawingTool;
};

export default function drawingToolReducer(drawingTool: string = PENCIL, action: DrawingToolAction): string {
  switch (action.type) {
    case types.SET_INITIAL_STATE:
    case types.NEW_PROJECT:
    case types.APPLY_EYEDROPPER:
      return PENCIL;
    case types.SELECT_PALETTE_COLOR:
      return [EYEDROPPER, ERASER, MOVE].reduce(disableTool, drawingTool);
    case types.SWITCH_TOOL:
      return switchTool(drawingTool, action.tool || PENCIL); // Default to PENCIL if action.tool is undefined
    default:
      return drawingTool;
  }
}
