import {Schema} from 'mongoose';

export interface IEntryExitModel {
  roll_number: number;
  name: string;
  contact: string;
  hostel: string;
  room_number: number;
  goingTo: string;
  outTime: string | undefined;
  inTime: string | undefined;
}

const entryExitSchema = new Schema<IEntryExitModel>({
  roll_number: { type: Number, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  hostel: { type: String, required: true },
  room_number: { type: Number, required: true },
  goingTo: { type: String, required: true },
  outTime: { type: String, required: false },
  inTime: { type: String, required: false, default: null }
});

export default entryExitSchema;