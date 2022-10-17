import { addEventHandler } from '../utils/events';
import { editorCanvas, editorDimensions } from './main';

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

function drawDebugGraph(x: number, y: number, width: number, height: number, graph: number[], amount: number = 10, minimalMax: number | null = null) {
    graph = graph.slice(-amount);
    amount = graph.length;

    editorCanvas.fillStyle = 'white';
    editorCanvas.strokeStyle = 'white';
    editorCanvas.lineWidth = 1;
    editorCanvas.strokeRect(x, y, width, height);

    let min = 0; // Math.min(...graph);
    let max = Math.max(...graph, minimalMax);

    editorCanvas.font = '8px \'Open Sans\', sans-serif';

    for(let i: number = 0; i < 5; i++) {
        let progress: number = i/4;
        editorCanvas.fillText(Math.floor(max + (min-max)*progress).toString(), x - 13, y + 3 + (height-6)*progress);
    }

    editorCanvas.beginPath();

    let moved: boolean = false;
    for(let point: number = 0; point < amount; point++) {
        let progress: number = point/(amount-1);

        let targetX = x + progress*width;
        let targetY = y + height - height * (graph[point]/max);

        if(!moved) {
            editorCanvas.moveTo(targetX, targetY);
            moved = true;
        }

        editorCanvas.lineTo(targetX, targetY);
    }

    editorCanvas.stroke();
}

addEventHandler('editorUpdate', () => {
    editorCanvas.clearRect(0, 0, editorDimensions.width, editorDimensions.height);

    let frameTime: number = new Date().getTime() - debugData.lastFrame.getTime();
    debugData.frameTime.push(frameTime);
    debugData.fps.push(Math.floor(1000/frameTime));

    editorCanvas.font = '10px \'Open Sans\', sans-serif';
    editorCanvas.fillStyle = '#FFffffCC';
    editorCanvas.textBaseline = 'middle';

    editorCanvas.fillText('frame time', 20, 15);
    drawDebugGraph(20, 25, 250, 130, debugData.frameTime, 100, 50);
    
    editorCanvas.fillText('fps', 20, 175);
    drawDebugGraph(20, 185, 250, 130, debugData.fps, 100, 80);

    debugData.lastFrame = new Date();
}, 999);