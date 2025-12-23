import { parentPort } from 'worker_threads';
import { FinancialEntryService } from '../../financial/entry/entry.service';

async function run() {
    const financialEntry = new FinancialEntryService();

    const date = new Date().toISOString().split('T')[0];
    const latePayments = await financialEntry.getProjectedFlow(date, date);

    latePayments?.map((item) => {
        const res: any = financialEntry.markAsOverDue(item.id);
        parentPort?.postMessage(`[${new Date().toISOString()}] change status for entry ${res?.id}`);
    });

    parentPort?.postMessage(`[${new Date().toISOString()}]}`);
}

run();
