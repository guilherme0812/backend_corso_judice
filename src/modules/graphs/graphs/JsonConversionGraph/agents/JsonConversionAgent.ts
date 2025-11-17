import { ChatPromptTemplate } from '@langchain/core/prompts';
import { JsonConversionAgent } from '../JsonConversionGraph';

import { z } from 'zod';
import { Command } from '@langchain/langgraph';
import { NodeId } from '../nodeIds';
import { JsonOutputParser } from '@langchain/core/output_parsers';

const jsonSchema = z.record(z.any());
const parser = new JsonOutputParser();

export const getJsonConversionAgent = (graph: JsonConversionAgent) => {
    const jsonConversion = async (state: typeof graph.stateDefinition.State) => {
        // console.log('---- getJsonConversionAgent param: ', state);
        const data = graph.jsonConversionData;
        if (!data) throw new Error(data);

        const mapping_json = data?.mapping_json;
        const base_json = data?.base_json;

        if (!mapping_json) {
            throw new Error('mapping_json é obrigatório');
        }

        const prompt = ChatPromptTemplate.fromTemplate(graph.DEFAULTS.jsonConversionPrompt);

        const chain = prompt.pipe(graph.model).pipe(parser);

        const response = await chain.invoke({
            exemple: {
                base_json: {
                    name: 'Fulano',
                },
                mapping_json: {
                    name: 'meunome',
                },
            },
            base_json: JSON.stringify(base_json || graph.DEFAULTS.defaultBaseJson, null, 2),
            mapping_json: JSON.stringify(mapping_json, null, 2),
        });

        // Valida com Zod
        const validation = jsonSchema.safeParse(response);
        if (!validation.success) {
            throw new Error('JSON retornado é inválido: ' + validation.error.message);
        }

        return new Command({
            goto: NodeId.END,
            update: { messages: [validation.data] },
        });
    };

    return jsonConversion;
};
