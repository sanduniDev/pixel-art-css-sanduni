import React, { Component, ChangeEvent } from 'react';
import { List } from 'immutable';
import { Draggable } from 'react-beautiful-dnd';
import Preview from './Preview';

interface FrameProps {
  actions: any;
  dataId: number;
  active: boolean;
  frame: any;
  lastFrame: boolean;
  columns: number;
  rows: number;
}

export default class Frame extends Component<FrameProps, any> {
  private percentage: HTMLInputElement | null = null;

  handleClick() {
    const { actions, dataId } = this.props;
    actions.changeActiveFrame(dataId);
  }

  deleteFrame(e: React.MouseEvent<HTMLButtonElement>) {
    const { active, actions, dataId } = this.props;
    e.stopPropagation();
    if (active) {
      actions.deleteFrame(dataId);
    }
  }

  duplicateFrame(e: React.MouseEvent<HTMLButtonElement>) {
    const { active, actions, dataId } = this.props;
    e.stopPropagation();
    if (active) {
      actions.duplicateFrame(dataId);
    }
  }

  changeInterval(e: ChangeEvent<HTMLInputElement>) {
    const { active, actions, dataId } = this.props;
    e.stopPropagation();
    if (active && this.percentage) {
      actions.changeFrameInterval(dataId, +this.percentage.value);
    }
  }

  render() {
    const { active, dataId, frame, lastFrame, columns, rows } = this.props;
    return (
      <Draggable key={dataId} draggableId={dataId.toString()} index={dataId}>
        {(provided) => (
          <div
            className={`frame${active ? ' active' : ''}`}
            onClick={() => {
              this.handleClick();
            }}
            onKeyPress={() => {
              this.handleClick();
            }}
            role="button"
            tabIndex={0}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Preview
              frames={List([frame])}
              columns={columns}
              rows={rows}
              cellSize={2}
              activeFrameIndex={0}
            />
            <button
              type="button"
              aria-label="Delete Frame"
              className="delete"
              onClick={(event) => {
                this.deleteFrame(event);
              }}
            />
            <button
              type="button"
              aria-label="Duplicate Frame"
              className="duplicate"
              onClick={(event) => {
                this.duplicateFrame(event);
              }}
            />
            <input
              type="number"
              value={frame.get('interval')}
              onChange={(event) => {
                this.changeInterval(event);
              }}
              className="frame__percentage"
              ref={(c) => {
                this.percentage = c;
              }}
              disabled={lastFrame || !active}
            />
          </div>
        )}
      </Draggable>
    );
  }
}
