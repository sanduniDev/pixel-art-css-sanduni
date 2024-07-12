import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';

const UndoRedo = ({ canUndo, canRedo, actions }) => {
  const undo = () => {
    actions.undo();
  };

  const redo = () => {
    actions.redo();
  };

  return (
    <div className="undo-redo">
      <button
        type="button"
        onClick={undo}
        disabled={!canUndo}
        aria-label="Undo"
        title="Undo"
      >
        <span className="undo-redo__icon--undo" />
      </button>
      <button
        type="button"
        onClick={redo}
        disabled={!canRedo}
        aria-label="Redo"
        title="Redo"
      >
        <span className="undo-redo__icon--redo" />
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  canUndo: state.past.length > 0, // Assuming state.past holds undoable actions
  canRedo: state.future.length > 0 // Assuming state.future holds redoable actions
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const UndoRedoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo);

export default UndoRedoContainer;
