import { Editor, EditorExtension } from "../../Editor/main";
import { isMobile } from "../../Editor/Mobile/check";
import { getTouchesCount, getTouchPosition, isTouchOverRect, TouchPositions } from "../../Editor/Mobile/position";
import { Position2D } from "../../Editor/Position/2D";
import { cursorPosition, isCursorOverRect } from "../../Editor/Utils/cursor";

interface MobileZoom {
    holding: boolean;
    distance: number;
};

export class Zooming extends EditorExtension {
    name: string = '@borsuk - Zooming';
    constructor() {
        super();
    }

    zoomToCursor: boolean = true;
    mobileSupport: boolean = true;
    mobile: MobileZoom = {
        holding: false,
        distance: 0
    };

    min: number | undefined;
    max: number | undefined;

    private handleScroll(event: WheelEvent) {
        const overAny = this.editors.some((editor: Editor): boolean => {
            if(!editor.DOM.blockDiv) return false;
            let rect: DOMRect = editor.DOM.blockDiv.getBoundingClientRect();
            return isCursorOverRect(rect);
        });

        this.editors.forEach((editor: Editor) => {
            if(!overAny) return;

            let original: number = editor.zoom;
            editor.zoom -= event.deltaY/1000;
            editor.zoom = Math.max(Math.min(editor.zoom, this.max || 5), this.min || 0.1);
            let changed: number = original - editor.zoom;
            
            // zooming to cursor
            if(this.zoomToCursor) {
                let attitude: number = changed*8;
                let editorPosition: Position2D = editor.getEditorFromScreenPosition(cursorPosition);
                let difference: Position2D = Position2D.difference(editorPosition, editor.position.inverted);
                editor.position.add(difference.x/10*attitude, difference.y/10*attitude);
            }

            editor.updatePosition();
        });
    }

    initialize = function(editor: Editor) {
        if(!editor.DOM.blockDiv) throw new Error('Attempt to init zooming before initializing DOM element');

        addEventListener('wheel', this.handleScroll.bind(this));
    };

    // Mobile zooming
    update = function(editor: Editor) {
        if(!isMobile() || !editor.DOM.blockDiv || !this.mobileSupport) return;
        let rect: DOMRect = editor.DOM.blockDiv.getBoundingClientRect();

        let distance = Position2D.distance(getTouchPosition(0), getTouchPosition(1));
        if(!this.mobile.holding && getTouchesCount() == 2 && isTouchOverRect(rect, 0) && isTouchOverRect(rect, 1)) {
            this.mobile.holding = true;
            this.mobile.distance = distance;
        } else if(getTouchesCount() == 2 && this.mobile.holding) {
            let difference = this.mobile.distance - distance;
            
            this.mobile.distance = distance;

            this.editors.forEach((editor: Editor) => {
                editor.zoom -= difference/100;
                editor.zoom = Math.max(Math.min(editor.zoom, this.max || 5), this.min || 0.1);
                editor.updatePosition();
            });
        } else if(getTouchesCount() !== 2 && this.mobile.holding) {
            this.mobile.holding = false;
        }
    }
}