interface Debug {
    lastFrame: Date,
    frameTime: number[]
};

const debugData: Debug = {
    lastFrame: new Date(),
    frameTime: []
};

export function drawDebugGraph(canvas: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, graph: number[], amount: number = 10, minimalMax: number | null = null) {
    graph = graph.slice(-amount);
    amount = graph.length;

    canvas.fillStyle = 'white';
    canvas.strokeStyle = 'white';
    canvas.lineWidth = 1;
    canvas.strokeRect(x, y, width, height);

    let min = 0; // Math.min(...graph);
    let max = Math.max(...graph, (minimalMax || 0));

    canvas.font = '8px \'Open Sans\', sans-serif';

    for(let i: number = 0; i < 5; i++) {
        let progress: number = i/4;
        canvas.fillText(Math.floor(max + (min-max)*progress).toString(), x - 13, y + 3 + (height-6)*progress);
    }

    canvas.beginPath();

    let moved: boolean = false;
    for(let point: number = 0; point < amount; point++) {
        let progress: number = point/(amount-1);

        let targetX = x + progress*width;
        let targetY = y + height - height * (graph[point]/max);

        if(!moved) {
            canvas.moveTo(targetX, targetY);
            moved = true;
        }

        canvas.lineTo(targetX, targetY);
    }

    canvas.stroke();
}