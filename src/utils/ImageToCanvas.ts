// utils/ImageToCanvas.ts
interface Dimensions {
  w: number;
  h: number;
}

interface ImageLoadedData {
  errorType?: 'notImage' | 'loadError';
  imgDimensions?: Dimensions;
}

const drawFileImageToCanvas = (
  file: File,
  canvas: HTMLCanvasElement,
  callback: (imgDimensions: Dimensions) => void
): ImageLoadedData => {
  const context = canvas.getContext('2d');
  if (!context) {
    return { errorType: 'loadError' };
  }

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    callback({ w: img.width, h: img.height });
  };

  img.onerror = () => {
    return { errorType: 'notImage' };
  };

  img.src = URL.createObjectURL(file);
  return {}; // Return an empty object if no errors occur
};

export default drawFileImageToCanvas;
