import { BlockDefinition, BlockType, findDefinition } from '../libs/lib';
import { generateToken } from '../utils/token';
import { cursorPosition } from '../window/cursor';
import { getBoardFromEditorPosition } from './board';
import { editorWindow } from './main';

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
    let definition: BlockDefinition | undefined = findDefinition(block.type);
    if(!definition) return;

    let htmlElement: HTMLDivElement = <HTMLDivElement> document.createElement('div');
    let title: HTMLElement = document.createElement('div');

    htmlElement.classList.add('block-element');
    htmlElement.id = `block-${block.token}`;
    editorWindow.appendChild(htmlElement);

    title.innerText = definition.name;
    title.classList.add('block-title');

    htmlElement.appendChild(title);

    return htmlElement;
}

// Get block DOM element
function getBlockDOM(block: Block | string): HTMLDivElement {
    let blockElement: Block = getBlock(block);
    if(!blockElement) return;

    let htmlElement: HTMLDivElement = <HTMLDivElement> document.getElementById(`block-${blockElement.token}`);
    if(!htmlElement) htmlElement = createBlockDOM(blockElement);

    return htmlElement;
}

// Destroying block DOM element
function destroyBlockDOM(block: Block | string): void {
    let htmlElement: HTMLDivElement = getBlockDOM(block);
    if(!htmlElement) return;

    htmlElement.remove();
}

// Updating single block DOM
export function updateBlockDOM(block: Block | string): void {
    let htmlElement: HTMLDivElement = getBlockDOM(block);
    let blockElement: Block = getBlock(block);

    if(!htmlElement) return;

    htmlElement.style.setProperty('--position-x', `${blockElement.x}px`);
    htmlElement.style.setProperty('--position-y', `${blockElement.y}px`);
}

// Updating all blocks DOM's
export function updateBlocksDOM(): void {
    for(let block of blocks) {
        updateBlockDOM(block);
    }
}

// Creating blocks
export function createBlock(type: BlockType, x?: number, y?: number): Block {
    x = x || getBoardFromEditorPosition(cursorPosition.x, cursorPosition.y).x;
    y = y || getBoardFromEditorPosition(cursorPosition.x, cursorPosition.y).y;
    
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
    destroyBlockDOM(block);

    if(typeof block == 'string') {
        blocks = blocks.filter((value: Block, index: number) => value.token != block);
        return true;
    } else {
        const blockIndex: number = blocks.indexOf(block);
        if (blockIndex !== -1) {
            blocks.splice(blockIndex, 1);
            return true;
        }
    }

    return false;
}

// Get cursor under mouse
export function getBlockUnderMouse(): Block | null {
    return null;
};