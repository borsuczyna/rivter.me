import { Block, NodeConnection, NodeType } from "../../Editor/Block/main";
import { Editor, EditorExtension } from "../../Editor/main";
import { Color } from "../../Editor/Color/color";
import { Position2D } from "../../Editor/Position/2D";
import { isMobile } from '../../Editor/Mobile/check';
import { getTouchPosition, isTouchOverRect } from "../../Editor/Mobile/position";
import { cursorPosition, isCursorOverRect, isMouseButtonDown } from "../../Editor/Utils/cursor";
import { BlockGrabbing } from "../Grabbing/blocks";
import { Cursor } from "../Cursor/cursor";
import { BlockDefinition } from "../../final";
import { Dot, DotNodes } from "../../Extensions/DotNodes/DotNodes";

interface NodeUnderCursor {
    block: Block;
    element: NodeType;
    position: DOMRect;
    id?: number;
};

interface HoldingNode {
    block: Block;
    element: NodeType;
    id?: number;
};

export class Nodes extends EditorExtension {
    name: string = '@borsuk - Nodes';
    useConnecting: boolean = true;
    mobileSupport: boolean = true;
    detectScale: number = 1.2;
    mobileScale: number = 1.6;
    mobileBiggerScale: boolean = true;
    lineWidth: number = 2;
    holding: HoldingNode | null = null;
    blockMask: boolean = true;
    maskSize: number = 35;
    maskAlpha: number = 3;
    private mask: {
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
    };

