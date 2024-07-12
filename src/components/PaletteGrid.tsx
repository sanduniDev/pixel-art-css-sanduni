import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPaletteColor } from '../store/actions/actionCreators';
import PaletteColor from './PaletteColor';

const PaletteGrid = ({ grid, position, selectPaletteColor }) => {
  const getColors = () => {
    const width = 100 / 6; // Assuming you have 6 colors per row

    return grid.map((color, index) => (
      <PaletteColor
        key={color.get('id')} // Assuming color has an 'id' property
        positionInPalette={index}
        width={width}
        color={color.get('color')} // Assuming color has a 'color' property
        selected={position === index}
        selectPaletteColor={selectPaletteColor}
      />
    ));
  };

  return <div className="palette-grid">{getColors()}</div>;
};

const mapStateToProps = state => state.present.get('palette').toObject();

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectPaletteColor
    },
    dispatch
  );

const PaletteGridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaletteGrid);

export default PaletteGridContainer;
