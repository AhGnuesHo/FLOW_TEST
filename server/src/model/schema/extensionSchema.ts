import mongoose, { ObjectId } from "mongoose";

export interface IExtension {
  id: ObjectId;
  name: string;
  count?: number;
}
const Schema = mongoose.Schema;

export const ExtensionSchema = new Schema<IExtension>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);
