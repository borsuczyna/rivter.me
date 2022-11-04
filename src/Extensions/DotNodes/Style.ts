export default `
:root {
    --default-dot-color: rgb(200, 200, 200);
}

.__dot__node {
    --position-x: 0px;
    --position-y: 0px;
    --scale: 1;
    --color: var(--default-dot-color);

    position: absolute;
    left: calc(var(--board-width)/2 + calc(var(--board-x) * var(--board-zoom)) + var(--position-x) * var(--board-zoom));
    top: calc(var(--board-height)/2 + calc(var(--board-y) * var(--board-zoom)) + var(--position-y) * var(--board-zoom));

    width: calc(13px * var(--scale));
    height: calc(13px * var(--scale));
    background-color: var(--color);
    border-radius: 50%;

    transform: translate(-50%, -50%) scale(var(--board-zoom));
}
`;