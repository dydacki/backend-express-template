import mongoose, { Schema } from 'mongoose';

export interface Session {
  userId: string;
  valid: boolean;
}

var sessionSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    valid: { type: Boolean, required: true, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface SessionModel extends Session, Document {}
export default mongoose.model<SessionModel>('Session', sessionSchema);
