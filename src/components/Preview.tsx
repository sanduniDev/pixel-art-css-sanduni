import React from 'react';
import {
  generatePixelDrawCss,
  generateAnimationCSSData
} from '../utils/cssParse';
import Animation from './Animation';

const Preview = props => {
  const { activeFrameIndex, duration, storedData, animationName } = props;
  const { frames, columns, rows, cellSize, animate } = storedData || props;
  const animation = frames.size > 1 && animate;
  let animationData;
  let cssString = '';
  const generatePreview = () => {
    const styles = {
      previewWrapper: {
        height: cellSize,
        width: cellSize,
        position: 'absolute' as 'absolute',
        top: '-5px',
        left: '-5px',
        boxShadow: cssString,
        MozBoxShadow: cssString,
        WebkitBoxShadow: cssString
      }
    };

    if (animation) {
      animationData = generateAnimationCSSData(frames, columns, cellSize);
    } else {
      cssString = generatePixelDrawCss(
        frames.get(activeFrameIndex),
        columns,
        cellSize,
        'string'
      );
    }

    return (
      <div style={animation ? undefined : styles.previewWrapper}>
        {animation ? (
          <Animation
            duration={duration}
            boxShadow={animationData}
            name={animationName}
          />
        ) : null}
      </div>
    );
  };

  const style = {
    width: columns * cellSize,
    height: rows * cellSize,
    position: 'relative' as 'relative'
  };

  return (
    <div className="preview" style={style}>
      {generatePreview()}
    </div>
  );
};

export default Preview;
