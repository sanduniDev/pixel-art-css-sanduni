import React, { FC, ReactNode } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import theme from 'styled-theming';

const colors = {
  silver: '#bbb',
  mineShaft: '#313131',
  doveGray: '#707070',
  tundora: '#4b4949',
  lotus: '#803c3c',
  buccaneer: '#733939',
  cowboy: '#552a2a',
  steelblue: '#5786c1',
  sanMarino: '#4171ae',
  eastBay: '#3a587f',
  chathamsBlue: '#164075',
  chambray: '#2f5382',
  cloudBurst: '#253c5a',
  alto: '#e0e0e0',
  silveChalice: '#a0a0a0',
  nobel: '#b7b7b7',
  shrub: '#0e8044'
};

const textColor = theme.variant('mode', 'variant', {
  default: { default: colors.silver },
  action: { default: colors.silver },
  close: { default: colors.silver },
  info: { default: colors.silver },
  white: { default: 'black' },
  proceed: { default: colors.silver }
});

const bgColor = theme.variant('mode', 'variant', {
  default: { default: colors.mineShaft },
  action: { default: colors.lotus },
  close: { default: colors.steelblue },
  info: { default: colors.chathamsBlue },
  white: { default: colors.alto },
  proceed: { default: colors.shrub }
});

const boxShadowColor = theme.variant('mode', 'variant', {
  default: { default: colors.doveGray },
  action: { default: colors.buccaneer },
  close: { default: colors.sanMarino },
  info: { default: colors.chambray },
  white: { default: colors.silveChalice },
  proceed: { default: colors.nobel }
});

const bgActiveColor = theme.variant('mode', 'variant', {
  default: { default: colors.tundora },
  action: { default: colors.cowboy },
  close: { default: colors.eastBay },
  info: { default: colors.cloudBurst },
  white: { default: colors.nobel },
  proceed: { default: colors.shrub }
});

const ButtonCSS = css<{ size?: 'normal' | 'half' | 'full' }>`
  background: none;
  border: none;
  outline: none;
  border-radius: 2px;
  padding: 10px;
  font-size: 1em;
  text-decoration: none;
  transition-duration: 0.1s;
  color: ${textColor};
  background-color: ${bgColor};
  box-shadow: 0 5px 0 0 ${boxShadowColor};
  margin: 0 auto;
  &:hover,
  &.selected {
    background-color: ${bgActiveColor};
  }
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: translate(0, 5px);
    box-shadow: 0 1px 0 ${bgActiveColor};
    background-color: ${bgActiveColor};
  }

  ${props => {
    const widthOptions = { full: '100%', half: '50%', normal: 'auto' };
    const size = widthOptions[props.size || 'normal'];
    return (
      props.size &&
      css`
        width: ${size};
      `
    );
  }};
`;

const ButtonStyled = styled.button.attrs(props => ({
  disabled: props.disabled
}))<{ size?: 'normal' | 'half' | 'full'; disabled?: boolean }>`
  ${ButtonCSS}
  ${props =>
    props.size &&
    css`
      opacity: ${props.disabled ? '0.5' : '1'};
    `};
`;

const InputFileLabelStyled = styled.label.attrs({
  htmlFor: 'load-image-input'
})<{ size?: 'normal' | 'half' | 'full' }>`
    ${ButtonCSS}
    cursor: pointer;
`;

const InputFileStyled = styled.input.attrs({
  type: 'file',
  id: 'load-image-input',
  role: 'button'
})`
  opacity: 0;
  position: absolute;
  z-index: -1;
`;

interface ButtonProps {
  children: ReactNode;
  variant?: 'default' | 'info' | 'close' | 'action' | 'white' | 'proceed';
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'button' | 'file';
  size?: 'normal' | 'half' | 'full';
  ariaLabel: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'default',
  onClick = () => {},
  onChange,
  type,
  size,
  ariaLabel,
  disabled = false
}) => (
  <ThemeProvider theme={{ mode: 'default' }}>
    {type === 'file' ? (
      <>
        <InputFileLabelStyled variant={variant} size={size}>
          {children}
        </InputFileLabelStyled>
        <InputFileStyled aria-label={ariaLabel} onChange={onChange} />
      </>
    ) : (
      <ButtonStyled
        variant={variant}
        onClick={onClick}
        size={size}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {children}
      </ButtonStyled>
    )}
  </ThemeProvider>
);

export default Button;
