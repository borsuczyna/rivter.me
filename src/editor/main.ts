import { Position2D } from "./Position/2D";

export interface EditorDOM {
    div: HTMLDivElement;
    blockDiv: HTMLDivElement | undefined;
    canvas: HTMLCanvasElement | undefined;
    context: CanvasRenderingContext2D;
};

export class EditorExtension {
    editors: Editor[] = [];
    initialize: (editor: Editor) => void;
    update: (editor: Editor) => void;
    priority: number = 0;

    use(editor: Editor) {
        this.editors.push(editor);
    }
}

export class Editor {
    DOM: EditorDOM;
    extensions: EditorExtension[] = [];

    position: Position2D = new Position2D(0, 0);
    zoom: number = 1;

    constructor() { /* where is the guru? */ }

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
    }

    updatePosition() {
        if(!this.DOM.div || !this.DOM.canvas) throw new Error('Editor DOM element not found');

        this.DOM.div.style.setProperty('--board-x', `${this.position.x}px`);
        this.DOM.div.style.setProperty('--board-y', `${this.position.y}px`);
        this.DOM.div.style.setProperty('--board-zoom', `${this.zoom}`);
    }

    private initCanvas() {
        if(this.DOM.canvas && this.DOM.canvas.parentElement !== this.DOM.div) {
            this.DOM.canvas.remove();
            this.DOM.canvas = undefined;
        }

        if(!this.DOM.canvas) {
            this.DOM.canvas = document.createElement('canvas');
            this.DOM.div.append(this.DOM.canvas);
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

        this.extensions.sort((a: EditorExtension, b: EditorExtension): number => {
            return a.priority - b.priority
        }).forEach((extension: EditorExtension) => {
            if(extension.update) extension.update(this);
        });
    }

    setDOMElement(element: HTMLDivElement) {
        this.DOM = <EditorDOM> (this.DOM || {});

        this.DOM.div = element;
        this.initBlockDiv();
        this.initCanvas();
        this.updatePosition();

        addEventListener('resize', this.updateDimensions.bind(this));

        return this;
    }

    // background-position-x: calc(var(--board-width)/2 + calc(var(--board-x) * var(--board-zoom)));

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
}