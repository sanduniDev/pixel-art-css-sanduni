import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';

interface ResetProps {
  frames: any;
  paletteGridData: any;
  cellSize: number;
  columns: number;
  rows: number;
  actions: {
    reset: () => void;
  };
}

const Reset: React.FC<ResetProps> = ({ actions }) => {
  const reset = () => {
    actions.reset();
  };

  return (
    <button onClick={reset}>Reset</button>
  );
};

const mapStateToProps = (state: any) => ({
  frames: state.present.get('frames').get('list'),
  columns: state.present.get('frames').get('columns'),
  rows: state.present.get('frames').get('rows'),
  cellSize: state.present.get('cellSize'),
  paletteGridData: state.present.get('paletteGridData')
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    reset: () => actionCreators.setInitialState({})
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
