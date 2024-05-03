import { Schema } from 'mongoose';

export interface ISecurityModel {
  guardId: string;
  guardName: string;
  guardContact: string;
  otp: string | undefined;
}

const securitySchema = new Schema<ISecurityModel>({
  guardId: { type: String, required: true },
  guardName: { type: String, required: false },
  guardContact: { type: String, required: false },
  otp: { type: String, required: false, default: null }
});

export default securitySchema;
