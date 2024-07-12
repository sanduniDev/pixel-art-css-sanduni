import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { switchTool } from '../store/actions/actionCreators';
import { EYEDROPPER } from '../store/reducers/drawingToolStates';

interface EyedropperProps extends PropsFromRedux {}

const Eyedropper: React.FC<EyedropperProps> = ({ eyedropperOn, switchEyedropper }) => (
  <button
    type="button"
    aria-label="Eyedropper Tool"
    className={`eyedropper${eyedropperOn ? ' selected' : ''}`}
    onClick={switchEyedropper}
  />
);

const mapStateToProps = (state) => ({
  eyedropperOn: state.present.get('drawingTool') === EYEDROPPER
});

const switchEyedropperAction = switchTool(EYEDROPPER);
const mapDispatchToProps = (dispatch: any) => ({
  switchEyedropper: () => dispatch(switchEyedropperAction)
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Eyedropper);