    constructor() {
        super();

        // @ts-ignore - just ignore that, we will fill that anyways
        this.mask = {};
        this.mask.canvas = document.createElement('canvas');
        this.mask.context = this.mask.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    private updateMaskDimensions(width: number, height: number) {
        this.mask.canvas.width = width;
        this.mask.canvas.height = height;
    }

    private updateMask() {
        let editor = this.editors[0];
        if(
            editor &&
            this.blockMask &&
            editor.DOM.context &&
            editor.DOM.canvas
        ) {
            let editorRect: DOMRect | undefined = this.editors[0].DOM.canvas?.getBoundingClientRect();
            editorRect = editorRect || new DOMRect(0, 0, 0, 0);
            
            this.mask.context.shadowBlur = this.maskSize;
            this.mask.context.shadowColor = 'black';
            this.mask.context.globalCompositeOperation = 'lighter';
            this.mask.context.clearRect(0, 0, this.mask.canvas.width, this.mask.canvas.height);
            for(let block of editor.blocks) {
                let rect: DOMRect = block.DOM.getBoundingClientRect();
                for(let i = 0; i < this.maskAlpha; i++) this.mask.context.fillRect(rect.x - editorRect.x, rect.y - editorRect.y, rect.width, rect.height);
            }

            let w = editor.DOM.canvas.width/2;
            let h = editor.DOM.canvas.height/2;
            editor.DOM.context.globalCompositeOperation = 'destination-out';
            // editor.DOM.context.beginPath();
            // editor.DOM.context.arc(w, h, 150, 0, 2*Math.PI);
            // editor.DOM.context.fillStyle = 'rgba(255, 255, 255, 1)';
            // editor.DOM.context.fill();
            editor.DOM.context.drawImage(this.mask.canvas, 0, 0);
            editor.DOM.context.globalCompositeOperation = 'source-over';
        }
    }

    initialize = (editor: Editor) => {
        if(this.editors.length > 1) throw new Error('Nodes extension can be used only on one editor at once!');

        let rect: DOMRect | undefined = this.editors[0].DOM.canvas?.getBoundingClientRect();
        if(rect) {
            this.updateMaskDimensions(rect.width, rect.height);
        }

        editor.addEventHandler('dimensions-update', this.updateMaskDimensions.bind(this));
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

    private invertType(type: NodeType): NodeType {
        switch(type) {
            case 'input':
                return 'output';
            case 'motion-next':
                return 'motion-start';
            case 'motion-start':
                return 'motion-next';
            case 'output':
                return 'input';
        }
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

    getNodeDOMElement(block: Block, node: NodeType, id?: number): HTMLDivElement | null {
        let element: HTMLDivElement | null;

        if(node == 'motion-start') return block.DOM.querySelector('.__motion__start .__motion__icon');
        if(node == 'motion-next') return block.DOM.querySelector('.__motion__next .__motion__icon');

        if(node == 'input') {
            let elements: NodeListOf<HTMLDivElement> = block.DOM.querySelectorAll<HTMLDivElement>('.__block__ball__input');
            let currentID: number = 1;
            for(let element of elements) {
                if(id == currentID) return element;
                currentID++;
            }
        }

        if(node == 'output') {
            let elements: NodeListOf<HTMLDivElement> = block.DOM.querySelectorAll<HTMLDivElement>('.__block__ball__output');
            let currentID: number = 1;
            for(let element of elements) {
                if(id == currentID) return element;
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

    private drawBlockNodeConnections(block: Block, drawn: NodeConnection[]) {
        let isDrawn = (node: NodeConnection): boolean => {
            return (
                drawn.filter((value: NodeConnection): boolean => {
                    return (
                        node.block == value.block &&
                        node.startID == value.startID &&
                        node.targetID == value.targetID &&
                        node.type == value.type
                    )
                }).length > 0
            )
        };

        for(let connection of block.connections) {
            if(isDrawn(connection)) continue;

            let isMotion: boolean = (connection.type == 'motion-start' || connection.type == 'motion-next');
            let position: DOMRect | null = this.getNodePosition(block, connection.type, 1, connection.startID);
            let tPosition: DOMRect | null = this.getNodePosition(connection.block, this.invertType(connection.type), 1, connection.targetID);

            if(position && tPosition) {
                let startPosition: Position2D = (
                    isMotion ?
                    new Position2D(position.x + position.width/1.5, position.y + position.height/2*0.9) :
                    new Position2D(position.x + position.width/2, position.y + position.height/3)
                );

                let targetPosition: Position2D = (
                    isMotion ?
                    new Position2D(tPosition.x + tPosition.width/2*1.1, tPosition.y + tPosition.height/2*0.9) :
                    new Position2D(tPosition.x + tPosition.width/2, tPosition.y + tPosition.height/3)
                );

                let editorPosition: DOMRect = block.editor.DOM.div.getBoundingClientRect();
                let element: HTMLDivElement | null = this.getNodeDOMElement(block, connection.type, connection.startID);
                let element2: HTMLDivElement | null = this.getNodeDOMElement(connection.block, this.invertType(connection.type), connection.targetID);
                if(!element || !element2) return;
                let style: CSSStyleDeclaration = getComputedStyle(element);
                let style2: CSSStyleDeclaration = getComputedStyle(element2);

                block.editor.easyQuadraticCurve(
                    Position2D.difference(startPosition, new Position2D(editorPosition.x, editorPosition.y)),
                    Position2D.difference(targetPosition, new Position2D(editorPosition.x, editorPosition.y)),
                    isMotion ? Color.fromRGB(style.borderColor) : [Color.fromRGB(style['background-color']), Color.fromRGB(style2['background-color'])],
                    block.editor.zoom*this.lineWidth
                );

                drawn.push({
                    block: block,
                    type: this.invertType(connection.type),
                    startID: connection.targetID,
                    targetID: connection.startID
                });
            }
        }
    }

    private lastNode: NodeUnderCursor | null;

    update = (editor: Editor) => {
        let visible: Block[] = editor.blocks;//editor.getVisibleBlocks();
        let drawn: NodeConnection[] = [];

        for(let block of visible) {
            this.drawBlockNodeConnections(block, drawn);
        }
        
        let node: NodeUnderCursor | null = this.getNodeUnderCursor(editor);
        let dotNodes: DotNodes | null = (<DotNodes>editor.findExtensionByPartialName('Dot nodes'));
        let dot: Dot | null = dotNodes?.getDotUnderCursor();
        if(node || this.holding) {
            (<Cursor>editor.findExtensionByPartialName('Cursor'))?.setCursor('cell');
        }

        if(
            node &&
            this.useConnecting &&
            !this.holding &&
            (
                (!isMobile() && isMouseButtonDown(0)) || (
                    isMobile() && getTouchPosition(0).x != 0 && getTouchPosition(0).y != 0
                )
            ) &&
            !((<BlockGrabbing>editor.findExtensionByPartialName('Block grabbing'))?.holding) &&
            !((<DotNodes>editor.findExtensionByPartialName('Dot nodes'))?.holding)
        ) {
            let connection: NodeConnection | null = node.block.findConnection(node.element, node.id);
            if(connection) {
                if(node.element != 'output') {
                    connection.block.removeConnection(this.invertType(node.element), connection.targetID);
                    node.block.removeConnection(node.element, node.id);
                }
            }

            this.holding = {
                block: node.block,
                element: node.element,
                id: node.id
            };
        } else if(this.holding) {
            if(!(
                (!isMobile() && isMouseButtonDown(0)) || (
                    isMobile() && getTouchPosition(0).x != 0 && getTouchPosition(0).y != 0
                )
            )) {
                if(this.lastNode && this.invertType(this.holding.element) == this.lastNode.element) {
                    let connection: NodeConnection | null = this.lastNode.block.findConnection(this.lastNode.element, this.lastNode.id);
                    let definition: BlockDefinition = editor.findDefinition(this.holding.block.type);
                    let definition2: BlockDefinition = editor.findDefinition(this.lastNode.block.type);

                    if(
                        this.holding.element.startsWith('motion') ||
                        (this.holding.element == 'input' ? definition.inputs : definition.outputs)[<number>this.holding.id-1].type == (this.holding.element == 'input' ? definition2.outputs : definition2.inputs)[<number>this.lastNode.id-1].type
                    ) {
                        if(connection) {
                            if(this.lastNode.element != 'output' && connection.type != 'input') {
                                connection.block.removeConnection(this.invertType(this.lastNode.element), connection.targetID);
                                this.lastNode.block.removeConnection(this.lastNode.element, this.lastNode.id);
                            }
                        }

                        if(this.lastNode.element.startsWith('motion')) {
                            this.holding.block.createConnection(this.lastNode.block, this.invertType(this.lastNode.element));
                        } else {
                            this.holding.block.createConnection(this.lastNode.block, this.lastNode.element, this.holding.id, this.lastNode.id);
                        }
                    }
                }

                this.holding = null;
                return;
            }

            let position: DOMRect | undefined | null = this.getNodePosition(this.holding.block, this.holding.element, 1, this.holding.id);
            if(position) {
                let isMotion: boolean = (this.holding.element == 'motion-start' || this.holding.element == 'motion-next');
                
                let startPosition: Position2D = (
                    isMotion ?
                    new Position2D(position.x + position.width/1.5, position.y + position.height/2*0.9) :
                    new Position2D(position.x + position.width/2, position.y + position.height/3)
                );

                let targetPosition: Position2D = !isMobile() ? cursorPosition : getTouchPosition(0);
                let editorPosition: DOMRect = this.holding.block.editor.DOM.div.getBoundingClientRect();
                let element: HTMLDivElement | null = this.getNodeDOMElement(this.holding.block, this.holding.element, this.holding.id);
                let element2: HTMLDivElement | null = null;
                let canConnect: boolean = false;

                if(!element) return;
                let style: CSSStyleDeclaration = getComputedStyle(element);

                if(node && this.invertType(this.holding.element) == node.element) {
                    element2 = this.getNodeDOMElement(node.block, node.element, node.id);
                    let definition: BlockDefinition = editor.findDefinition(this.holding.block.type);
                    let definition2: BlockDefinition = editor.findDefinition(node.block.type);

                    if(
                        this.holding.element.startsWith('motion') ||
                        (this.holding.element == 'input' ? definition.inputs : definition.outputs)[<number>this.holding.id-1].type == (this.holding.element == 'input' ? definition2.outputs : definition2.inputs)[<number>node.id-1].type
                    ) {
                        canConnect = true;
                        let tPosition: DOMRect | null = this.getNodePosition(node.block, node.element, 1, node.id);
                        if(tPosition) targetPosition = (
                            isMotion ?
                            new Position2D(tPosition.x + tPosition.width/2*1.1, tPosition.y + tPosition.height/2*0.9) :
                            new Position2D(tPosition.x + tPosition.width/2, tPosition.y + tPosition.height/3)
                        );
                    }
                } else if(dot) {
                    let tPosition: DOMRect | undefined = dotNodes?.getRect(dot);
                    if(tPosition) targetPosition = (
                        isMotion ?
                        new Position2D(tPosition.x + tPosition.width/2, tPosition.y + tPosition.height/2) :
                        new Position2D(tPosition.x + tPosition.width/2, tPosition.y + tPosition.height/2)
                    );

                    dot.tempColor = style['background-color'];
                }

                let style2: CSSStyleDeclaration | null = null;
                if(element2) style2 = getComputedStyle(element2);

                this.holding.block.editor.easyQuadraticCurve(
                    Position2D.difference(startPosition, new Position2D(editorPosition.x, editorPosition.y)),
                    Position2D.difference(targetPosition, new Position2D(editorPosition.x, editorPosition.y)),
                    this.holding.element.startsWith('motion') ? Color.fromRGB(style.borderColor) : (
                        (style2 && canConnect) ? [Color.fromRGB(style['background-color']), Color.fromRGB(style2['background-color'])] : Color.fromRGB(style['background-color'])
                    ),
                    this.holding.block.editor.zoom*this.lineWidth
                );
            }
        }

        this.updateMask();

        this.lastNode = node;
    };
}