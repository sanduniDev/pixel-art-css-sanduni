import React, { CSSProperties } from 'react';
import { keyframes } from 'styled-components';
import randomString from '../utils/random';

interface AnimationProps {
  boxShadow: string;
  duration: number;
  name?: string;
}

const Animation: React.FC<AnimationProps> = (props) => {
  const { boxShadow, duration, name } = props;
  const keyframeName = name !== undefined ? name : randomString();
  const keyframeRules = keyframes`${boxShadow}`;

  const style: CSSProperties = {
    position: 'absolute',
    animation: `${keyframeName} ${duration}s infinite`,
    left: '-5px',
    top: '-5px'
  };

  return (
    <div>
      <div className="animation-container" style={style} />
      <style>
        {`
          @keyframes ${keyframeName} {
            ${keyframeRules}
          }
        `}
      </style>
    </div>
  );
};

export default Animation;
