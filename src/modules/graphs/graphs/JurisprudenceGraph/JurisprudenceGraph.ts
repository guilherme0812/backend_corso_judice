import { BaseGraph } from '../BaseGraph';
// import { z } from 'zod';
import { ChatGroq } from '@langchain/groq';
import { Annotation, StateGraph } from '@langchain/langgraph';
import { NodeId } from './nodeIds';
import { jurisprudenceAgentFunction } from './agents/jusrisprudenceAgent';
import { jurisprudenceDefaults } from './metadata/defaults';

// Esquema Zod para validar o JSON final
// const ConvertedJsonSchema = z.record(z.any());

export type JurisprudenceDataType = {
    message: string;
};
export class JurisprudenceAgent extends BaseGraph {
    constructor() {
        super();
    }

    type = 'json-conversion';

    jurisprudenceData?: JurisprudenceDataType;

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

    DEFAULTS = jurisprudenceDefaults;

    public model = new ChatGroq({
        apiKey: process.env.GROQ_API_KEY!,
        model: 'llama-3.3-70b-versatile',
        temperature: 0.3
        // apiKey: process.env.OPENAI_API_KEY!,
        // model: 'gpt-oss-20b',
    });

    public async initializeGraph() {
        // Build specialized agents via ReAct
        const jsonConversionAgent = jurisprudenceAgentFunction(this);

        const graph = new StateGraph(this.stateDefinition)
            .addNode(NodeId.JURISPRUDENCE_AGENT, jsonConversionAgent, {
                ends: [NodeId.END],
                metadata: { agentName: NodeId.JURISPRUDENCE_AGENT },
            })
            .addEdge('__start__', NodeId.JURISPRUDENCE_AGENT);
        return graph;
    }

    // podemos chamar essa funçao de createGraphAgent. create -> compile -> save -> return
    public async buildGraphAgent() {
        super.buildGraphAgent();

        const graph = await this.initializeGraph();
        const compiled = graph.compile();
        this.graphAgent = compiled;

        return compiled;
    }

    async invokeGraph(data: JurisprudenceDataType) {
        console.log(process.env.OPENAI_API_KEY);

        this.jurisprudenceData = data;
        const graphAgent = await this.buildGraphAgent();

        const result = await graphAgent.invoke({});
        let messages: any[] = result.messages;

        let message = messages[0];

        return message;
    }
}
