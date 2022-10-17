export function drawGraph(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, graph: number[], amount: number = 10, minimalMax: number | null = null) {
    graph = graph.slice(-amount);
    amount = graph.length;

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);

    let min = 0; // Math.min(...graph);
    let max = Math.max(...graph, minimalMax || 0);

    ctx.font = '8px \'Open Sans\', sans-serif';

    for(let i: number = 0; i < 5; i++) {
        let progress: number = i/4;
        ctx.fillText(Math.floor(max + (min-max)*progress).toString(), x - 13, y + 3 + (height-6)*progress);
    }

    ctx.beginPath();

    let moved: boolean = false;
    for(let point: number = 0; point < amount; point++) {
        let progress: number = point/(amount-1);

        let targetX = x + progress*width;
        let targetY = y + height - height * (graph[point]/max);

        if(!moved) {
            ctx.moveTo(targetX, targetY);
            moved = true;
        }

        ctx.lineTo(targetX, targetY);
    }

    ctx.stroke();
}