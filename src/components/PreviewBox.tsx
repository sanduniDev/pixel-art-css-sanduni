import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Preview from './Preview';

const PreviewBox = ({ helpOn, callback }) => {
  const [animate, setAnimate] = useState(false);
  const [isNormalSize, setIsNormalSize] = useState(true);
  const frames = useSelector(state => state.present.get('frames'));
  const duration = useSelector(state => state.present.get('duration'));
  const frameList = frames.get('list');
  const activeFrameIndex = frames.get('activeIndex');
  const columns = frames.get('columns');
  const rows = frames.get('rows');
  const smPixelSize = 3;
  const bgPixelSize = 6;

  const toggleAnimation = () => setAnimate(prev => !prev);
  const toggleZoom = () => setIsNormalSize(prev => !prev);

  const animMessage = `${animate ? 'Pause' : 'Play'} the animation`;
  const zoomMessage = `Zoom ${isNormalSize ? '0.5' : '1.5'}`;
  const animTooltip = helpOn ? animMessage : null;
  const zoomTooltip = helpOn ? zoomMessage : null;

  return (
    <div className="preview-box">
      <div className="buttons">
        <div data-tooltip={animTooltip}>
          <button
            type="button"
            className={animate ? 'pause' : 'play'}
            onClick={toggleAnimation}
            aria-label="Toggle Animation"
          />
        </div>
        <div data-tooltip={zoomTooltip}>
          <button
            type="button"
            className={isNormalSize ? 'screen-normal' : 'screen-full'}
            aria-label="Toggle Zoom"
            onClick={toggleZoom}
          />
        </div>
        <div data-tooltip={helpOn ? 'Show a preview of your project' : null}>
          <button
            type="button"
            className="frames"
            aria-label="Open Frame Modal"
            onClick={callback}
          />
        </div>
      </div>
      <div className="preview-box__container">
        <Preview
          frames={frameList}
          columns={columns}
          rows={rows}
          cellSize={isNormalSize ? bgPixelSize : smPixelSize}
          duration={duration}
          activeFrameIndex={activeFrameIndex}
          animate={animate}
          animationName="wip-animation"
        />
      </div>
    </div>
  );
};

export default PreviewBox;
