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

export function createBlock(type: BlockType): Block {
    let block: Block = {
        type: type,
        inputNodes: [],
        outputNodes: [],
    };

    return block;
}

export function destroyBlock(block: Block): boolean {
    return true;
}