import { ChatPromptTemplate } from '@langchain/core/prompts';
import { JurisprudenceAgent } from '../JurisprudenceGraph';

import { z } from 'zod';
import { Command } from '@langchain/langgraph';
import { NodeId } from '../nodeIds';
import { JsonOutputParser } from '@langchain/core/output_parsers';

const jsonSchema = z.record(z.any());
const parser = new JsonOutputParser();

export const jurisprudenceAgentFunction = (graph: JurisprudenceAgent) => {
    const jurisprudenceAgent = async (state: typeof graph.stateDefinition.State) => {
        const data = graph.jurisprudenceData;
        if (!data) throw new Error(data);

        const userMessage = data?.message;

        if (!userMessage) {
            throw new Error('propriety message is required');
        }

        const prompt = ChatPromptTemplate.fromTemplate(graph.DEFAULTS.jurisprudencePrompt);

        // const chain = prompt.pipe(graph.model).pipe(parser);
        const chain = prompt.pipe(graph.model);

        const response = await chain.invoke({
            userMessage,
        });

        console.log('response: ', response?.content);

        // Valida com Zod
        // const validation = jsonSchema.safeParse(response);
        // if (!validation.success) {
        //     throw new Error('JSON retornado é inválido: ' + validation.error.message);
        // }

        return new Command({
            goto: NodeId.END,
            update: { messages: { message: response?.content } },
        });
    };

    return jurisprudenceAgent;
};
