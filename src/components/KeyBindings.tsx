import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import tinykeys from 'tinykeys';
import {
  undo,
  redo,
  switchTool,
  changeDimensions
} from '../store/actions/actionCreators';
import {
  MOVE,
  ERASER,
  BUCKET,
  EYEDROPPER,
  COLOR_PICKER
} from '../store/reducers/drawingToolStates';

interface KeyBindingsProps {
  onClick: () => void;
}

const KeyBindings: React.FC<KeyBindingsProps> = ({ onClick }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const keyCombinations = {
      '$mod+KeyZ': (event: KeyboardEvent) => {
        event.preventDefault();
        dispatch(undo());
      },
      '$mod+KeyY': (event: KeyboardEvent) => {
        event.preventDefault();
        dispatch(redo());
      },
      // prettier-ignore
      'KeyM': (event: KeyboardEvent) => {
        event.preventDefault();
        dispatch(switchTool(MOVE));
      },
      // prettier-ignore
      'KeyE': (event: KeyboardEvent) => {
        event.preventDefault();
        dispatch(switchTool(ERASER));
      },
      // prettier-ignore
      'KeyB': (event: KeyboardEvent) => {
        event.preventDefault();
        dispatch(switchTool(BUCKET));
      },
      // prettier-ignore
      'KeyO': (event: KeyboardEvent) => {
        event.preventDefault();
        dispatch(switchTool(EYEDROPPER));
      },
      // prettier-ignore
      'KeyP': (event: KeyboardEvent) => {
        event.preventDefault();
        dispatch(switchTool(COLOR_PICKER));
      },
      '$mod+ArrowRight': (event: KeyboardEvent) => {
        event.preventDefault();
        dispatch(changeDimensions('columns', 1));
      },
      '$mod+ArrowLeft': (event: KeyboardEvent) => {
        event.preventDefault();
        dispatch(changeDimensions('columns', -1));
      },
      '$mod+ArrowDown': (event: KeyboardEvent) => {
        event.preventDefault();
        dispatch(changeDimensions('rows', 1));
      },
      '$mod+ArrowUp': (event: KeyboardEvent) => {
        event.preventDefault();
        dispatch(changeDimensions('rows', -1));
      }
    };

    const unsubscribe = tinykeys(window, keyCombinations);

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <button
      type="button"
      className="app__shortcuts-button"
      aria-label="Show keyboard shortcuts"
      onClick={onClick}
    />
  );
};

export default KeyBindings;
