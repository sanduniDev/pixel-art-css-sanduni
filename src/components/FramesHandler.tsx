import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Scrollbars } from 'react-custom-scrollbars';
import * as actionCreators from '../store/actions/actionCreators';
import Frame from './Frame';

interface FramesHandlerProps extends PropsFromRedux {
  list: any;
  columns: number;
  rows: number;
  activeIndex: number;
}

interface FramesHandlerState {
  newFrame: boolean;
}

class FramesHandler extends Component<FramesHandlerProps, FramesHandlerState> {
  scrollbars: Scrollbars | null = null;

  constructor(props: FramesHandlerProps) {
    super(props);
    this.state = { newFrame: false };
  }

  handleClick = () => {
    const { actions } = this.props;
    actions.createNewFrame();
    this.setState({ newFrame: true });
  };

  onDragEnd = (result: any) => {
    const { destination, source } = result;
    const { actions } = this.props;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    actions.reorderFrame(source.index, destination.index);
  };

  onScrollbarUpdate = () => {
    const { newFrame } = this.state;
    if (newFrame && this.scrollbars) {
      this.setState({ newFrame: false });
      if (this.scrollbars.scrollToRight) {
        this.scrollbars.scrollToRight();
      }
    }
  };

  getFrames = () => {
    const { list, columns, rows, activeIndex, actions } = this.props;
    return list.map((frameData: any, index: number) => (
      <Frame
        key={frameData.get('key')}
        dataId={index}
        frame={frameData}
        columns={columns}
        rows={rows}
        active={activeIndex === index}
        lastFrame={list.size - 1 === index}
        actions={{
          changeActiveFrame: actions.changeActiveFrame,
          deleteFrame: actions.deleteFrame,
          duplicateFrame: actions.duplicateFrame,
          changeFrameInterval: actions.changeFrameInterval
        }}
      />
    ));
  };

  render() {
    return (
      <div className="frames-handler">
        <button
          type="button"
          className="frames-handler__add"
          onClick={this.handleClick}
        >
          +
        </button>
        <div className="frame-handler__list">
          <Scrollbars
            autoHeight
            ref={(c) => {
              this.scrollbars = c;
            }}
            universal
            onUpdate={this.onScrollbarUpdate}
          >
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                  <div
                    className="list__container"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {this.getFrames()}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => state.present.get('frames').toObject();

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FramesHandler);
