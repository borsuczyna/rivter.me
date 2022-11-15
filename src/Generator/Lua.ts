import { Block, NodeConnection, NodeType } from '../Editor/Block/main';
import { Editor } from '../Editor/main';
import { BlockDefinition, BlockType, NodeDefintion, BlockNode } from '../Editor/Libraries/lib';
import replaceAll from 'string.prototype.replaceall';
import styleCSS from './style';

const style: HTMLStyleElement = document.createElement('style');
style.innerHTML = styleCSS;
document.getElementsByTagName('head')[0].appendChild(style);

type GeneratedCode = string;
type ArgumentType = 'string' | 'number' | 'variable' | 'object' | 'undefined';
interface ArgumentValue {
    type: ArgumentType;
    value: any;
};
interface DefinedVariable {
    block: Block;
    id: number;
    variable: string;
};

export class LuaGenerator {
    private code: GeneratedCode = '';
    private variableID: number = 1;
    private localVariableID: number = 1;
    private definedVariables: DefinedVariable[] = [];
    private tabValue: number = 0;
    private editor: Editor;
    private generatedInCurrentScope: Block[] = [];
    tabCharacter: string = '    ';
    htmlHighlights: boolean = false;

    private getTabValue(): string {
        return new Array(this.tabValue).fill(this.tabCharacter).join('');
    }

    private wasBlockAlreadyGenerated(block: Block) {
        for(let b of this.generatedInCurrentScope) {
            if(b == block) return true;
        }
        return false;
    }

    private getScope(editor: Editor, block: Block): number | null {
        let scope: number = 0;
        for(let b of editor.blocks) {
            let definition: BlockDefinition | null = this.getDefinition(editor, b.type);
            if(!definition || !definition.isEvent) continue;

            if(block == b) {
                return scope;
            }

            let nextBlock: Block | undefined = b;
            while(nextBlock && nextBlock.findConnection('motion-next')) {
                if(block == nextBlock) {
                    return scope;
                }
                
                nextBlock = nextBlock.findConnection('motion-next')?.block;
            }

            scope++;
        }

        return null;
    }

    private willBlockBeUsed(editor: Editor, block: Block): boolean {
        return this.getScope(editor, block) != null;
    }

    private getFreeVariable(): string {
        let id = this.variableID;
        this.variableID++;
        return `__var${id}`;
    }

    private getLocalFreeVariable(): string {
        let id = this.localVariableID;
        this.localVariableID++;
        let varName: string = `__local__var${id}`;

        return `__local__var${id}`;
    }

    private addVariable(block: Block, id: number): string {
        let variable: string = this.getFreeVariable();

        this.definedVariables.push({
            block: block,
            id: id,
            variable: variable
        });

        return variable;
    }

    private getVariable(block: Block, id: number): string {
        for(let variable of this.definedVariables) {
            if(variable.block == block && variable.id == id) {
                if(this.htmlHighlights) {
                    let definition: BlockDefinition = this.editor.findDefinition(block.type);
                    let node: BlockNode = this.editor.findNode(definition.outputs[id-1].type);
                    return this.htmlDefinition(variable.variable, node.color.raw, block, 'output', id-1);
                } else return variable.variable;
            }
        }
        
        return this.addVariable(block, id);
    }

    private getDefinition(editor: Editor, blockType: BlockType): BlockDefinition | null {
        for(let definition in editor.definitions) {
            if(definition == blockType) {
                return editor.definitions[definition];
            }
        }

        return null;
    }

    private addCode(code: GeneratedCode) {
        this.code += `${this.getTabValue()}${code}\n`;
    }

    private argValues(args: ArgumentValue[]): string[] {
        let escapedArgs: string[] = [];

        for(let id in args) {
            let arg: ArgumentValue = args[id];
            
            switch(arg.type) {
                case 'string':
                    let escaped: string = replaceAll(arg.value || '', '"', `\\"`);
                    escapedArgs.push(`"${escaped}"`);
                    break;
                case 'undefined':
                    escapedArgs.push('null');
                    break;
                default:
                    escapedArgs.push(arg.value);
                    break;
            }
        }

        return escapedArgs;
    }

    private getArguments(editor: Editor, block: Block): ArgumentValue[] {
        let args: ArgumentValue[] = [];
        let definition: BlockDefinition | null = this.getDefinition(editor, block.type);
        if(!definition) return args;

        for(let i in definition.inputs) {
            let inputID: number = parseInt(i);
            let value: any = 'null';
            let type: ArgumentType = 'undefined';

            if(block.values[inputID]) {
                value = block.values[inputID];
                type = 'string';
            }

            if(definition.inputs[inputID].inputText?.default) {
                value = definition.inputs[inputID].inputText?.default;
                type = 'string';
            }

            let input: HTMLInputElement | null = block.DOM.querySelector<HTMLInputElement>(`#inputText-${i}`);
            if(definition.inputs[inputID].inputText && input) {
                value = input.value;
                type = 'string';
            }

            let connection: NodeConnection | null = block.findConnection('input', inputID+1);
            if(connection && connection.block != block) {
                if(!this.willBlockBeUsed(editor, connection.block) && !this.wasBlockAlreadyGenerated(connection.block)) {
                    let args: string[] = this.generateBlock(editor, connection.block);
                    value = this.getVariable(connection.block, <number>connection.targetID);
                } else {
                    value = this.getVariable(connection.block, <number>connection.targetID);
                }
                type = 'variable';
            }

            args[inputID] = {
                type: type,
                value: value
            };
        }

        return args;
    }

