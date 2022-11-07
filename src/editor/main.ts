import { BlockDefinition, BlockDefinitions, BlockNodes, BlockNode } from "./Libraries/lib";
import { Block } from "./Block/main";
import { Position2D } from "./Position/2D";
import { defaultStyle, BlockStyle, Style } from './Block/style';
import { Background } from "../final";
import { Color } from './Color/color';

export interface EditorDOM {
    div: HTMLDivElement;
    blockDiv: HTMLDivElement | undefined;
    canvas: HTMLCanvasElement | undefined;
    context: CanvasRenderingContext2D | undefined;
};

export class EditorExtension {
    name: string;
    editors: Editor[] = [];
    initialize: (editor: Editor) => void;
    update: (editor: Editor) => void;
    priority: number = 0;

    use(editor: Editor) {
        this.editors.push(editor);
    }
}

export class Editor {
    // DOM and extensions controling them
    DOM: EditorDOM;
    extensions: EditorExtension[] = [];

    // Zoom and position
    position: Position2D = new Position2D(0, 0);
    zoom: number = 1;

    // Blocks
    blocks: Block[] = [];

    // Definitions, libraries
    definitions: BlockDefinitions = {};
    nodes: BlockNodes = {};

    constructor(element: HTMLDivElement) {
        this.DOM = <EditorDOM> (this.DOM || {});

        this.DOM.div = element;
        this.initBlockDiv();
        this.initCanvas();
        this.updatePosition();

        addEventListener('resize', this.updateDimensions.bind(this));

        this.loadStyle(defaultStyle);
    }

    private setStyleProperty(key, value) {
        this.DOM.canvas?.style.setProperty(key, value);
        this.DOM.blockDiv?.style.setProperty(key, value);
    }

    updateDimensions() {
        if(!this.DOM.div || !this.DOM.canvas) throw new Error('Editor DOM element not found');

        let rect: DOMRect = this.DOM.div.getBoundingClientRect();

        this.setStyleProperty('position', 'absolute');
        this.setStyleProperty('left', `${rect.left}px`);
        this.setStyleProperty('top', `${rect.top}px`);
        this.setStyleProperty('width', `${rect.width}px`);
        this.setStyleProperty('height', `${rect.height}px`);
        this.setStyleProperty('overflow', 'hidden');
        this.setStyleProperty('border-radius', getComputedStyle(this.DOM.div).borderRadius);
        this.DOM.canvas.style.setProperty('-webkit-mask-image', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)');
        
        // variables
        this.DOM.div.style.setProperty('--board-width', `${rect.width}px`);
        this.DOM.div.style.setProperty('--board-height', `${rect.height}px`);

        this.updateCanvasDimensions();

        this.update();
    }

    updatePosition() {
        if(!this.DOM.div || !this.DOM.canvas) throw new Error('Editor DOM element not found');

        this.DOM.div.style.setProperty('--board-x', `${this.position.x}px`);
        this.DOM.div.style.setProperty('--board-y', `${this.position.y}px`);
        this.DOM.div.style.setProperty('--board-zoom', `${this.zoom}`);
    }

    private updateCanvasDimensions() {
        if(!this.DOM.canvas) return;

        let rect: DOMRect = this.DOM.div.getBoundingClientRect();
        this.DOM.canvas.width = rect.width;
        this.DOM.canvas.height = rect.height;
    }

    private initCanvas() {
        if(this.DOM.canvas && this.DOM.canvas.parentElement !== this.DOM.div) {
            this.DOM.canvas.remove();
            this.DOM.canvas = undefined;
            this.DOM.context = undefined;
        }

        if(!this.DOM.canvas) {
            this.DOM.canvas = document.createElement('canvas');
            this.DOM.context = <CanvasRenderingContext2D> this.DOM.canvas.getContext('2d');
            this.DOM.div.append(this.DOM.canvas);
            this.DOM.canvas.style.setProperty('z-index', '2147483647');

            this.updateCanvasDimensions();
        }

        this.updateDimensions();
    }

    private initBlockDiv() {
        if(this.DOM.blockDiv && this.DOM.blockDiv.parentElement !== this.DOM.div) {
            this.DOM.blockDiv.remove();
            this.DOM.blockDiv = undefined;
        }

        if(!this.DOM.blockDiv) {
            this.DOM.blockDiv = document.createElement('div');
            this.DOM.div.append(this.DOM.blockDiv);
        }
    }

    use(extension: EditorExtension) {
        this.extensions.push(extension);
        
        extension.use(this);

        if(extension.initialize) extension.initialize(this);

        return this;
    }

    update() {
        // this.updateDimensions();
        this.DOM.context?.clearRect(0, 0, this.DOM.canvas?.width || 0, this.DOM.canvas?.height || 0);

        this.extensions.sort((a: EditorExtension, b: EditorExtension): number => {
            return a.priority - b.priority
        }).forEach((extension: EditorExtension) => {
            if(extension.update) extension.update(this);
        });
    }

    getScreenFromEditorPosition(position: Position2D): Position2D {
        let outPosition: Position2D = new Position2D();
        let rect: DOMRect = this.DOM.div?.getBoundingClientRect();
        if(!rect) throw new Error('Attempt too get screen from editior position before initializing DOM element');

        outPosition.set(
            (rect.x + rect.width/2) + (this.position.x * this.zoom) + (position.x * this.zoom),
            (rect.y + rect.height/2) + (this.position.y * this.zoom) + (position.y * this.zoom)
        )

        return outPosition;
    }

