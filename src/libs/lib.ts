import { Color } from "../utils/color";

export type BlockType = string;

export interface NodeDefintion {
    name: string;                           /* Input/output name */
    hoverTip?: string;                      /* Tip that shows when user hovers cursor over input/output */
    type: string;                           /* Input/output type */
    force?: boolean;                        /* Is it always needed to generate code | ONLY INPUT */
    default?: any;                          /* Default value | ONLY INPUT */
};

export interface BlockDefinition {
    name: string;                           /* Block name */
    hoverTip?: string;                      /* Tip that shows when user hovers cursor over block name */

    motionStart: boolean;                   /* Can motion be continued with this block */
    motionNext: boolean;                    /* Can this block continue motion */
    
    inputs: NodeDefintion[];         /* Inputs */
    outputs: NodeDefintion[];        /* Outputs */

    isEvent?: boolean;                      /* Is block event - action starts with it */
};

export interface BlockNode {
    color: Color;
    validConnections: string[] | 'anything';
};

export interface BlockDefinitions {
    [key: BlockType]: BlockDefinition
};

export interface BlockNodes {
    [key: string]: BlockNode
};

export var definitions: BlockDefinitions = {};
export var nodes: BlockNodes = {};

export function loadDefinitions(defs: BlockDefinitions): void {
    definitions = {...definitions, ...defs};
}

export function loadNodes(nodes_: BlockNodes): void {
    nodes = {...nodes, ...nodes_};
}

export function findDefinition(key: BlockType): BlockDefinition | undefined {
    return definitions[key];
}

export function findNode(key: string): BlockNode | undefined {
    return nodes[key];
}