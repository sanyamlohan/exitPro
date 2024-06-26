const TYPES = {
  StudentService: Symbol.for('StudentService'),
  SecurityService: Symbol.for('SecurityService'),
  IStudentRepository: Symbol.for('IStudentRepository'),
  IEntryExitRepository: Symbol.for('IEntryExitRepository'),
  ISecurityRepository: Symbol.for('ISecurityRepository'),
  CreateStudentController: Symbol.for('CreateStudentController'),
  CreateSecurityController: Symbol.for('CreateSecurityController'),
  CreateEntryController: Symbol.for('CreateEntryController'),
  CreateExitController: Symbol.for('CreateExitController'),
  GetStudentController: Symbol.for('GetStudentController'),
  GetLateStudentsController: Symbol.for('GetLateStudentsController'),
  GetOtpMatchResultController: Symbol.for('GetOtpMatchResultController'),
  LoginController: Symbol.for('LoginController'),
  SendWarningStudentsController: Symbol.for('SendWarningStudentsController')
};

export default TYPES;