    getEditorFromScreenPosition(position: Position2D): Position2D {
        let outPosition: Position2D = new Position2D();
        let rect: DOMRect = this.DOM.div?.getBoundingClientRect();
        if(!rect) throw new Error('Attempt too get editior from screen position before initializing DOM element');

        outPosition.set(
            (position.x - (rect.x + rect.width/2))/this.zoom - this.position.x,
            (position.y - (rect.y + rect.height/2))/this.zoom - this.position.y
        )

        return outPosition;
    }

    getBlockByToken(token: string): Block | null {
        for(let block of this.blocks) {
            if(block.token == token) return block;
        }

        return null;
    }

    addBlock(block: Block) {
        this.blocks.push(block);
        
        this.DOM.blockDiv?.appendChild(block.DOM);

        // Call event
        block.__onAdded(this);
        block.__reRender();

        return this;
    }

    private reloadBlocks() {
        this.blocks.forEach((block: Block) => {
            block.__reRender();
        });
    }

    loadLibrary(definitions: BlockDefinitions, nodes: BlockNodes) {
        this.definitions = {...this.definitions, ...definitions};
        this.nodes = {...this.nodes, ...nodes};

        this.reloadBlocks();

        return this;
    }

    findDefinition(type: string): BlockDefinition {
        return this.definitions[type];
    }

    findNode(type: string): BlockNode {
        return this.nodes[type];
    }

    loadStyle(style: Style) {
        for(let key in style.style) {
            let value = style.style[key];
            
            if(key == '@import') {
                this.setStyleProperty('@import', `{ ${value.concat(';')} }`);
            } else {
                this.setStyleProperty(`--${key}`, value);
            }
        }

        let background: Background | null = (<Background>this.findExtensionByPartialName('Background'));
        if(background) {
            (<Background>this.findExtensionByPartialName('Background')).color.background = style.backgroundColor;
            (<Background>this.findExtensionByPartialName('Background')).color.grid = style.gridColor;
        }

        return this;
    }

    getBlockUnderCursor(): Block | null {
        this.blocks.sort((a: Block, b: Block) => {
            let aIndex: number | string = a.DOM.style.getPropertyValue('z-index');
            let bIndex: number | string = b.DOM.style.getPropertyValue('z-index');

            return parseInt(bIndex) - parseInt(aIndex);
        });

        for(let block of this.blocks) {
            if(block.isCursorOver()) {
                return block;
            }
        }

        return null;
    }

    findExtensionByName(name: string): EditorExtension | null {
        for(let extension of this.extensions) {
            if(extension.name == name) {
                return extension;
            }
        };

        return null;
    }

    findExtensionByPartialName(name: string): EditorExtension | null {
        for(let extension of this.extensions) {
            if(extension.name.search(name) !== -1) {
                return extension;
            }
        };

        return null;
    }

    getVisibleBlocks(): Block[] {
        let blocks: Block[] = [];

        for(let block of this.blocks) {
            if(block.isOnScreen()) {
                blocks.push(block);
            }
        }

        return blocks;
    }

    drawRectangle(x: number, y: number, w: number, h: number, color: Color) {
        if(!this.DOM.canvas || !this.DOM.context) return;

        this.DOM.context.fillStyle = color.rgba;
        this.DOM.context.fillRect(x, y, w, h);
    }
    
    quadraticCurve = (start: Position2D, end: Position2D, attitude: Position2D, color: Color[] | Color, width: number) => {
        if(!this.DOM.context) return;

        this.DOM.context.beginPath();
        this.DOM.context.moveTo(start.x, start.y);
        this.DOM.context.quadraticCurveTo(attitude.x, attitude.y, end.x, end.y);
        
        if(color instanceof Color) {
            this.DOM.context.strokeStyle = color.rgb;
        } else {
            let gradient = this.DOM.context.createLinearGradient(start.x, start.y, end.x, end.y);
            gradient.addColorStop(0, color[0].rgb);
            gradient.addColorStop(1, color[1].rgb);
            this.DOM.context.strokeStyle = gradient;
        }
    
        this.DOM.context.lineWidth = width;
        this.DOM.context.stroke();
    };

    easyQuadraticCurve = (startPosition: Position2D, targetPosition: Position2D, color: Color[] | Color, width: number) => {
        let halfTargetPosition: Position2D = Position2D.sum(startPosition, Position2D.difference(targetPosition, startPosition).times(0.5));
        let attidutePosition: Position2D = new Position2D(startPosition.x + (targetPosition.x - startPosition.x)/2, startPosition.y + (targetPosition.y - startPosition.y)/2);

        this.quadraticCurve(
            startPosition,
            halfTargetPosition,
            new Position2D(
                startPosition.x + (halfTargetPosition.x - startPosition.x)/2,
                startPosition.y
            ), 
            color instanceof Color ? color : [
                Color.interpolate(color[0], color[1], 0),
                Color.interpolate(color[0], color[1], 0.5)
            ],
            width
        );

        this.quadraticCurve(
            halfTargetPosition,
            targetPosition,
            new Position2D(
                halfTargetPosition.x + (targetPosition.x - halfTargetPosition.x)/2,
                targetPosition.y
            ), 
            color instanceof Color ? color : [
                Color.interpolate(color[0], color[1], 0.5),
                Color.interpolate(color[0], color[1], 1)
            ], 
            width
        );
    }
}