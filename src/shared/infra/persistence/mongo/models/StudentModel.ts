import { Schema } from 'mongoose';

export interface IStudentModel {
  roll_number: number;
  name: string;
  contact: string;
  hostel: string;
  room_number: number;
}

const studentSchema = new Schema<IStudentModel>({
  roll_number: { type: Number, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  hostel: { type: String, required: true },
  room_number: { type: Number, required: true }
});

export default studentSchema;
