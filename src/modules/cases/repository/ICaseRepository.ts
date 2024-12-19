enum CaseStatus {
  PENDING = "PENDING",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export interface CaseDataType {
  id: string;
  caseNumber: string;
  description: string;
  status: CaseStatus;
  openedAt: string;
  closedAt: string;
}

export interface CreateCase {
  companyId: string;
  clientId: string;
  caseNumber: string;
  description: string;
  status: CaseStatus;
}

export interface ICaseRepository {
  findAll: () => Promise<CaseDataType[]>;
  findOne: (id: string) => Promise<CaseDataType | null>;
  create: (body: CreateCase) => Promise<any>;
  update(data: CreateCase): Promise<CaseDataType>;
  remove(id: string): Promise<any>;
}
