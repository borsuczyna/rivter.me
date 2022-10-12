import { cursorPosition } from "../window/cursor";

export type BlockType = string;

export interface NodeConnection {
    block: Block;
    node: number;
};

export interface InputNode {
    connected: NodeConnection | null;
};

export interface OutputNode {
    connected: NodeConnection | null;
};

export interface Block {
    type: BlockType;
    inputNodes: InputNode[];
    outputNodes: OutputNode[];
};

export const blocks: Block[] = [];

export function createBlock(type: BlockType, x?: number, y?: number): Block {
    let block: Block = {
        type: type,
        inputNodes: [],
        outputNodes: [],
    };

    x = x || cursorPosition.x;
    y = y || cursorPosition.y;

    blocks.push(block);

    return block;
}

export function destroyBlock(block: Block): boolean {
    const blockIndex = blocks.indexOf(block);
    if (blockIndex !== -1) {
        blocks.splice(blockIndex, 1);
        return true;
    }

    return false;
}