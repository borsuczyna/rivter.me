import { addEventHandler } from "../utils/events";
import { isCursorOnRect, setCurrentCursor } from "../window/cursor";
import { Block, blocks, getBlockDOM } from "./blocks";
import { grabBoard } from "./board";
import { editorDimensions, isRectOnScreen } from "./main";

function isBlockOnScreen(block: Block | string): boolean {
    let htmlElement: HTMLDivElement = getBlockDOM(block);
    if(!htmlElement) return;

    return isRectOnScreen(htmlElement.getBoundingClientRect());
}

function updateBlockInteractions() {
    let resetToDefault = true;

    for(let block of blocks) {
        let onScreen: boolean = isBlockOnScreen(block);
        if(!onScreen) continue;

        // Grabbing block by title name
        let htmlElement: HTMLDivElement = getBlockDOM(block);
        let title: HTMLDivElement = htmlElement.querySelector('.block-title');
        let titleRect: DOMRect = title.getBoundingClientRect();
        if(
            isRectOnScreen(titleRect) &&
            isCursorOnRect(titleRect) &&
            !grabBoard.holding
        ) {
            setCurrentCursor('grab');
            resetToDefault = false;
        }
    }
}

addEventHandler('editorUpdate', updateBlockInteractions, 0);