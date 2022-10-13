import { cursorPosition, CursorPosition, setCurrentCursor } from "../window/cursor";
import { getBlockUnderMouse } from "./blocks";
import { editorPosition, editorZoom, setEditorZoom, updateEditorPosition } from "./main";
import { clamp } from '../utils/clamp';

export interface GrabBoard {
    active: boolean;
    holding: boolean;
    x: number;
    y: number;
};
export var grabBoard = {
    active: false,
    holding: false,
    x: 0,
    y: 0
}

function updateGrabBoard(): void {
    if(!grabBoard.holding) return;

    let difference: CursorPosition = {
        x: cursorPosition.x - grabBoard.x,
        y: cursorPosition.y - grabBoard.y
    }

    editorPosition.x += difference.x / editorZoom;
    editorPosition.y += difference.y / editorZoom;

    grabBoard.x = cursorPosition.x;
    grabBoard.y = cursorPosition.y;

    updateEditorPosition();

    requestAnimationFrame(updateGrabBoard);
}

addEventListener('keyPressed', (event): void => {
    if(
        (<CustomEvent>event).detail.key != ' ' ||
        getBlockUnderMouse() != null
    ) return;

    setCurrentCursor('grab');
    grabBoard.active = true;
});

addEventListener('keyReleased', (event): void => {
    if(
        (<CustomEvent>event).detail.key != ' ' ||
        !grabBoard.active
    ) return;

    setCurrentCursor('default');
    grabBoard.active = false;
});

addEventListener('mousePressed', (event): void => {
    if(
        (<any>event).detail.button != 0 ||
        !grabBoard.active
    ) return;

    grabBoard.holding = true;
    grabBoard.x = cursorPosition.x;
    grabBoard.y = cursorPosition.y;

    requestAnimationFrame(updateGrabBoard);
});

addEventListener('mouseReleased', (event): void => {
    if(
        (<any>event).detail.button != 0 ||
        !grabBoard.holding
    ) return;

    grabBoard.holding = false;
});

addEventListener('wheel', (event): void => {
    setEditorZoom(clamp(editorZoom - event.deltaY/400, 0.2, 4));
});