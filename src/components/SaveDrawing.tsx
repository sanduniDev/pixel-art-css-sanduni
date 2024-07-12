import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shortid from 'shortid';
import * as actionCreators from '../store/actions/actionCreators';
import { saveProjectToStorage } from '../utils/storage';

const SaveDrawing = ({ frames, paletteGridData, cellSize, columns, rows, actions }) => {
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    const drawingToSave = {
      frames,
      paletteGridData,
      cellSize,
      columns,
      rows,
      animate: frames.size > 1,
      id: shortid.generate()
    };

    const success = saveProjectToStorage(localStorage, drawingToSave);

    if (success) {
      actions.sendNotification('Drawing saved');
    } else {
      actions.sendNotification('Failed to save drawing', 'error');
    }

    setSaving(false);
  };

  return (
    <div className="save-drawing">
      <button
        type="button"
        onClick={save}
        disabled={saving}
      >
        {saving ? 'Saving...' : 'SAVE'}
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  frames: state.present.get('frames').get('list'),
  columns: state.present.get('frames').get('columns'),
  rows: state.present.get('frames').get('rows'),
  cellSize: state.present.get('cellSize'),
  paletteGridData: state.present.getIn(['palette', 'grid'])
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const SaveDrawingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveDrawing);

export default SaveDrawingContainer;
