import { GetCasesDTO } from './cases.schema';
import { CaseDataType, CreateCase, ICaseRepository } from './repository/ICaseRepository';

export class CaseService {
    constructor(private readonly caseRepository: ICaseRepository) {}

    async findAll(params?: GetCasesDTO) {
        return this.caseRepository.findAll(params);
    }

    async findOne(id: string) {
        const caseData = await this.caseRepository.findOne(id);

        if (!caseData) {
            throw { status: 404, message: 'case not found' };
        }

        return caseData;
    }

    async create(body: CreateCase) {
        return this.caseRepository.create(body);
    }

    async update(id: string, body: CaseDataType) {
        await this.findOne(id);
        return this.caseRepository.update(id, body);
    }

    async remove(id: string) {
        const caseData = await this.findOne(id);

        return this.caseRepository.remove(caseData.id);
    }

    async getCaseTimeSeries(companyId: string, period: 'week' | 'month' | 'year') {
        return this.caseRepository.getCaseTimeSeries(companyId, period);
    }
}
