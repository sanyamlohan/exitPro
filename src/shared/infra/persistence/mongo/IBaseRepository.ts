export interface IBaseRepository<IModelEntity> {
  get(id: Number): Promise<any>;
  getLateStudents(): Promise<any>;
  getSecurityGuard(id: String): Promise<any>;
  getEntry(id: Number): Promise<any>;
  create(entity: IModelEntity): Promise<any>;
  updateStudent(_id: Number, data : any): Promise<any>;
}
