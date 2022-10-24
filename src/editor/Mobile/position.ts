import { Position2D } from "../Position/2D"

export interface TouchPositions {
    [touch: number]: Position2D
};

const touchPosition: TouchPositions = {};

export function getTouchPosition(touch: number): Position2D {
    return touchPosition[touch] || new Position2D();
}

export function getTouchesCount(): number {
    return Object.keys(touchPosition).length;
}

export function isTouchOverRect(rect: DOMRect, touch: number) {
    let touchPosition = getTouchPosition(touch);

    return (
        touchPosition.x >= rect.x &&
        touchPosition.x <= rect.x + rect.width &&
        touchPosition.y >= rect.y &&
        touchPosition.y <= rect.y + rect.height
    );
}

addEventListener('touchend', (event) => {
    for(let touch of event.changedTouches) {
        delete touchPosition[touch.identifier];
    }
});

addEventListener('touchmove', (event) => {
    for(let touch of event.changedTouches) {
        touchPosition[touch.identifier] = new Position2D(touch.clientX, touch.clientY);
    }
});