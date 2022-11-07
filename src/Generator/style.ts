export default `
.__lua__variable {
    --color: 255, 255, 255;

    color: white;
    cursor: pointer;
    background-color: rgba(var(--color), 0.1);
    padding: 3px;
    border-radius: 4px;
}

.__lua__variable:hover {
    background-color: rgba(var(--color), 0.3);
    transition: 0.1s;
}
`;