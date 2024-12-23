import { CaseService } from "./cases.service";
import { CasePrismaRepository } from "./repository/CasePrismaRepository";

const caseRepository = new CasePrismaRepository();
const caseService = new CaseService(caseRepository);

export interface CaseQuery {
  id: string;
}

export class CasesController {
  async findAll() {
    return await caseService.findAll();
  }
}
