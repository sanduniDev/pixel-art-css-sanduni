import React from 'react';
import { connect } from 'react-redux';

interface CellsInfoProps {
  hoveredIndex: Map<string, any> | undefined; // Adjust Map type as per your Immutable structure
}

const CellsInfo: React.FC<CellsInfoProps> = ({ hoveredIndex }) => {
  const xPos = hoveredIndex ? hoveredIndex.get('x') : '0';
  const yPos = hoveredIndex ? hoveredIndex.get('y') : '0';
  return (
    <>{hoveredIndex && <div className="cellinfo">{`${xPos}, ${yPos}`}</div>}</>
  );
};

const mapStateToProps = (state) => ({
  hoveredIndex: state.present.getIn(['frames', 'hoveredIndex'])
});

const CellsInfoContainer = connect(mapStateToProps)(CellsInfo);
export default CellsInfoContainer;