    private htmlDefinition(variable: string, color: string = '255, 255, 255', block: Block, type: NodeType, id: number) {
        return `<div class="__block__variable__definition" style="--color: ${color}" color="${color}" block="${block.token}" outputType="${type}" outputId="${id}">${variable}</div>`;
    }

    private generateCode(editor: Editor, block: Block, callback: CallableFunction, preArgs?: string): void {
        let args: ArgumentValue[] = this.getArguments(editor, block);
        let code: GeneratedCode = '';

        this.generatedInCurrentScope.push(block);

        code = callback(...this.argValues(args));

        let eventVar: number = 1;
        let localVariables: string[][] = [];
        while(code.search(`{var${eventVar}}`) != -1) {
            let variable: string = this.getVariable(block, eventVar);
            let localVariable: string = this.getLocalFreeVariable();

            let definition: BlockDefinition | null = this.getDefinition(editor, block.type);
            let output: NodeDefintion | undefined = definition?.outputs[eventVar-1];
            let node: BlockNode | undefined = output ? editor.findNode(output.type) : undefined;

            if(this.htmlHighlights) {
                code = code.replace(`{var${eventVar}}`, this.htmlDefinition(localVariable, node?.color.raw, block, 'output', eventVar-1));
            } else code = code.replace(`{var${eventVar}}`, localVariable);
            
            localVariables.push([variable, localVariable])

            eventVar++;
        }

        this.addCode(`${preArgs || ''}${code}`);
        let id = 0;
        for(let variable of localVariables) {
            if(this.htmlHighlights) {
                let definition: BlockDefinition | null = this.getDefinition(editor, block.type);
                let output: NodeDefintion | undefined = definition?.outputs[id];
                let node: BlockNode | undefined = output ? editor.findNode(output.type) : undefined;
                this.addCode(`    ${this.htmlDefinition(variable[0], node?.color.raw, block, 'output', id)} = ${this.htmlDefinition(variable[1], node?.color.raw, block, 'output', id)}`);
            } else this.addCode(`    ${variable[0]} = ${variable[1]}`)

            id++;
        }
    }

    private generateBlock(editor: Editor, block: Block, localVariables: boolean = false): string[] {
        let args: string[] = [];
        let definition: BlockDefinition | null = this.getDefinition(editor, block.type);
        if(!definition) return args;

        // Generate variables
        let preArgs: string = '';

        if(!definition.isEvent) {
            if(localVariables) {
                for(let i in definition.outputs) {
                    let output: NodeDefintion = definition.outputs[i];
                    args.push(this.getFreeVariable());
                }

                if(this.htmlHighlights) {
                    let id: number = 0;
                    preArgs = (`local ${args.map((arg: string): string => {
                        let output: NodeDefintion | undefined = definition?.outputs[id];
                        if(output) {
                            let node: BlockNode = editor.findNode(output.type);
                            return this.htmlDefinition(arg, node.color.raw, block, 'output', id++);
                        } else return arg;
                    }).join(', ')} = `);
                }
                else preArgs = (`local ${args.join(', ')} = `);
            } else {            
                for(let i in definition.outputs) {
                    let outputID: number = parseInt(i);
                    let output: NodeDefintion = definition.outputs[i];
                    args.push(this.getVariable(block, outputID+1));
                }

                if(this.htmlHighlights) {
                    let id: number = 0;
                    preArgs = (`${args.map((arg: string): string => {
                        let output: NodeDefintion | undefined = definition?.outputs[id];
                        if(output) {
                            let node: BlockNode = editor.findNode(output.type);
                            return this.htmlDefinition(arg, node.color.raw, block, 'output', id++);
                        } else return arg;
                    }).join(', ')} = `);
                }
                else preArgs = (`${args.join(', ')} = `);
            }
        }

        // Generate header
        this.generateCode(editor, block, definition.generateCode.header, preArgs);

        // Add tab if it's element with footer
        if(definition.generateCode.footer) {
            this.tabValue++;
        }

        // Generate next connected motion block
        let motionNext: NodeConnection | null = block.findConnection('motion-next');
        if(motionNext) {
            this.generateBlock(editor, motionNext.block);
        }

        // Remove tab if it's element with footer
        if(definition.generateCode.footer) {
            this.tabValue--;
        }

        // Generate footer
        if(definition.generateCode.footer) this.generateCode(editor, block, definition.generateCode.footer);

        return args;
    }

    generateProject(editor: Editor): GeneratedCode {
        this.editor = editor;
        // restore default generator settings
        this.code = '';
        this.variableID = 1;
        this.localVariableID = 1;
        this.definedVariables = [];
        this.tabValue = 0;

        // foreach all event blocks and generate them
        for(let block of editor.blocks) {
            let definition: BlockDefinition | null = this.getDefinition(editor, block.type);
            if(!definition || !definition.isEvent) continue;

            this.generatedInCurrentScope = [];
            this.localVariableID = 1;
            this.generateBlock(editor, block);
        }

        return this.code;
    }
}