import { Editor, EditorExtension } from "../main";
import { isMobile } from "../Mobile/check";
import { getTouchesCount, getTouchPosition, isTouchOverRect, TouchPositions } from "../Mobile/position";
import { Position2D } from "../Position/2D";
import { cursorPosition, isCursorOverRect, isMouseButtonDown } from "../Utils/cursor";
import { isKeyDown } from "../Utils/keyboard";

interface GrabData {
    position: Position2D;
    holding: boolean;
    active: boolean;
};

interface MobileData {
    position: TouchPositions;
    holding: boolean;
    zooming: boolean;
};

export var grabbing: boolean = false;

export class Grabbing extends EditorExtension {
    mobileSupport: boolean = true;
    grab: GrabData = {
        position: new Position2D(),
        holding: false,
        active: false
    };

    mobileGrab: MobileData = {
        position: {},
        holding: false,
        zooming: false
    };

    constructor() {
        super();
    }

    initialize = function(editor: Editor) {
        if(!editor.DOM.blockDiv) throw new Error('Attempt to init grabbing before initializing DOM element');
    };

    update = function(editor: Editor) {
        if(!editor.DOM.blockDiv) throw new Error('Attempt to update grabbing before initializing DOM element');

        let rect: DOMRect = editor.DOM.blockDiv.getBoundingClientRect();

        if(isMobile() && this.mobileSupport) {
            if(getTouchesCount() == 1 && isTouchOverRect(rect, 0) && !grabbing && !this.grab.holding) {
                this.grab.holding = true;
                this.grab.position = getTouchPosition(0).clone();
                grabbing = true;
            } else if(grabbing && this.grab.holding && getTouchesCount() !== 1) {
                this.grab.holding = false;
                grabbing = false;
            } else if(grabbing && this.grab.holding && getTouchesCount() == 1) {
                let difference: Position2D = Position2D.difference(getTouchPosition(0), this.grab.position);

                this.editors.forEach((editor: Editor) => {
                    editor.position.add(difference.x / editor.zoom, difference.y / editor.zoom);
                    editor.updatePosition();
                });

                this.grab.position = getTouchPosition(0).clone();
            }
        } else if(!isMobile()) {
            if(!this.grab.active && isCursorOverRect(rect) && isKeyDown(' ') && !grabbing) {
                this.grab.active = true;
            } else if(
                (this.grab.active && !isKeyDown(' ')) ||
                (this.grab.holding && !isMouseButtonDown(0))
            ) {
                this.grab.active = false;
                this.grab.holding = false;
                grabbing = false;
            } else if(this.grab.active && !this.grab.holding && isMouseButtonDown(0) && isCursorOverRect(rect) && !grabbing) {
                this.grab.holding = true;
                this.grab.position = cursorPosition.clone();
                grabbing = true;
            } else if(this.grab.holding) {
                let difference: Position2D = Position2D.difference(cursorPosition, this.grab.position);

                this.editors.forEach((editor: Editor) => {
                    editor.position.add(difference.x / editor.zoom, difference.y / editor.zoom);
                    editor.updatePosition();
                });

                this.grab.position = cursorPosition.clone();
            }
        }
    };
}