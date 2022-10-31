import { Block } from "../../Editor/Block/main";
import { Editor, EditorExtension } from "../../Editor/main";

interface NodeUnderCursor {
    block: Block;
    element: 'motion-start' | 'motion-next' | 'input' | 'output';
    id?: number;
};

export class Nodes extends EditorExtension {
    name: string = '@borsuk - Nodes';
    connecting: boolean = true;

    constructor() {
        super();
    }

    initialize = (editor: Editor) => {

    };

    getNodeUnderCursor(editor: Editor): NodeUnderCursor | null {
        

        return null;
    }

    update = (editor: Editor) => {
        let node: NodeUnderCursor | null = this.getNodeUnderCursor(editor);
        if(!node) return;

        console.log(node);
    };
}