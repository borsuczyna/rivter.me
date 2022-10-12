export var editorCanvas: CanvasRenderingContext2D = null;
export var editorWindow: HTMLElement = null;
export var editorDimensions: {
    width: number,
    height: number
} = {
    width: 1280,
    height: 720
};

function updateEditorDimensions(): void {
    let width = window.innerWidth;
    let height = window.innerHeight;

    editorDimensions.width = width;
    editorDimensions.height = height;

    editorCanvas.canvas.width = width;
    editorCanvas.canvas.height = height;
}

function initEditor(): void {
    if(editorCanvas && editorWindow) return;

    let window: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('editor-canvas');;
    editorCanvas = window?.getContext('2d');
    editorWindow = document.getElementById('editor-window');

    updateEditorDimensions();
    addEventListener('resize', updateEditorDimensions);
}

initEditor();