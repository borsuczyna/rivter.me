import './zoom';

import { triggerEvent } from "../utils/events";

export interface EditorPosition {
    x: number;
    y: number;
};

export interface EditorDimensions {
    width: number,
    height: number
};

export var editorCanvas: CanvasRenderingContext2D | null = null;
export var editorWindow: HTMLElement | null = null;
export var editorCursor: HTMLElement | null = null;
export var editorRoot: HTMLElement | null = null;

export var editorDimensions: EditorDimensions = {
    width: 1280,
    height: 720
};

export var editorPosition: EditorPosition = {
    x: 0,
    y: 0
};

export var editorZoom: number = 1;

export function updateEditorPosition(): void {
    if(!editorRoot) return;

    editorRoot.style.setProperty('--board-x', `${editorPosition.x}px`);
    editorRoot.style.setProperty('--board-y', `${editorPosition.y}px`);
}

export function setEditorZoom(zoom: number): void {
    if(!editorRoot) return;

    editorZoom = zoom;
    editorRoot.style.setProperty('--board-zoom', `${editorZoom}`);
}

export function isRectOnScreen(rect: DOMRect) {
    return (
        rect.x + rect.width >= 0 &&
        rect.y + rect.height >= 0 &&
        rect.x <= editorDimensions.width &&
        rect.y <= editorDimensions.height
    );
}

function updateEditorDimensions(): void {
    if(!editorCanvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    editorDimensions.width = width;
    editorDimensions.height = height;

    editorCanvas.canvas.width = width;
    editorCanvas.canvas.height = height;
}

function initEditor(): void {
    if(editorCanvas && editorWindow && editorCursor && editorRoot) return;

    let window: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('editor-canvas');;
    editorCanvas = window?.getContext('2d');
    editorWindow = document.getElementById('editor-window');
    editorCursor = document.getElementById('editor-canvas');
    editorRoot = document.querySelector(':root');

    updateEditorDimensions();
    addEventListener('resize', updateEditorDimensions);
}

initEditor();

function updateEditorEvent() {
    requestAnimationFrame(updateEditorEvent);
    triggerEvent('editorUpdate');
}

requestAnimationFrame(updateEditorEvent);