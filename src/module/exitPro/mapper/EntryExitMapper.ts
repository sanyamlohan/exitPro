import { InputDTO } from '../application/dtos/ExitDto';
import { EntryExit } from '../domain/entity/EntryExit';
import { IEntryExitModel } from '@shared-infra/persistence/mongo/models/EntryExitModel';

export class EntryExitMap {
  public static fromDTOToDomain(record: any, inputDto: InputDTO): EntryExit {
    return EntryExit.create({
      roll_number: record.roll_number,
      name: record.name,
      contact: record.contact,
      hostel: record.hostel,
      room_number: record.room_number,
      goingTo: inputDto.goingTo,
      outTime: String(new Date()),
      inTime: record.inTime
    });
  }

  public static fromDTOToDomainEntry(record: any): EntryExit {
    return EntryExit.create({
      roll_number: record.roll_number,
      name: record.name,
      contact: record.contact,
      hostel: record.hostel,
      room_number: record.room_number,
      goingTo: record.goingTo,
      outTime: record.outTime,
      inTime: String(new Date())
    });
  }

  public static fromDomainToPersistence(record: EntryExit): IEntryExitModel {
    return {
      roll_number: record.getRollNumber,
      name: record.getName,
      contact: record.getContact,
      hostel: record.getHostel,
      room_number: record.getRoomNumber,
      goingTo: record.getLocation,
      outTime: record.getOutTime,
      inTime: record.getInTime
    };
  }
}
