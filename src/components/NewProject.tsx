import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';
import { NewProjectAction } from '../store/actions/actionCreators';

interface NewProjectProps {
  actions: {
    newProject: () => NewProjectAction;
  };
}

const NewProject: React.FC<NewProjectProps> = ({ actions }) => {
  const handleNewProjectClick = () => {
    actions.newProject();
  };

  return (
    <div className="new-project">
      <button type="button" onClick={handleNewProjectClick}>
        NEW
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const NewProjectContainer = connect(null, mapDispatchToProps)(NewProject);

export default NewProjectContainer;
