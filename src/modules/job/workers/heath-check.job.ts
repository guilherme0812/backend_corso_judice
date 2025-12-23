import { parentPort } from 'worker_threads';
import { FinancialEntryService } from '../../financial/entry/entry.service';

async function run() {
    const financialEntry = new FinancialEntryService();

    const latePayments = await financialEntry.list({
        limit: 0,
    });

    parentPort?.postMessage(`Finishing heath check job - [${new Date().toISOString()}]}`);
}

run();
