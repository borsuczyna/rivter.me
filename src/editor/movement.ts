import { editorCursor } from "./main";
import { isKeyDown } from "../window/keyboard";
import { setCurrentCursor } from "../window/cursor";
import { getBlock, getBlockUnderMouse } from "./blocks";

export var grabCursorActive: boolean = false;

addEventListener('keyPressed', (event): void => {
    if(
        (<CustomEvent>event).detail.key != ' ' ||
        getBlockUnderMouse() != null
    ) return;

    setCurrentCursor('grab');
    grabCursorActive = true;
});

addEventListener('keyReleased', (event): void => {
    if(
        (<CustomEvent>event).detail.key != ' ' ||
        !grabCursorActive
    ) return;

    setCurrentCursor('default');
    grabCursorActive = false;
});