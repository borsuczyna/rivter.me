import { Block } from "../../Editor/Block/main";
import { Cursor } from "../Cursor/cursor";
import { Editor, EditorExtension } from "../../Editor/main";
import { isMobile } from "../../Editor/Mobile/check";
import { getTouchesCount, getTouchPosition, isTouchOverRect, TouchPositions } from "../../Editor/Mobile/position";
import { Position2D } from "../../Editor/Position/2D";
import { cursorPosition, isCursorOverRect, isMouseButtonDown } from "../../Editor/Utils/cursor";
import { isKeyDown } from "../../Editor/Utils/keyboard";
import { BlockGrabbing } from "./blocks";
import { Nodes } from "../../Extensions/Nodes/nodes";
import { DotNodes } from "../../Extensions/DotNodes/DotNodes";

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

interface GrabLimits {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
};

export let grabbing: boolean = false;

export class Grabbing extends EditorExtension {
    name: string = '@borsuk - Grabbing';
    mobileSupport: boolean = true;
    grab: GrabData = {
        position: new Position2D(),
        holding: false,
        active: false
    };
    limits: GrabLimits = {
        minX: -Infinity,
        minY: -Infinity,
        maxX: Infinity,
        maxY: Infinity
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

    private updateLimits() {
        this.editors.forEach((editor: Editor) => {
            editor.position.x = Math.max(-this.limits.maxX, Math.min(editor.position.x, -this.limits.minX));
            editor.position.y = Math.max(-this.limits.maxY, Math.min(editor.position.y, -this.limits.minY));
            editor.updatePosition();
        });
    }

    update = function(editor: Editor) {
        if(!editor.DOM.blockDiv) throw new Error('Attempt to update grabbing before initializing DOM element');
        if((<BlockGrabbing>editor.findExtensionByPartialName('Block grabbing'))?.holding) return;

        let rect: DOMRect = editor.DOM.blockDiv.getBoundingClientRect();
        let blockUnderCursor: Block | undefined = this.editors.some((editor: Editor) => {
            return editor.getBlockUnderCursor();
        });

        let blockGrabbing = this.editors.some((editor: Editor) => {
            return editor.findExtensionByPartialName('Block grabbing');
        });
        
        if(isMobile() && this.mobileSupport) {
            if(
                getTouchesCount() == 1 &&
                isTouchOverRect(rect, 0) &&
                !grabbing &&
                !this.grab.holding &&
                !(blockGrabbing && blockUnderCursor) &&
                !((<Nodes>editor.findExtensionByPartialName('Nodes'))?.holding) &&
                !((<DotNodes>editor.findExtensionByPartialName('Dot nodes'))?.holding) &&
                !((<DotNodes>editor.findExtensionByPartialName('Dot nodes'))?.getDotUnderCursor())
            ) {
                this.grab.holding = true;
                this.grab.position = getTouchPosition(0).clone();
                grabbing = true;
            } else if(grabbing && this.grab.holding && getTouchesCount() !== 1) {
                this.grab.holding = false;
                grabbing = false;
            } else if(grabbing && this.grab.holding && getTouchesCount() == 1 && !((<Nodes>editor.findExtensionByPartialName('Nodes'))?.holding)) {
                let difference: Position2D = Position2D.difference(getTouchPosition(0), this.grab.position);
                
                this.editors.forEach((editor: Editor) => {
                    editor.position.add(difference.x / editor.zoom, difference.y / editor.zoom);
                    editor.updatePosition();
                });
                
                this.grab.position = getTouchPosition(0).clone();
            }
        } else if(!isMobile()) {
            if(!this.grab.active && isCursorOverRect(rect) && isKeyDown(' ') && !grabbing && !(blockGrabbing && blockUnderCursor) && !((<Nodes>editor.findExtensionByPartialName('Nodes'))?.holding)) {
                this.grab.active = true;

                (<Cursor>editor.findExtensionByPartialName('Cursor'))?.setCursor('grab');
            } else if(
                (this.grab.active && !isKeyDown(' ')) ||
                (this.grab.holding && !isMouseButtonDown(0))
            ) {
                this.grab.active = false;
                this.grab.holding = false;
                grabbing = false;
            } else if(
                this.grab.active &&
                !this.grab.holding &&
                isMouseButtonDown(0) &&
                isCursorOverRect(rect) &&
                !grabbing &&
                !(blockGrabbing && blockUnderCursor) &&
                !((<Nodes>editor.findExtensionByPartialName('Nodes'))?.holding) &&
                !((<DotNodes>editor.findExtensionByPartialName('Dot nodes'))?.holding) &&
                !((<DotNodes>editor.findExtensionByPartialName('Dot nodes'))?.getDotUnderCursor())
            ) {
                this.grab.holding = true;
                this.grab.position = cursorPosition.clone();
                grabbing = true;

                (<Cursor>editor.findExtensionByPartialName('Cursor'))?.setCursor('grabbing');
            } else if(this.grab.holding) {
                let difference: Position2D = Position2D.difference(cursorPosition, this.grab.position);
                
                this.editors.forEach((editor: Editor) => {
                    editor.position.add(difference.x / editor.zoom, difference.y / editor.zoom);
                    editor.updatePosition();
                });

                (<Cursor>editor.findExtensionByPartialName('Cursor'))?.setCursor('grabbing');
                
                this.grab.position = cursorPosition.clone();
            } else if(
                this.grab.active &&
                !((<Nodes>editor.findExtensionByPartialName('Nodes'))?.holding) &&
                !((<DotNodes>editor.findExtensionByPartialName('Dot nodes'))?.holding) &&
                !((<DotNodes>editor.findExtensionByPartialName('Dot nodes'))?.getDotUnderCursor())
            ) {
                (<Cursor>editor.findExtensionByPartialName('Cursor'))?.setCursor('grab');
            }
        }

        this.updateLimits();
    };
}