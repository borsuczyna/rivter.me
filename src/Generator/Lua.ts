import { Block, NodeConnection } from '../Editor/Block/main';
import { Editor } from '../Editor/main';
import { BlockDefinition, BlockType, NodeDefintion } from '../Editor/Libraries/lib';
import replaceAll from 'string.prototype.replaceall';

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
    private definedVariables: DefinedVariable[] = [];

    private willBlockBeUsed(editor: Editor, block: Block): boolean {
        for(let b of editor.blocks) {
            let definition: BlockDefinition | null = this.getDefinition(editor, b.type);
            if(!definition || !definition.isEvent) continue;

            if(block == b) {
                return true;
            }

            let nextBlock: Block | undefined = b;
            while(nextBlock && nextBlock.findConnection('motion-next')) {
                if(block == nextBlock) {
                    return true;
                }
                
                nextBlock = nextBlock.findConnection('motion-next')?.block;
            }
        }

        return false;
    }

    private getFreeVariable(): string {
        let id = this.variableID;
        this.variableID++;
        return `__var${id}`;
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
                return variable.variable;
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
        this.code += `${code}\n`;
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

            let connection: NodeConnection | null = block.findConnection('input', inputID+1);
            if(connection && connection.block != block) {
                if(!this.willBlockBeUsed(editor, connection.block)) {
                    let args: string[] = this.generateBlock(editor, connection.block, true);
                    value = args[(<number>connection.targetID)-1];
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

    private generateCode(editor: Editor, block: Block, callback: CallableFunction, preArgs?: string): void {
        let args: ArgumentValue[] = this.getArguments(editor, block);
        let code: GeneratedCode = '';

        code = callback(...this.argValues(args));

        let eventVar: number = 1;
        while(code.search(`{var${eventVar}}`) != -1) {
            let variable: string = this.getVariable(block, eventVar);
            code = code.replace(`{var${eventVar}}`, variable);

            eventVar++;
        }

        this.addCode(`${preArgs || ''}${code}`);
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

                preArgs = (`local ${args.join(', ')} = `);
            } else {            
                for(let i in definition.outputs) {
                    let outputID: number = parseInt(i);
                    let output: NodeDefintion = definition.outputs[i];
                    args.push(this.getVariable(block, outputID));
                }

                preArgs = (`${args.join(', ')} = `);
            }
        }

        // Generate header
        this.generateCode(editor, block, definition.generateCode.header, preArgs);

        // Generate next connected motion block
        let motionNext: NodeConnection | null = block.findConnection('motion-next');
        if(motionNext) {
            this.generateBlock(editor, motionNext.block);
        }

        // Generate footer
        if(definition.generateCode.footer) this.generateCode(editor, block, definition.generateCode.footer);

        return args;
    }

    generateProject(editor: Editor): GeneratedCode {
        // restore default generator settings
        this.code = '';
        this.variableID = 1;
        this.definedVariables = [];

        // foreach all event blocks and generate them
        for(let block of editor.blocks) {
            let definition: BlockDefinition | null = this.getDefinition(editor, block.type);
            if(!definition || !definition.isEvent) continue;

            this.generateBlock(editor, block);
        }

        return this.code;
    }
}