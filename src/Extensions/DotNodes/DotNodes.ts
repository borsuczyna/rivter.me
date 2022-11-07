import { Editor, EditorExtension } from "../../Editor/main";
import { getTouchesCount, getTouchPosition, isTouchOverRect } from "../../Editor/Mobile/position";
import { Position2D } from "../../Editor/Position/2D";
import { Token } from "../../Editor/Utils/token";
import { isMobile } from "../../final";
import { cursorPosition, isCursorOverRect, isMouseButtonDown } from "../../Editor/Utils/cursor";
import { Cursor } from "../../Extensions/Cursor/cursor";
import dotStyle from './Style';
import { lerp } from "../../Editor/Utils/lerp";
import { Nodes } from "../../Extensions/Nodes/nodes";
import { Grabbing } from "../../Extensions/Grabbing/grab";

const style: HTMLStyleElement = document.createElement('style');
style.innerHTML = dotStyle;
document.getElementsByTagName('head')[0].appendChild(style);

const buildTime: number = new Date().getTime();

export interface Dot {
    position: Position2D;
    token: Token;
    DOM?: HTMLDivElement;
    scale: number;
    color: string;
    tempColor: string | null;
};

interface HoldingDot {
    dot: Dot;
    position: Position2D;
};

export class DotNodes extends EditorExtension {
    name: string = '@borsuk - Dot nodes';
    private dots: Dot[] = [];
    private editor: Editor | null = null;
    holding: HoldingDot | null = null;
    mobileSupport: boolean = true;

    constructor() {
        super();
    }

    initialize = (editor: Editor) => {
        if(this.editors.length > 1) throw new Error('Dot nodes extension can be used only on one editor at once!');
        this.editor = editor;

        this.regenerateDOMs();
    };

    private generateDOM(dot: Dot) {
        if(!this.editor || dot.DOM) return;

        dot.DOM = document.createElement('div');
        dot.DOM.classList.add('__dot__node');

        this.editor.DOM.blockDiv?.appendChild(dot.DOM);
        this.updatePosition(dot);
    }

    private updatePosition(dot: Dot) {
        dot.DOM?.style.setProperty('--position-x', `${dot.position.x}px`);
        dot.DOM?.style.setProperty('--position-y', `${dot.position.y}px`);
        dot.DOM?.style.setProperty('--scale', `${dot.scale}`);
        dot.DOM?.style.setProperty('--color', `${dot.tempColor || dot.color}`);
    }

    private regenerateDOMs() {
        if(!this.editor) return;

        for(let dot of this.dots) {
            this.generateDOM(dot);
        }
    }

    isDotVisible(dot: Dot): boolean {
        if(!dot.DOM || !this.editor?.DOM.div) return false;

        let rect: DOMRect = dot.DOM.getBoundingClientRect();
        let editorRect: DOMRect = this.editor?.DOM.div?.getBoundingClientRect();
        if(!rect || !editorRect) return false;

        return (
            rect.x + rect.width >= editorRect.x &&
            rect.y + rect.height >= editorRect.y &&
            rect.x <= editorRect.x + editorRect.width &&
            rect.y <= editorRect.y + editorRect.height
        );
    }

    isCursorOverDot(dot: Dot): boolean {
        if(!dot.DOM) return false;

        let rect: DOMRect = dot.DOM.getBoundingClientRect();
        return (!isMobile() ? isCursorOverRect(rect) : (getTouchesCount() == 1 && isTouchOverRect(rect, 0)));
    }

    getVisibleDots(): Dot[] {
        return this.dots.filter(dot => this.isDotVisible(dot));
    }

    createDot(position: Position2D) {
        this.dots.push({
            position: position,
            token: Token.generate(),
            scale: 1,
            color: 'rgb(255, 255, 255)',
            tempColor: 'rgb(255, 255, 255)'
        });
    }

    private updateDot(dot: Dot) {
        if(!this.editor) return;
        
        if(this.isCursorOverDot(dot) || this.holding?.dot == dot) {
            dot.scale = lerp(dot.scale, 2, 0.1);
            let cursorPos: Position2D = this.editor.getEditorFromScreenPosition(
                (isMobile() && this.mobileSupport) ? getTouchPosition(0) : cursorPosition
            );

            if(
                !this.holding &&
                !((<Nodes>this.editor.findExtensionByPartialName('Nodes'))?.holding) &&
                !(<Grabbing>this.editor.findExtensionByPartialName('Grabbing'))?.grab.holding
            ) {
                (<Cursor>this.editor.findExtensionByPartialName('Cursor'))?.setCursor('grab');
    
                if(isMobile() || isMouseButtonDown(0)) {
                    this.holding = {
                        dot: dot,
                        position: Position2D.difference(dot.position, cursorPos)
                    };
                }
            }
        } else dot.scale = lerp(dot.scale, 1, 0.1);

        this.updatePosition(dot);

        dot.tempColor = null;
    }

    getRect(dot: Dot): DOMRect | undefined {
        return dot.DOM?.getBoundingClientRect();
    }

    getDotUnderCursor(): Dot | null {
        for(let dot of this.dots) {
            if(this.isCursorOverDot(dot)) {
                return dot;
            }
        }

        return null;
    }

    update = () => {
        if(!this.editor) return;
        let visibleDots: Dot[] = this.getVisibleDots();

        for(let dot of visibleDots) {
            this.updateDot(dot);
        }

        if(this.holding) {
            if(
                (!isMobile() && !isMouseButtonDown(0)) ||
                (isMobile() && getTouchPosition(0).x == 0 && getTouchPosition(0).y == 0)
            ) {
                this.holding = null;
            } else {
                let cursorPos: Position2D = this.editor.getEditorFromScreenPosition(
                    (isMobile() && this.mobileSupport) ? getTouchPosition(0) : cursorPosition
                );

                this.holding.dot.DOM?.style.setProperty('z-index', `${Math.floor(new Date().getTime()%buildTime/100)}`);
                this.holding.dot.position = Position2D.sum(cursorPos, this.holding.position);
                this.updatePosition(this.holding.dot);
            }
        }
    }
}