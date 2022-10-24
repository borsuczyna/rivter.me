import { Position2D } from "../Position/2D";

export const cursorPosition: Position2D = new Position2D();
const buttonsDown: {[button: number]: boolean} = {};

export function isCursorOverRect(rect: DOMRect): boolean {
    return (
        cursorPosition.x >= rect.x &&
        cursorPosition.y >= rect.y &&
        cursorPosition.x <= rect.x + rect.width &&
        cursorPosition.y <= rect.y + rect.height
    );
}

export function isMouseButtonDown(button: number): boolean {
    return buttonsDown[button];
}

addEventListener('mousemove', event => {
    cursorPosition.x = event.clientX;
    cursorPosition.y = event.clientY;
});

addEventListener('mousedown', event => {
    buttonsDown[event.button] = true;
});

addEventListener('mouseup', event => {
    buttonsDown[event.button] = false;
});