import React from 'react';
import renderCanvasGIF from '../utils/canvasGIF';
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

interface DownloadDrawingProps extends PropsFromRedux {
  downloadType: string;
}

const DownloadDrawing: React.FC<DownloadDrawingProps> = ({
  downloadType,
  frames,
  activeFrame,
  columns,
  rows,
  cellSize,
  duration,
  actions
}) => {
  const DOWNLOAD_MESSAGE = 'Downloading...';

  const download = (type: string) => {
    actions.sendNotification(DOWNLOAD_MESSAGE);
    renderCanvasGIF({
      type,
      frames,
      activeFrame,
      columns,
      rows,
      cellSize,
      duration
    });
  };

  return (
    <button
      type="button"
      className="download-btn"
      onClick={() => {
        download(downloadType);
      }}
    >
      DOWNLOAD
    </button>
  );
};

const mapStateToProps = (state) => ({
  frames: state.present.get('frames'),
  activeFrame: state.present.get('activeFrame'),
  columns: state.present.get('columns'),
  rows: state.present.get('rows'),
  cellSize: state.present.get('cellSize'),
  duration: state.present.get('duration')
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actionCreators as ActionCreatorsMapObject, dispatch)
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DownloadDrawing);
