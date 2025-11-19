// module/agent/agent.factory.ts
import { BaseGraph } from './graphs/BaseGraph';
import { JsonConversionAgent } from './graphs/JsonConversionGraph/JsonConversionGraph';
import { JurisprudenceAgent } from './graphs/JurisprudenceGraph/JurisprudenceGraph';

export class GraphFactory {
    static invokeGraph(type: string): BaseGraph {
        switch (type) {
            case 'json-conversion':
                return new JsonConversionAgent();
            case 'jurisprudence':
                return new JurisprudenceAgent();
            default:
                throw new Error(`Agent type "${type}" not found.`);
        }
    }
}
