import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import ReactModal from 'react-modal';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock';
import * as actionCreators from '../store/actions/actionCreators';

import RadioSelector from './RadioSelector';
import LoadDrawing from './LoadDrawing';
import Preview from './Preview';
import CopyCSS from './CopyCSS';
import DownloadDrawing from './DownloadDrawing';
import KeyBindingsLegend from './KeyBindingsLegend';
import { LoadDrawingProps } from '../utils/LoadDrawingProps';

interface ModalProps {
  isOpen: boolean;
  type: 'load' | 'copycss' | 'download' | 'keybindings';
  close: () => void;
  open?: () => void;
  frames: any;
  columns: number;
  rows: number;
  cellSize: number;
  paletteGridData: any;
  duration: number;
  activeFrameIndex: number;
  activeFrame: any;
  actions: {
    setDrawing: (frames: any[], paletteGridData: any[], cellSize: number, columns: number, rows: number, hoveredIndex: number) => void;
    sendNotification: (message: string) => void;
  };
}

const Modal: React.FC<ModalProps> = (props) => {
  const { isOpen, type, close, frames, columns, rows, cellSize, paletteGridData, duration, activeFrameIndex, activeFrame, actions } = props;
  const [previewType, setPreviewType] = useState('single');
  const [loadType, setLoadType] = useState('storage');

  const modalBodyRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<ReactModal>(null);

  useEffect(() => {
    ReactModal.setAppElement('body');

    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  const showModal = () => {
    const modalContainer = modalContainerRef.current?.portal as unknown as HTMLElement;
    if (modalContainer) {
      disableBodyScroll(modalContainer);
    }
  };

  const closeModal = () => {
    const modalContainer = modalContainerRef.current?.portal as unknown as HTMLElement;
    if (modalContainer) {
      enableBodyScroll(modalContainer);
    }
    close();
  };

  const changeRadioType = (value: string, type: string) => {
    scrollTop();
    if (type === 'load-type') {
      setLoadType(value);
    } else {
      setPreviewType(value);
    }
  };

  const scrollTop = () => {
    modalBodyRef.current?.scrollTo(0, 0);
  };

  const generateRadioOptions = (props: any): any[] => {
    let options: any[];

    if (props.type !== 'load') {
      options = [
        {
          value: 'single',
          description: 'single',
          labelFor: 'single',
          id: 3
        }
      ];

      if (props.frames.size > 1) {
        const spritesheetSupport =
          props.type === 'download' || props.type === 'twitter';
        const animationOptionLabel = spritesheetSupport ? 'GIF' : 'animation';

        const animationOption = {
          value: 'animation',
          description: animationOptionLabel,
          labelFor: animationOptionLabel,
          id: 4
        };
        options.push(animationOption);

        if (spritesheetSupport) {
          options.push({
            value: 'spritesheet',
            description: 'spritesheet',
            labelFor: 'spritesheet',
            id: 5
          });
        }
      }
    } else {
      options = [
        {
          value: 'storage',
          description: 'Stored',
          labelFor: 'stored',
          id: 0
        },
        {
          value: 'loadImgFile',
          description: 'Load From Image',
          labelFor: 'load-img-file',
          id: 1
        },
        {
          value: 'import',
          description: 'Import',
          labelFor: 'import',
          id: 2
        },
        {
          value: 'export',
          description: 'Export',
          labelFor: 'export',
          id: 3
        },
        {
          value: 'extractData',
          description: 'Useful Data',
          labelFor: 'useful-data',
          id: 4
        }
      ];
    }

    return options;
  };

  const getModalContent = () => {
    const options = generateRadioOptions(props);
    let content: JSX.Element | null = null;
    const previewBlock = (
      <>
        {previewType !== 'spritesheet' ? (
          <div className="modal__preview--wrapper">
            <Preview
              key="0"
              frames={frames}
              columns={columns}
              rows={rows}
              cellSize={type === 'preview' ? cellSize : 5}
              duration={duration}
              activeFrameIndex={activeFrameIndex}
              animate={previewType === 'animation'}
            />
          </div>
        ) : null}
      </>
    );
    const isLoadModal = type === 'load';
    const radioType = isLoadModal ? 'load' : 'preview';
    let radioOptions = (
      <div className={`modal__${radioType}`}>
        <RadioSelector
          name={`${radioType}-type`}
          selected={isLoadModal ? loadType : previewType}
          change={changeRadioType}
          options={options}
        />
      </div>
    );

    switch (type) {
      case 'load':
        content = (
          <LoadDrawing
            loadType={loadType as LoadDrawingProps['loadType']}
            close={closeModal}
            open={props.open}
            frames={frames}
            columns={columns}
            rows={rows}
            cellSize={cellSize}
            paletteGridData={paletteGridData}
            actions={{
              setDrawing: actions.setDrawing,
              sendNotification: actions.sendNotification
            }}
          />
        );
        break;
      case 'copycss':
        content = (
          <>
            {previewBlock}
            <CopyCSS
              frames={frames}
              columns={columns}
              rows={rows}
              cellSize={cellSize}
              activeFrameIndex={activeFrameIndex}
              animationCode={previewType !== 'single'}
              duration={duration}
            />
          </>
        );
        break;
      case 'download':
        content = (
          <>
            {previewBlock}
            <DownloadDrawing
              frames={frames}
              activeFrame={activeFrame}
              columns={columns}
              rows={rows}
              cellSize={cellSize}
              duration={duration}
              downloadType={previewType}
              actions={{ sendNotification: actions.sendNotification }}
            />
          </>
        );
        break;
      case 'keybindings':
        content = (
          <>
            <KeyBindingsLegend />
          </>
        );
        radioOptions = null;
        break;
      default:
        content = <>{previewBlock}</>;
        break;
    }

    return (
      <div className="modal">
        <div className="modal__header">
          <button type="button" className="close" onClick={closeModal}>
            x
          </button>
        </div>
        {radioOptions}
        <div className="modal__body" ref={modalBodyRef}>
          {content}
        </div>
      </div>
    );
  };

  const styles = {
    content: {
      overflow: 'hidden',
      display: 'flex'
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      onAfterOpen={showModal}
      ref={modalContainerRef}
      style={styles}
      contentLabel={`Dialog ${type || ''}`}
    >
      {getModalContent()}
    </ReactModal>
  );
};

const mapStateToProps = (state: any) => {
  const frames = state.present.get('frames');
  const activeFrameIndex = frames.get('activeIndex');
  return {
    frames: frames.get('list'),
    activeFrameIndex,
    activeFrame: frames.getIn(['list', activeFrameIndex]),
    paletteGridData: state.present.getIn(['palette', 'grid']),
    columns: frames.get('columns'),
    rows: frames.get('rows'),
    cellSize: state.present.get('cellSize'),
    duration: state.present.get('duration')
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(Modal);
export default ModalContainer;
