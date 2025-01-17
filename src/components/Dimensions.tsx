import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Picker from './Picker';
import * as actionCreators from '../store/actions/actionCreators';


const PickerWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Dimensions: React.FC<PropsFromRedux> = ({ columns, rows, actions }) => {
  const changeDimensions = (gridProperty: string, behaviour: any) => {
    actions.changeDimensions(gridProperty, behaviour);
  };

  return (
    <div className="dimensions">
      <PickerWrapper>
        <Picker type="columns" value={columns} action={changeDimensions} />
      </PickerWrapper>
      <PickerWrapper>
        <Picker type="rows" value={rows} action={changeDimensions} />
      </PickerWrapper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  columns: state.present.getIn(['frames', 'columns']),
  rows: state.present.getIn(['frames', 'rows'])
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Dimensions);
