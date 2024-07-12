import React from 'react';
import PixelCell from './PixelCell';

const PixelGrid = ({
  cells,
  drawHandlers,
  classes,
  nbrColumns,
  hoveredCell
}) => (
  <div className={classes} role="grid" onTouchMove={drawHandlers.onTouchMove}>
    {cells.map(cell => (
      <PixelCell
        key={cell.id}
        cell={cell}
        id={cell.id}
        drawHandlers={drawHandlers}
        onFocus={(id, ev) => drawHandlers.onMouseOver(id, ev)}
        nbrColumns={nbrColumns}
        hoveredCell={hoveredCell}
        role="gridcell"
        aria-labelledby={`pixel-cell-${cell.id}`}
        tabIndex={0}
      />
    ))}
  </div>
);

export default PixelGrid;
