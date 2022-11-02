import { HTMLCode } from "./main";

export default `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');

.__block__element {
    --position-x: 0px;
    --position-y: 0px;
    --rotation: 0deg;

    text-align: var(--block-text-align);
    position: absolute;
    color: var(--block-text-color);
    font-family: var(--block-font);
    min-width: var(--block-min-width);
    max-width: var(--block-max-width);
    background-color: var(--block-background);
    border-radius: var(--block-radius);
    padding: var(--block-padding);
    border: var(--block-border);
    
    width: max-content;
    // overflow: hidden;

    transform: translate(-50%, -50%) scale(var(--board-zoom)) rotate(var(--rotation));

    left: calc(var(--board-width)/2 + calc(var(--board-x) * var(--board-zoom)) + var(--position-x) * var(--board-zoom));
    top: calc(var(--board-height)/2 + calc(var(--board-y) * var(--board-zoom)) + var(--position-y) * var(--board-zoom));
}

.__block__content {
    display: flex;
}

.__block__inputs {
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: start;
    flex-grow: 1;
    width: max-content;
    text-align: left;
}

.__block__outputs {
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: start;
    flex-grow: 1;
    width: max-content;
    text-align: right;
}

.__block__node {
    --node-color: red;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 7px;
    min-width: max-content;
    width: max-content;
    flex-grow: 1;
    max-height: 23px;
    padding-inline: 5px;
}

.__block__ball {
    width: 12px;
    height: 12px;
    background-color: var(--node-color);
    border-radius: var(--block-ball-radius);
    border: var(--block-ball-border);
}

.__block__output {
    margin-right: 0;
    margin-left: auto;
}

.__block__input {
    margin-right: auto;
    margin-left: 0;
}

.__block__input .__block__ball::after {
    transform: translateX(
        calc(0px - var(--block-ball-gap) - var(--block-ball-side-width)/2)
    );
}

.__block__output .__block__ball::after {
    transform: translateX(
        calc(var(--block-ball-gap) + 12px - var(--block-ball-side-width)/2)
    );
}

.__block__ball::after {
    content: "";
    display: block;
    width: var(--block-ball-side-width);
    height: var(--block-ball-side-height);
    background-color: var(--node-color);
    border-radius: var(--block-ball-side-radius);
}

.__block__inputText {
    color: var(--block-input-color);
    background-color: var(--block-input-background);
    border-radius: var(--block-input-border-radius);
    outline: none;
    border: none;
    height: 19px;
    padding: 2px 4px;
    border: var(--block-input-border);
}

.__block__header {
    margin-bottom: 5px;
    padding-inline: var(--block-text-padding);
}

.__block__checkbox {
    margin: 0;
    border: 1px solid var(--block-checkbox-border);
    width: 12px;
    height: 12px;
    outline: none;
    background-color: var(--block-checkbox-background);
    border-radius: var(--block-checkbox-radius);
    -webkit-appearance: none;
    apperance: none;
}

.__block__checkbox:checked {
    background-color: var(--block-checkbox-background-checked);
    border: 1px solid var(--block-checkbox-border-checked);
}

.__block__checkbox:checked::after {
    content: '';
    width: 6px;
    height: 6px;
    display: block;
    background: var(--block-checkbox-inside);
    border-radius: var(--block-checkbox-inside-radius);
    position: relative;
    left: 2px;
    top: 2px;
}

.__block__motions {
    display: flex;
    gap: 10px;
    flex-direction: row;
    padding-bottom: 5px;
    margin-bottom: 3px;
    border-bottom: 1px solid var(--motion-bottom-line);
}

.__block__motion {
    flex-grow: 1;
}

.__motion__start {
    text-align: left;
}

.__motion__next {
    text-align: right;
}

.__motion__icon {
    border: solid var(--motion-color);
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);
    width: 2px;
    height: 2px;
}

.__motion__icon::after {
    content: "";
    display: block;
    position: absolute;
    border: solid var(--motion-color);
    border-width: 0 3px 3px 0;
    display: block;
    padding: 3px;
    width: 2px;
    height: 2px;
}

.__motion__start .__motion__icon::after {
    transform: rotate(45deg) translateX(var(--motion-left)) rotate(-45deg);
}

.__motion__next .__motion__icon::after {
    transform: rotate(45deg) translateX(var(--motion-right)) rotate(-45deg);
}

.__motion__start .__motion__icon {
    margin-left: 4px;
    margin-right: 6px;
}

.__motion__next .__motion__icon {
    margin-left: 2px;
    margin-right: 9px;
}

.__block__element {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
       -khtml-user-select: none; /* Konqueror HTML */
         -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
}
` as HTMLCode;