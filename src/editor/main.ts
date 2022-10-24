export interface EditorDOM {
    div: HTMLDivElement;
    blockDiv: HTMLDivElement | undefined;
    canvas: HTMLCanvasElement | undefined;
    context: CanvasRenderingContext2D;
};

export class EditorExtension {
    editors: Editor[] = [];
    initialize: (editor: Editor) => void;

    use(editor: Editor) {
        this.editors.push(editor);
    }
}

export class Editor {
    DOM: EditorDOM;
    extensions: EditorExtension[] = [];

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

    setDOMElement(element: HTMLDivElement) {
        this.DOM = <EditorDOM> (this.DOM || {});

        this.DOM.div = element;
        this.initBlockDiv();
        this.initCanvas();

        return this;
    }
}