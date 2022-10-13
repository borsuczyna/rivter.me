import { Block, createBlock, destroyBlock } from '../editor/blocks';
import { getBoardFromEditorPosition } from '../editor/board';
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
    return !destroyBlock(null);
})

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
    let preDOM = document.getElementById(`block-${block.token}`);
    destroyBlock(block);
    let postDOM = document.getElementById(`block-${block.token}`);

    return preDOM && !postDOM;
});

expect('create block for testing frontend purposes', (): boolean => {
    block = createBlock('Player joined', 50, 50);

    return !!block;
});

expect('clicking should create block on cursor position', async (): Promise<boolean> => {
    let promise = new Promise<boolean>((resolve, reject) => {
        addEventListener('mousePressed', (event) => {
            let block = createBlock('Player joined');

            resolve(
                block.x == getBoardFromEditorPosition(cursorPosition.x, cursorPosition.y).x &&
                block.y == getBoardFromEditorPosition(cursorPosition.x, cursorPosition.y).y
            )
        });
    });

    return await promise;
});