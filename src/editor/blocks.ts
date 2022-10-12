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

// Creating block DOM element
function createBlockDOM(block: Block): HTMLDivElement {
    let htmlElement: HTMLDivElement = <HTMLDivElement> document.createElement('div');

    htmlElement.classList.add('block-element');
    
    
    return htmlElement;
}

// Updating single block DOM
export function updateBlockDOM(block: Block | string): void {
    let blockElement: Block = getBlock(block);
    if(!blockElement) return;

    let htmlElement: HTMLDivElement = <HTMLDivElement> document.getElementById(`block-${blockElement.token}`);
    if(!htmlElement) htmlElement = createBlockDOM(blockElement);


}

// Updating all blocks DOM's
export function updateBlocksDOM(): void {
    for(let block of blocks) {
        updateBlockDOM(block);
    }
}

// Creating blocks
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

    // Update block DOM
    updateBlockDOM(block);

    return block;
}

// Get block by Block or token
export function getBlock(block: Block | string): Block {
    if(typeof block != 'string') {
        return block;
    } else {
        return blocks.find((value) => value.token == block);
    }
}

// Destroying blocks
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