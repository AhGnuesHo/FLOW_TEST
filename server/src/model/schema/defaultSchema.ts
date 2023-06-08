import mongoose, { ObjectId } from "mongoose";

const Schema = mongoose.Schema;

export interface IExtension {
  id: ObjectId;
  name: string;
  available: boolean;
}

export const DefaultSchema = new Schema<IExtension>(
  {
    name: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
  }
);
