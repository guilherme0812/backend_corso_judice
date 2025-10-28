import { BaseGraph } from '../BaseGraph';
import { z } from 'zod';
import { ChatGroq } from '@langchain/groq';
import { DEFAULT_PROMPT, DEFAULT_JSON } from './defaults';
import { ChatPromptTemplate } from '@langchain/core/prompts';

// Esquema Zod para validar o JSON final
const ConvertedJsonSchema = z.record(z.any());

export class JsonConversionAgent extends BaseGraph {
    constructor() {
        super();
    }
    type = 'json-conversion';

    // mapping definido internamente
    private defaultJSON = DEFAULT_JSON;

    private model = new ChatGroq({
        apiKey: process.env.GROQ_API_KEY!,
        model: 'llama-3.1-8b-instant',
    });

    public async initializeGraph() {
        // Build specialized agents via ReAct
        // const generateLyricsAgent = await getGenerateLyricsAgent(this);
        // const whoIsTheArtistAgent = await getWhoIsTheArtistAgent(this);
        // const audioAgent = await getAudioAgent(this);
        // const graph = new StateGraph(this.stateDefinition)
        //     .addNode(NodeId.AUDIO_AGENT, audioAgent, {
        //         ends: [NodeId.END],
        //         metadata: { agentName: NodeId.AUDIO_AGENT },
        //     })
        //     .addEdge('__start__', NodeId.AUDIO_AGENT);
        // return graph;
    }

    public async getGraphAgent(): Promise<void> {
        const graph = await this.initializeGraph();
        console.log('--- meu teste -----');
    }

    async invokeGraph(data: any) {
        const graphAgent = await this.getGraphAgent();

        const mapping_json = data?.mapping_json;
        const base_json = data?.base_json;
        if (!mapping_json) {
            throw new Error('mapping_json é obrigatório');
        }

        const prompt = ChatPromptTemplate.fromTemplate(DEFAULT_PROMPT);

        const chain = prompt.pipe(this.model);

        const response = await chain.invoke({
            exemple: { name: 'meunome' },
            base_json: JSON.stringify(base_json || this.defaultJSON, null, 2),
            mapping_json: JSON.stringify(mapping_json, null, 2),
        });

        // console.log('responde: ', response);

        const text = response.content;

        // Parseia o JSON retornado
        let parsed;
        try {
            parsed = JSON.parse(text as any);
        } catch {
            throw new Error('Falha ao parsear o JSON retornado pelo modelo.');
        }

        // Valida com Zod
        const validation = ConvertedJsonSchema.safeParse(parsed);
        if (!validation.success) {
            throw new Error('JSON retornado é inválido: ' + validation.error.message);
        }

        return validation.data;
    }
}
