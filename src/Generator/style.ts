export default `
.__block__variable__definition {
    --color: 255, 255, 255;

    color: white;
    cursor: pointer;
    background-color: rgba(var(--color), 0.1);
    padding: 3px;
    border-radius: 4px;
}

.__block__variable__definition:hover {
    background-color: rgba(var(--color), 0.3);
    transition: 0.1s;
}
`;