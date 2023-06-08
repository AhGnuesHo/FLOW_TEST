import mongoose from "mongoose";
import { IExtension } from "./defaultSchema";

const Schema = mongoose.Schema;

export const ExtensionSchema = new Schema<IExtension>(
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
