import { ResponseStudentDTO } from '../application/dtos/ResponseStudentDto';
import { StudentDTO } from '../application/dtos/StudentDto';
import { Student } from '../domain/entity/Student';
import { IStudentModel } from '@shared-infra/persistence/mongo/models/StudentModel';

export class StudentMap {
  public static fromDTOToDomain(student: StudentDTO): Student {
    return Student.create({
      roll_number: student.roll_number,
      name: student.name,
      contact: student.contact,
      hostel: student.hostel,
      room_number: student.room_number
    });
  }

  public static fromDomainToPersistence(student: Student): IStudentModel {
    return {
      roll_number: student.getRollNumber,
      name: student.getName,
      contact: student.getContact,
      hostel: student.getHostel,
      room_number: student.getRoomNumber
    };
  }

  public static fromPersistenceToDTO(student: any): ResponseStudentDTO {
    return {
      name: student.name,
      contact: student.contact,
      roll_number: student.roll_number,
      goingTo: student.goingTo,
      outTime: student.outTime
    }
  }
}
