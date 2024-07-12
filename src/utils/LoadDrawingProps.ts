// types.ts or wherever appropriate

export interface LoadDrawingProps {
  loadType: 'storage' | 'loadImgFile' | 'import' | 'export' | 'extractData';
  close: () => void;
  open?: () => void;
  frames: any;
  columns: number;
  rows: number;
  cellSize: number;
  paletteGridData: any;
  actions: {
    setDrawing: (frames: any[], paletteGridData: any[], cellSize: number, columns: number, rows: number, hoveredIndex: number) => void;
    sendNotification: (message: string) => void;
  };
}
