import { Block, createBlock, destroyBlock } from '../editor/blocks';
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

expect('create block at cursor position', (): boolean => {
    block = createBlock('Player joined');
    let success = block.x == cursorPosition.x && block.y == cursorPosition.y;

    destroyBlock(block);

    return success;
});

expect('create block at 50x50 position', (): boolean => {
    block = createBlock('Player joined', 50, 50);
    let success = block.x == 50 && block.y == 50;

    destroyBlock(block);

    return success;
});

expect('destroy not valid block', (): boolean => {
    return !destroyBlock(null);
})