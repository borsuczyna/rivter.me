export interface InputOutputDefintion {
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
    
    inputs: InputOutputDefintion[];          /* Inputs */
    outputs: InputOutputDefintion[];         /* Outputs */

    isEvent?: boolean;                      /* Is block event - action starts with it */
};

export interface BlockDefinitions {
    [key: string]: BlockDefinition
};