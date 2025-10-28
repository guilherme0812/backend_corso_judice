// module/agent/agent.factory.ts
import { BaseGraph } from './graphs/BaseGraph';
import { JsonConversionAgent } from './graphs/JsonConversionGraph/JsonConversionGraph';

export class GraphFactory {
    static invokeGraph(type: string): BaseGraph {
        switch (type) {
            case 'json-conversion':
                return new JsonConversionAgent();
            default:
                throw new Error(`Agent type "${type}" not found.`);
        }
    }
}
