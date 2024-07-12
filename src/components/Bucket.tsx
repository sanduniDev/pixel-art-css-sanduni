import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { switchTool } from '../store/actions/actionCreators';


interface BucketProps {
  bucketOn: boolean;
  switchBucket: () => void;
}

const Bucket: React.FC<BucketProps> = ({ bucketOn, switchBucket }) => (
  <button
    type="button"
    aria-label="Paint Bucket Tool"
    className={`bucket${bucketOn ? ' selected' : ''}`}
    onClick={switchBucket}
  />
);

const mapStateToProps = (state) => ({
  bucketOn: state.present.get('drawingTool') === 'BUCKET',
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  switchBucket: () => dispatch(switchTool('BUCKET')),
});

const BucketContainer = connect(mapStateToProps, mapDispatchToProps)(Bucket);
export default BucketContainer;
