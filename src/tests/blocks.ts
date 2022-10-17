import { Block, createBlock, destroyBlock } from '../editor/blocks/main';
import { getBoardFromEditorPosition } from '../editor/board/main';
import { cursorPosition } from '../window/cursor';
import { expect } from './test';

var block: Block;

expect('create block', (): boolean => {
    block = createBlock('Player joined');
    return block.type == 'Player joined';
});

expect('destroy block', (): boolean => {
    return destroyBlock(block);
});

expect('destroy block via token', (): boolean => {
    return destroyBlock(block.token);
});

expect('destroy invalid block', (): boolean => {
    // @ts-ignore
    return !destroyBlock(<Block> undefined);
});

expect('create block at 50x50 position', (): boolean => {
    block = createBlock('Player joined', 50, 50);
    let success = block.x == 50 && block.y == 50;

    destroyBlock(block);

    return success;
});

expect('created block should create DOM element', (): boolean => {
    block = createBlock('Player joined', 50, 50);
    let DOM = document.getElementById(`block-${block.token}`);

    destroyBlock(block);

    return !!DOM;
});

expect('destroying block should delete DOM element', (): boolean => {
    block = createBlock('Player joined', 50, 50);
    let preDOM: HTMLElement | null = document.getElementById(`block-${block.token}`);
    destroyBlock(block);
    let postDOM: HTMLElement | null = document.getElementById(`block-${block.token}`);

    return (preDOM && !postDOM) || false;
});

expect('create block for testing frontend purposes', (): boolean => {
    block = createBlock('Player joined', 50, 50);

    return !!block;
});

expect('clicking should create block on cursor position', async (): Promise<boolean> => {
    let promise = new Promise<boolean>((resolve, reject) => {
        let createBlockOnClick = () => {
            let block = createBlock('Player joined');

            resolve(
                block.x == getBoardFromEditorPosition(cursorPosition.x, cursorPosition.y).x &&
                block.y == getBoardFromEditorPosition(cursorPosition.x, cursorPosition.y).y
            )

            removeEventListener('mousePressed', createBlockOnClick);
        }

        addEventListener('mousePressed', createBlockOnClick);
    });

    return await promise;
});