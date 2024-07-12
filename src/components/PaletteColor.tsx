import React from 'react';

const PaletteColor = ({
  positionInPalette,
  width,
  color,
  selected,
  selectPaletteColor
}) => {
  const handleClick = () => selectPaletteColor(positionInPalette);

  const styles = {
    width: `${width}%`,
    paddingBottom: `${width}%`,
    backgroundColor: color
  };

  return (
    <button
      type="button"
      aria-label="Color Palette"
      className={`palette-color ${selected ? 'selected' : ''}`}
      style={styles}
      onClick={handleClick}
    />
  );
};

export default PaletteColor;
