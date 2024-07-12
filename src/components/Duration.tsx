import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';


interface DurationProps extends PropsFromRedux {}

const Duration: React.FC<DurationProps> = ({ actions, duration }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    actions.setDuration(Number(event.target.value));
  };

  return (
    <div className="duration">
      <label htmlFor="duration__input">
        Duration
        <input
          type="number"
          value={duration}
          onChange={handleChange}
          id="duration__input"
        />
      </label>
    </div>
  );
};

const mapStateToProps = (state) => ({
  duration: state.present.get('duration')
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Duration);
