import { editorCursor } from "../editor/main";

type CursorType = 'default' | 'alias' | 'all-scroll' | 'auto' | 'cell' | 'col-resize' | 'context-menu' | 'copy' | 'crosshair' | 'default' | 'e-resize' | 'ew-resize' | 'grab' | 'grabbing' | 'help' | 'move' | 'n-resize' | 'ne-resize' | 'nesw-resize' | 'ns-resize' | 'nw-resize' | 'nwse-resize' | 'no-drop' | 'none' | 'not-allowed' | 'pointer' | 'progress' | 'row-resize' | 's-resize' | 'se-resize' | 'sw-resize' | 'text' | 'url' | 'w-resize' | 'wait' | 'zoom-in' | 'zoom-out';

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

addEventListener('mousedown', (e) => {    
    let event: CustomEvent = new CustomEvent('mousePressed', {
        detail: {
            button: e.button
        }
    });
    window.dispatchEvent(event);
});

addEventListener('mouseup', (e) => {    
    let event: CustomEvent = new CustomEvent('mouseReleased', {
        detail: {
            button: e.button
        }
    });
    window.dispatchEvent(event);
});

export function setCurrentCursor(cursor: CursorType): void {
    editorCursor.style.cursor = cursor;
}