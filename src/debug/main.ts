import { addEventHandler } from '../utils/events';
import { editorCanvas, editorDimensions } from '../editor/main';
import { drawGraph } from './graph';

interface Debug {
    lastFrame: Date,
    frameTime: number[],
    fps: number[]
};

const debugData: Debug = {
    lastFrame: new Date(),
    frameTime: [],
    fps: []
};

addEventHandler('editorUpdate', () => {
    if(!editorCanvas) return;
    
    editorCanvas.clearRect(0, 0, editorDimensions.width, editorDimensions.height);

    let frameTime: number = new Date().getTime() - debugData.lastFrame.getTime();
    debugData.frameTime.push(frameTime);
    debugData.fps.push(Math.floor(1000/frameTime));

    editorCanvas.font = '10px \'Open Sans\', sans-serif';
    editorCanvas.fillStyle = '#FFffffCC';
    editorCanvas.textBaseline = 'middle';

    editorCanvas.fillText('frame time', 20, 15);
    drawGraph(editorCanvas, 20, 25, 250, 130, debugData.frameTime, 100, 50);
    
    editorCanvas.fillText('fps', 20, 175);
    drawGraph(editorCanvas, 20, 185, 250, 130, debugData.fps, 100, 80);

    debugData.lastFrame = new Date();
}, 999);