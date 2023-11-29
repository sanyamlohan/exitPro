export interface IBaseRepository<IModelEntity> {
  get(id: number): Promise<any>;
  getLateStudents(): Promise<any>;
  getSecurityGuard(id: string): Promise<any>;
  getEntry(id: number): Promise<any>;
  create(entity: IModelEntity): Promise<any>;
  updateStudent(_id: number, data: any): Promise<any>;
}
