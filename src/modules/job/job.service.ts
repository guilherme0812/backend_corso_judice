import Bree from 'bree';
import path from 'path';

export class JobService {
    private bree: Bree;

    constructor() {
        console.log('teste: ', path.join(__dirname, '/workers')); ///home/guilherme/personal/backend_corso_judice/src/modules/job/workers
        this.bree = new Bree({
            root: path.join(__dirname, '/workers'),
            jobs: [
                { name: 'pending-payments.job', cron: '0 0 * * *' },
                { name: 'heath-check.job', cron: '0 * * * *' },
            ],
        });
    }

    async startAll() {
        this.bree.start();
    }

    async stopAll() {
        this.bree.stop();
    }
}
