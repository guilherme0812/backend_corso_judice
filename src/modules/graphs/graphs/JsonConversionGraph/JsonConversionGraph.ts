import { BaseGraph } from '../BaseGraph';
import { z } from 'zod';
import { ChatGroq } from '@langchain/groq';
import { Annotation, StateGraph } from '@langchain/langgraph';
import { NodeId } from './nodeIds';
import { getJsonConversionAgent } from './agents/JsonConversionAgent';
import { jsonConversionDefaults } from './metadata/defaults';

// Esquema Zod para validar o JSON final
const ConvertedJsonSchema = z.record(z.any());

export type JsonConversionDataType = {
    base_json?: Record<string, any>;
    mapping_json: Record<string, any>;
};
export class JsonConversionAgent extends BaseGraph {
    constructor() {
        super();
    }

    type = 'json-conversion';

    jsonConversionData?: JsonConversionDataType;

    stateDefinition = Annotation.Root({
        messages: Annotation<any>({
            reducer: (x, y) => {
                return x.concat(y);
            },
            default: () => [],
        }),
        // threadId: Annotation<string>({
        //     reducer: (_x, y) => y,
        //     default: () => '',
        // }),
        next: Annotation<string>({
            reducer: (x, y) => y ?? x,
            default: () => NodeId.END,
        }),
    });

    DEFAULTS = jsonConversionDefaults;

    public model = new ChatGroq({
        apiKey: process.env.GROQ_API_KEY!,
        model: 'llama-3.3-70b-versatile',
    });

    public async initializeGraph() {
        // Build specialized agents via ReAct
        const jsonConversionAgent = getJsonConversionAgent(this);

        const graph = new StateGraph(this.stateDefinition)
            .addNode(NodeId.JSON_CONVERSION, jsonConversionAgent, {
                ends: [NodeId.END],
                metadata: { agentName: NodeId.JSON_CONVERSION },
            })
            .addEdge('__start__', NodeId.JSON_CONVERSION);
        return graph;
    }

    public async getGraphAgent() {
        super.getGraphAgent();

        const graph = await this.initializeGraph();
        const compiled = graph.compile();
        this.graphAgent = compiled;

        return compiled;
    }

    async invokeGraph(data: JsonConversionDataType) {
        this.jsonConversionData = data;
        const graphAgent = await this.getGraphAgent();

        // {
        //   messages: [ { meunome: 'Guilherme', idade: '19', cidade: 'San Francisco' } ],
        //   next: '__end__'
        // }
        const result = await graphAgent.invoke({});
        let messages: any[] = result.messages;

        let message = messages[0];

        return message;
    }
}
