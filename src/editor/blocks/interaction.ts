import { addEventHandler } from "../../utils/events";
import { isCursorOnRect, setCurrentCursor } from "../../window/cursor";
import { Block, blocks, getBlockDOM } from "../blocks/main";
import { grabBoard } from "../board/main";
import { isRectOnScreen } from "../main";

// Get block under mouse
export function getBlockUnderMouse(): Block | null {
    for(let block of blocks) {
        let rect: DOMRect | undefined = getBlockDOM(block)?.getBoundingClientRect();
        if(rect && isCursorOnRect(rect)) {
            return block;
        }
    }

    return null;
};

function isBlockOnScreen(block: Block | string): boolean {
    let htmlElement: HTMLDivElement | undefined = getBlockDOM(block);
    if(!htmlElement) return false;

    return isRectOnScreen(htmlElement.getBoundingClientRect());
}

function updateBlockInteractions() {
    let resetToDefault = true;

    for(let block of blocks) {
        let onScreen: boolean = isBlockOnScreen(block);
        if(!onScreen) continue;

        // Grabbing block by title name
        let htmlElement: HTMLDivElement | undefined = getBlockDOM(block);
        let title: HTMLDivElement | null | undefined = htmlElement?.querySelector('.block-title');
        let titleRect: DOMRect | undefined = title?.getBoundingClientRect();
        if(
            titleRect &&
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