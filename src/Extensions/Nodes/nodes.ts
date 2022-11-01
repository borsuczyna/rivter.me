import { Block } from "../../Editor/Block/main";
import { Editor, EditorExtension } from "../../Editor/main";
import { Color } from "../../Editor/Color/color";
import { Position2D } from "../../Editor/Position/2D";
import { isMobile } from "../../final";
import { isTouchOverRect } from "../../Editor/Mobile/position";
import { isCursorOverRect } from "../../Editor/Utils/cursor";

type NodeType = 'motion-start' | 'motion-next' | 'input' | 'output';

interface NodeUnderCursor {
    block: Block;
    element: NodeType;
    position: DOMRect;
    id?: number;
};

export class Nodes extends EditorExtension {
    name: string = '@borsuk - Nodes';
    useConnecting: boolean = true;
    detectScale: number = 1.2;
    mobileScale: number = 1.6;
    mobileBiggerScale: boolean = true;

    constructor() {
        super();
    }

    initialize = (editor: Editor) => {

    };

    private calculatePosition(element: HTMLDivElement, editor: Editor, scale: number = 1, addPos: number = 0, mult: number = 1.2): DOMRect {
        let style: CSSStyleDeclaration = getComputedStyle(element, ':after');
        let matrix = new WebKitCSSMatrix(style.transform);
        let rect: DOMRect = element.getBoundingClientRect();
        
        let screen = editor.getScreenFromEditorPosition(new Position2D(0, 0));
        let detectRect: DOMRect = new DOMRect(rect.x + (matrix.m41 + addPos) * editor.zoom * mult, rect.y, 17 * editor.zoom, 17 * editor.zoom);
        return new DOMRect(
            detectRect.x + detectRect.width/2 - detectRect.width/2*scale,
            detectRect.y + detectRect.height/2 - detectRect.height/2*scale,
            detectRect.width * scale,
            detectRect.height * scale
        );
    }

    getNodePosition(block: Block, node: NodeType, scale: number = 1, id?: number): DOMRect | null {
        let element: HTMLDivElement | null;

        if(node == 'motion-start') {
            element = block.DOM.querySelector('.__motion__start .__motion__icon');
            if(!element) return null;

            return this.calculatePosition(element, block.editor, scale);
        }

        if(node == 'motion-next') {
            element = block.DOM.querySelector('.__motion__next .__motion__icon');
            if(!element) return null;

            return this.calculatePosition(element, block.editor, scale, 10, 1.2);
        }

        if(node == 'input') {
            let elements: NodeListOf<HTMLDivElement> = block.DOM.querySelectorAll<HTMLDivElement>('.__block__ball__input');
            let currentID: number = 1;
            for(let element of elements) {
                if(id == currentID) return this.calculatePosition(element, block.editor, scale, 0, 1.05);
                currentID++;
            }
        }

        if(node == 'output') {
            let elements: NodeListOf<HTMLDivElement> = block.DOM.querySelectorAll<HTMLDivElement>('.__block__ball__output');
            let currentID: number = 1;
            for(let element of elements) {
                if(id == currentID) return this.calculatePosition(element, block.editor, scale, -1, 1);
                currentID++;
            }
        }

        return null;
    }

    private checkNodes(block: Block): NodeUnderCursor | null {
        if(!block.editor) return null;

        let scale: number = this.detectScale;
        if(this.mobileBiggerScale && isMobile()) scale *= this.mobileScale;

        let cursorCheck: CallableFunction = isMobile() ? isTouchOverRect : isCursorOverRect;
        let position: DOMRect | null;

        // Motion start
        position = this.getNodePosition(block, 'motion-start', scale);
        if(position && cursorCheck(position, 0)) {
            return {
                block: block,
                element: 'motion-start',
                position: position
            };
        }

        // Motion next
        position = this.getNodePosition(block, 'motion-next', scale);
        if(position && cursorCheck(position, 0)) {
            return {
                block: block,
                element: 'motion-next',
                position: position,
            };
        }

        // Inputs
        let currentID: number = 1;
        while(true) {
            position = this.getNodePosition(block, 'input', scale, currentID);
            
            if(!position) break;
            else if(cursorCheck(position, 0)) {
                return {
                    block: block,
                    element: 'input',
                    position: position,
                    id: currentID
                };
            }

            currentID++;
        }

        // Outputs
        currentID = 1;
        while(true) {
            position = this.getNodePosition(block, 'output', scale, currentID);
            
            if(!position) break;
            else if(cursorCheck(position, 0)) {
                return {
                    block: block,
                    element: 'output',
                    position: position,
                    id: currentID
                };
            }

            currentID++;
        }
        
        return null;
    }

    getNodeUnderCursor(editor: Editor): NodeUnderCursor | null {
        for(let block of editor.getVisibleBlocks()) {
            let node: NodeUnderCursor | null = this.checkNodes(block);
            if(node) return node;
        }

        return null;
    }

    update = (editor: Editor) => {
        let node: NodeUnderCursor | null = this.getNodeUnderCursor(editor);
        if(!node) return;

        editor.drawRectangle(node.position.x, node.position.y, node.position.width, node.position.height, new Color(255, 0, 0, 155));
    };
}