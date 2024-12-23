import {
  CaseDataType,
  CreateCase,
  ICaseRepository,
} from "./repository/ICaseRepository";

export class CaseService {
  constructor(private readonly caseRepository: ICaseRepository) {}

  async findAll() {
    return this.caseRepository.findAll();
  }

  async findOne(id: string) {
    const caseData = await this.caseRepository.findOne(id);

    if (!caseData) {
      throw { status: 404, message: "case not found" };
    }

    return caseData;
  }

  async create(body: CreateCase) {
    return this.caseRepository.create(body);
  }

  async update(body: CaseDataType) {
    const caseData = await this.findOne(body.id);
    return this.caseRepository.update(caseData);
  }

  async remove(id: string) {
    const caseData = await this.findOne(id);

    return this.caseRepository.remove(caseData.id);
  }
}
