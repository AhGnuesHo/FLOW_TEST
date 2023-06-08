import mongoose from "mongoose";
import { IExtension } from "./extensionSchema";

const Schema = mongoose.Schema;

export interface IDefaultExtension extends IExtension {
  available: boolean;
}

export const DefaultSchema = new Schema<IDefaultExtension>(
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
