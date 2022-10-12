import { generateToken } from "../utils/token";
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
    token: string;

    type: BlockType;
    inputNodes: InputNode[];
    outputNodes: OutputNode[];

    x: number;
    y: number;
};

export var blocks: Block[] = [];

export function updateBlocksDOM(): void {

}

export function createBlock(type: BlockType, x?: number, y?: number): Block {
    x = x || cursorPosition.x;
    y = y || cursorPosition.y;
    
    let block: Block = {
        token: generateToken(),
        type: type,
        inputNodes: [],
        outputNodes: [],
        x: x,
        y: y
    };

    blocks.push(block);

    return block;
}

export function destroyBlock(block: Block | string): boolean {
    if(typeof block == 'string') {
        blocks = blocks.filter((value: Block, index: number) => value.token != block);
        return true;
    } else {
        const blockIndex = blocks.indexOf(block);
        if (blockIndex !== -1) {
            blocks.splice(blockIndex, 1);
            return true;
        }
    }

    return false;
}