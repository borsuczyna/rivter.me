export interface CursorPosition {
    x: number,
    y: number
};

export const cursorPosition: CursorPosition = {
    x: 0,
    y: 0
};

function mouseMoved(e: MouseEvent): void {
    cursorPosition.x = e.clientX;
    cursorPosition.y = e.clientY;
}

addEventListener('mousemove', mouseMoved);