import { addEventHandler } from "../../utils/events";
import { Position2D } from "../../utils/position";
import { cursorPosition, setCurrentCursor } from "../../window/cursor";
import { isKeyDown } from "../../window/keyboard";
import { getBlockUnderMouse } from "../blocks/interaction";
import { grabBoard } from "./main";
import { editorPosition, editorZoom, updateEditorPosition } from "../main";

function updateGrabBoard(): void {
    grabBoard.active = (
        isKeyDown(' ') &&
        getBlockUnderMouse() == null
    );

    if(grabBoard.active) {
        setCurrentCursor('grab');
    }

    if(!grabBoard.holding) return;

    let difference: Position2D = {
        x: cursorPosition.x - grabBoard.x,
        y: cursorPosition.y - grabBoard.y
    }

    editorPosition.x += difference.x / editorZoom;
    editorPosition.y += difference.y / editorZoom;

    grabBoard.x = cursorPosition.x;
    grabBoard.y = cursorPosition.y;

    updateEditorPosition();
}

addEventHandler('editorUpdate', updateGrabBoard, 1);

addEventListener('mousePressed', (event): void => {
    if(
        (<any>event).detail.button != 0 ||
        !grabBoard.active
    ) return;

    grabBoard.holding = true;
    grabBoard.x = cursorPosition.x;
    grabBoard.y = cursorPosition.y;
});

addEventListener('mouseReleased', (event): void => {
    if(
        (<any>event).detail.button != 0 ||
        !grabBoard.holding
    ) return;

    grabBoard.holding = false;
});