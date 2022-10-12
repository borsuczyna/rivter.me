import { Block, createBlock, destroyBlock } from '../editor/blocks';
import { expect } from './test';

var block: Block;

expect('create block', (): boolean => {
    block = createBlock('Player joined');
    return block.type == 'Player joined';
});

expect('destroy block', (): boolean => {
    return destroyBlock(block);
});